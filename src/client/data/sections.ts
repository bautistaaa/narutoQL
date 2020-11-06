export type Item = {
  id: string;
  text: string;
};
export type Section = {
  id: string;
  text: string;
  items: Item[];
};

export const sections: Section[] = [
  {
    id: 'introduction',
    text: 'Introduction',
    items: [
      {
        id: 'graphql',
        text: 'GraphQL',
      },
    ],
  },
  {
    id: 'character',
    text: 'Character',
    items: [
      {
        id: 'character-schema',
        text: 'Character Schema',
      },
      {
        id: 'single-character',
        text: 'Get Single Character',
      },
      {
        id: 'all-characters',
        text: 'Get All Characters',
      },
      {
        id: 'filter-characters',
        text: 'Filter Characters',
      },
    ],
  },
  {
    id: 'clan',
    text: 'Clan',
    items: [
      {
        id: 'clan-schema',
        text: 'Clan Schema',
      },
      {
        id: 'single-clan',
        text: 'Get Single Clan',
      },
      {
        id: 'all-characters',
        text: 'Get All Clans',
      },
      {
        id: 'filter-characters',
        text: 'Filter Clans',
      },
    ],
  },
  {
    id: 'village',
    text: 'Village',
    items: [
      {
        id: 'village-schema',
        text: 'Village Schema',
      },
      {
        id: 'single-village',
        text: 'Get Single Village',
      },
      {
        id: 'all-characters',
        text: 'Get All Villages',
      },
    ],
  },
];