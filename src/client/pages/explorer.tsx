import { Fragment, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { request, gql } from 'graphql-request';

import styles from '../styles/Explorer.module.scss';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import Card from '../components/Card';
import useDebounce from '../hooks/useDebouncedValue';
import FilterDrawer from '../components/FilterDrawer';
import FilterBar from '../components/FilterBar';
import { Filters, Info, Result } from '../shared/interfaces';

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
  return request(
    endpoint,
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
export default function Explorer() {
  const [filters, setFilters] = useState<Filters>({
    name: '',
    ranks: [],
    villages: [],
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const debouncedFilters = useDebounce(filters, 250);
  const filterCount = countFilters(filters);

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
      <pre>{isDrawerOpen}</pre>
      <FilterBar filters={filters} setFilters={setFilters} />
      <FilterDrawer
        filters={filters}
        setFilters={setFilters}
        isOpen={isDrawerOpen}
        toggle={setIsDrawerOpen}
      />
      <div className={styles.results}>
        <div className={styles['card-grid']}>
          {data?.pages.map((group: CharacterResponse, i: number) => {
            if(group.characters.results.length === 0) {
              return 'NO RESULTS...'
            }
            return (
              <Fragment key={i}>
                {group.characters?.results.map((result: Result, i: number) => (
                  <Card key={`card-${i}`} result={result} />
                ))}
              </Fragment>
            );
          })}
        </div>
      </div>
      <button
        className={styles['filter-button']}
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
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
    </>
  );
}
