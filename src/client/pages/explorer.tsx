import { Fragment, useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { GraphQLClient, gql } from 'graphql-request';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import styles from '../styles/Explorer.module.scss';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import Badge from '../components/Badge';
import Card from '../components/Card';
import useDebounce from '../hooks/useDebouncedValue';
import FilterDrawer from '../components/FilterDrawer';
import FilterBar from '../components/FilterBar';
import { Filters, Info, Result } from '../shared/interfaces';
import EditDrawer from '../components/EditDrawer';
import { truncateString } from '../shared/utils';

const endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/graphql`;

interface CharacterModel {
  info: Info;
  results: Result[];
}
interface CharacterResponse {
  characters: CharacterModel;
}

const stringBuilder = (arr: string[]) => {
  return arr.reduce((acc, curr) => {
    return `${acc}${acc ? ',' : ''} "${curr}"`;
  }, '');
};

const fetchCharacters = ({
  pageParam = 1,
  queryKey,
}): Promise<CharacterResponse> => {
  const [, filters] = queryKey;
  const villages = stringBuilder(filters.villages);
  const ranks = stringBuilder(filters.ranks);
  const client = new GraphQLClient(endpoint, {
    credentials: 'include',
    mode: 'cors',
  });
  return client.request(
    gql`
          query {
            characters(page: ${pageParam}, filter: { rank: [${ranks}], village: [${villages}], name: "${filters.name}" }) {
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
              }
            }
          }
        `
  );
};

const countFilters = (filters: Filters): number => {
  const { name, villages, ranks } = filters;
  let count = 0;
  if (name) count += 1;
  count += villages.length;
  count += ranks.length;

  return count;
};
const Explorer = () => {
  const [filters, setFilters] = useState<Filters>({
    name: '',
    ranks: [],
    villages: [],
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<
    Result | undefined
  >();
  const debouncedFilters = useDebounce(filters, 250);
  const filterCount = countFilters(filters);
  const editableDrawerRef = useRef();

  // @TODO: WTF?
  useEffect(() => {
    if (!isEditDrawerOpen) {
      setSelectedCharacter(undefined);
    }
  }, [isEditDrawerOpen]);
  useEffect(() => {
    const targetElement = document.querySelector('main');
    if (isEditDrawerOpen) {
      disableBodyScroll(targetElement);
    } else {
      enableBodyScroll(targetElement);
    }
    return () => {
      enableBodyScroll(targetElement);
    };
  }, [isEditDrawerOpen]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(['characters', debouncedFilters], fetchCharacters, {
    getNextPageParam: (lastPage: CharacterResponse) => {
      return lastPage?.characters?.info?.next;
    },
  });

  const [ref] = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
    rootMargin: '500px',
  });

  return (
    <>
      <pre>{isFilterOpen}</pre>
      <FilterBar filters={filters} setFilters={setFilters} />
      <FilterDrawer
        filters={filters}
        setFilters={setFilters}
        isOpen={isFilterOpen}
        toggle={setIsFilterOpen}
      />
      <div className={styles.results}>
        <div className={styles['card-grid']}>
          {data?.pages.map((group: CharacterResponse, i: number) => {
            if (group.characters.results.length === 0) {
              return 'NO RESULTS...';
            }
            return (
              <Fragment key={i}>
                {group.characters?.results.map((result: Result, i: number) => {
                  const {
                    name,
                    age,
                    village,
                    rank,
                    avatarSrc,
                    description,
                  } = result;
                  return (
                    <Card key={`card-${i}`} result={result}>
                      <div
                        className={styles.edit}
                        onClick={() => {
                          setIsEditDrawerOpen(true);
                          setSelectedCharacter(result);
                        }}
                      >
                        <img src="more.svg" />
                      </div>
                      <div className={styles.avatar}>
                        <img
                          className={styles.img}
                          loading="lazy"
                          src={avatarSrc}
                          alt={name}
                        />
                        <Badge village={result?.village} />
                      </div>
                      <p className={styles.p}>
                        <span className={styles.label}>Name:</span> {name}
                      </p>
                      <p className={styles.p}>
                        <span className={styles.label}>Village:</span>{' '}
                        <span className={styles.capitalize}>
                          {village || '?'}
                        </span>
                      </p>
                      <p className={styles.p}>
                        <span className={styles.label}>Age:</span> {age || '?'}
                      </p>
                      <p className={styles.p}>
                        <span className={styles.label}>Rank:</span>{' '}
                        {rank || '?'}
                      </p>
                      <p className={styles.p}>
                        <span className={styles.label}>Description:</span>{' '}
                        {truncateString(description, 100) || '?'}
                      </p>
                    </Card>
                  );
                })}
              </Fragment>
            );
          })}
        </div>
      </div>
      <button
        className={styles['filter-button']}
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        Filter
        {filterCount > 0 && (
          <span className={styles['filter-count']}>{filterCount}</span>
        )}
      </button>
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
      <EditDrawer
        ref={editableDrawerRef}
        isOpen={isEditDrawerOpen}
        setIsOpen={setIsEditDrawerOpen}
        character={selectedCharacter}
      />
    </>
  );
};

export default Explorer;
