import { useCallback, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { request, gql } from 'graphql-request';

import EditableTable from '../components/EditableTable';

const endpoint = 'http://localhost:8000/graphql';

export default function Admin() {
  // used to get from cache
  const queryClient = useQueryClient();
  const [pageCount, setPageCount] = useState(0);
  const [result, setResult] = useState([]);

  const fetch = useCallback(async page => {
    const result = await queryClient.fetchQuery('characters', async () => {
      const data = await request(
        endpoint,
        gql`
          query {
            characters(page: ${page}, filter: { village: "leaf" }) {
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

      return data;
    });
    setResult(result?.characters?.results);
    setPageCount(result?.characters?.info?.pages);
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Age',
        accessor: 'age', // accessor is the "key" in the data
      },
      {
        Header: 'Avatar',
        accessor: 'avatarSrc',
        Cell: props => <img src={props.value} />,
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'First Anime Appearance',
        accessor: 'firstAnimeAppearance',
      },
      {
        Header: 'First Manga Appearance',
        accessor: 'firstMangaAppearance',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Name Meaning',
        accessor: 'nameMeaning',
      },
      {
        Header: 'Notable Quotes',
        accessor: 'notableQuotes',
      },
      {
        Header: 'Rank',
        accessor: 'rank',
      },
      {
        Header: 'Village',
        accessor: 'village',
      },
    ],
    []
  );

  return (
    <div>
      <div>
        <div>
          <EditableTable
            columns={columns}
            data={result}
            pageCount={pageCount}
            fetch={fetch}
          />
        </div>
      </div>
    </div>
  );
}
