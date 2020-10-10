const resolvers = {
  Query: {
    characters: () => {
      return [
        {
          name: 'Naruto',
          village: {
            name: 'Konoha',
          },
        },
        {
          name: 'Sasuke',
          village: {
            name: 'Konoha',
          },
        },
      ];
    },
    villages: () => {
      return [
        {
          name: 'Hidden Leaf Village',
        },
        {
          name: 'Hidden Cloud Village',
        },
        {
          name: 'Hidden Rock Village',
        },
      ];
    },
  },
};

export default resolvers;
