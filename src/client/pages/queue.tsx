import { Fragment } from 'react';
import { useInfiniteQuery, useMutation } from 'react-query';
import { GraphQLClient, gql } from 'graphql-request';

import styles from '../styles/Queue.module.scss';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import Badge from '../components/Badge';
import Card from '../components/Card';
import { Info, Result } from '../shared/interfaces';
import { Draft } from '../shared/interfaces/Result';

const endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/graphql`;

interface CharacterModel {
  info: Info;
  results: Result[];
}
interface CharacterResponse {
  characterDrafts: CharacterModel;
}

const fetchCharacterDrafts = ({
  pageParam = 1,
}): Promise<CharacterResponse> => {
  const client = new GraphQLClient(endpoint, {
    credentials: 'include',
    mode: 'cors',
  });
  return client.request(
    gql`
          query {
            characterDrafts(page: ${pageParam}) {
              info {
                count
                pages
                next
                prev
              }
              results {
                _id
                age
                avatarSrc
                description
                firstAnimeAppearance
                firstMangaAppearance
                name
                nameMeaning
                notableQuotes
                rank
                village
                drafts {
                  id
                  timeStamp
                  changes {
                    key
                    newValue
                  }
                }
              }
            }
          }
        `,
    {
      credentials: 'include',
    }
  );
};

const Explorer = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(['charactersDrafts'], fetchCharacterDrafts, {
    getNextPageParam: (lastPage: CharacterResponse) => {
      return lastPage?.characterDrafts?.info?.next;
    },
  });

  const [ref] = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
    rootMargin: '500px',
  });

  const reject = useMutation((datas: { id: number; draft: Draft }) => {
    const client = new GraphQLClient(endpoint, {
      credentials: 'include',
      mode: 'cors',
    });
    return client.request(
      gql`
        mutation RejectChange($data: RejectChangeInput!) {
          rejectChange(data: $data)
        }
      `,
      { data: { id: datas.id, draftId: datas.draft.id } }
    );
  });

  const mutation = useMutation((datas: { id: number; draft: Draft }) => {
    const data = { ...datas };
    const input = {
      data,
    };
    const client = new GraphQLClient(endpoint, {
      credentials: 'include',
      mode: 'cors',
    });
    return client.request(
      gql`
        mutation ApproveChanges($data: ApproveChangeInput!) {
          approveChange(data: $data)
        }
      `,
      input
    );
  });

  const handleRejectClick = (id: number, draft: Draft) => {
    reject.mutate({ id, draft });
  };
  const handleApproveClick = (id: number, draft: Draft) => {
    mutation.mutate({ id, draft });
  };

  return (
    <>
      <div className={styles.results}>
        <div className={styles['card-grid']}>
          {data?.pages.map((group: CharacterResponse, i: number) => {
            if (group.characterDrafts?.results.length === 0) {
              return 'NO RESULTS...';
            }
            return (
              <Fragment key={i}>
                {group.characterDrafts?.results.map((result: Result) => {
                  const id = result._id;
                  return result.drafts.map((draft) => {
                    return (
                      <Card key={`card-${draft.id}`} result={result}>
                        <div style={{ marginBottom: '10px' }}>
                          <span className={styles.key}>Submitted:</span>
                          <span>
                            {new Date(+draft?.timeStamp).toDateString()}
                          </span>
                        </div>
                        <div className={styles.avatar}>
                          <img
                            className={styles.img}
                            loading="lazy"
                            src={result?.avatarSrc}
                            alt={name}
                          />
                          <Badge village={result?.village} />
                        </div>
                        {draft.changes.map((change) => {
                          const { key, newValue } = change;
                          return (
                            <div key={`${key}${newValue}`}>
                              <span className={styles.key}>{key}:</span>
                              <span className={styles.original}>
                                {result[key] ?? 'empty'}
                              </span>
                              <img src="right.svg" className={styles.right} />
                              <span className={styles.new}>{newValue}</span>
                            </div>
                          );
                        })}
                        <div className={styles.footer}>
                          <button
                            className={styles.reject}
                            onClick={() => handleRejectClick(id, draft)}
                          >
                            Reject
                          </button>
                          <button
                            className={styles.approve}
                            onClick={() => handleApproveClick(id, draft)}
                          >
                            Approve
                          </button>
                        </div>
                      </Card>
                    );
                  });
                })}
              </Fragment>
            );
          })}
        </div>
      </div>
      <button
        style={{ visibility: 'hidden' }}
        ref={ref}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
          ? 'Load More'
          : 'Nothing more to load'}
      </button>
    </>
  );
};

export default Explorer;
