import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import useKeyPress from '../hooks/useKeyPress';
import useWindowSize from '../hooks/useWindowSize';
import styles from '../styles/FilterDrawer.module.scss';
import { Filters } from '../shared/interfaces';
import { RANKS, VILLAGE_MAP } from '../shared/constants/village';

const FilterDrawer: FC<{
  isOpen: boolean;
  toggle: Dispatch<SetStateAction<boolean>>;
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
}> = ({ isOpen, toggle, filters, setFilters }) => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const escapePress = useKeyPress('Escape');
  const overrides = {
    display: isOpen ? 'block' : 'none',
  };

  useEffect(() => {
    if (escapePress) {
      toggle(false);
    }
  }, [escapePress]);

  useEffect(() => {
    const targetElement = document.querySelector('main');
    if (isOpen) {
      disableBodyScroll(targetElement);
    }
    return () => {
      enableBodyScroll(targetElement);
    };
  }, [isOpen]);

  if (!isMobile) {
    return null;
  }

  return (
    <>
      {isOpen && (
        <div className={styles.overlay} onClick={() => toggle(false)} />
      )}
      <div className={styles.drawer} style={overrides}>
        <button onClick={() => toggle(false)} className={styles.close}>
          <img width="20" height="20" src="cancel.svg" />
        </button>
        <nav className={styles.filters}>
          <div>
            <ul>
              <li className={[styles['filter-section'], styles.name].join(' ')}>
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
                <ul className={styles['filter-grid']}>
                  {Object.entries(VILLAGE_MAP).map((village, i) => {
                    const [, { color, filterValue }] = village;
                    const isActive = filters.villages.includes(filterValue);
                    const overrides = {
                      background: isActive ? color : null,
                    };

                    return (
                      <li key={`village-filter-item-${i}`}>
                        <button
                          style={overrides}
                          className={styles['filter-button']}
                          onClick={() =>
                            setFilters((state: Filters) => {
                              const shouldFilterBy = !state.villages.includes(
                                filterValue
                              );
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
                        >
                          {filterValue}{' '}
                          <span
                            style={{
                              display: 'inline-block',
                              height: '15px',
                              width: '15px',
                              borderRadius: '15px',
                              background: `${color}`,
                            }}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li className={styles['filter-section']}>
                <p className={styles['filter-name']}>
                  <strong>Rank</strong>
                </p>
                <ul className={styles['filter-grid']}>
                  {RANKS.map((rank, i) => {
                    const isActive = filters.ranks.includes(rank);
                    const overrides = {
                      background: isActive ? '#f3f3f3' : null,
                    };
                    return (
                      <li key={`rank-filter-item-${i}`}>
                        <button
                          style={overrides}
                          className={styles['filter-button']}
                          onClick={() =>
                            setFilters((state: Filters) => {
                              const shouldFilterBy = !state.ranks.includes(
                                rank
                              );
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
                        >
                          {rank}{' '}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default FilterDrawer;
