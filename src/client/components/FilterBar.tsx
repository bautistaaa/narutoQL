import { Dispatch, FC, SetStateAction } from 'react';
import { RANKS, VILLAGE_MAP } from '../shared/constants/village';
import { Filters } from '../shared/interfaces';
import styles from '../styles/FilterBar.module.scss';

const FilterBar: FC<{
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
}> = ({ filters, setFilters }) => {
  return (
    <nav className={styles.filters}>
      <div>
        <ul>
          <li className={styles['filter-section']}>
            <p className={styles['filter-name']}>
              <strong>Name</strong>
            </p>
            <input
              type="text"
              name="name"
              id="name"
              value={filters.name}
              className={styles['input-name']}
              placeholder="ex: Uchiha Sasuke"
              onChange={e =>
                setFilters((state: Filters) => {
                  return {
                    ...state,
                    name: e.target.value,
                  };
                })
              }
            />
          </li>
          <li className={styles['filter-section']}>
            <p className={styles['filter-name']}>
              <strong>Village</strong>
            </p>
            <ul>
              {Object.entries(VILLAGE_MAP).map((village, i) => {
                const [, { color, filterValue }] = village;

                return (
                  <li key={`village-filter-item-${i}`}>
                    <label htmlFor={filterValue}>
                      <input
                        type="checkbox"
                        name={filterValue}
                        id={filterValue}
                        checked={filters.villages.includes(filterValue)}
                        onChange={e =>
                          setFilters((state: Filters) => {
                            const shouldFilterBy = e.target.checked;
                            if (shouldFilterBy) {
                              return {
                                ...state,
                                villages: [...state.villages, filterValue],
                              };
                            }

                            return {
                              ...state,
                              villages: state.villages.filter(
                                village => village !== filterValue
                              ),
                            };
                          })
                        }
                      />
                      {filterValue}{' '}
                      <span
                        style={{
                          display: 'inline-block',
                          height: '10px',
                          width: '10px',
                          borderRadius: '10px',
                          background: `${color}`,
                        }}
                      />
                    </label>
                  </li>
                );
              })}
            </ul>
          </li>
          <li className={styles['filter-section']}>
            <p className={styles['filter-name']}>
              <strong>Rank</strong>
            </p>
            <ul>
              {RANKS.map((rank, i) => {
                return (
                  <li key={`rank-filter-item-${i}`}>
                    <label htmlFor={rank}>
                      <input
                        type="checkbox"
                        name={rank}
                        id={rank}
                        checked={filters.ranks.includes(rank)}
                        onChange={e =>
                          setFilters((state: Filters) => {
                            const shouldFilterBy = e.target.checked;
                            if (shouldFilterBy) {
                              return {
                                ...state,
                                ranks: [...state.ranks, rank],
                              };
                            }

                            return {
                              ...state,
                              ranks: state.ranks.filter(r => r !== rank),
                            };
                          })
                        }
                      />
                      {rank}
                    </label>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default FilterBar;
