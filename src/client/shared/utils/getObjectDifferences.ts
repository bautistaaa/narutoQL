const getObjectDifferences = <T, U>(original: T, incoming: U) => {
  const incomingEntries = Object.entries(incoming);
  const diff = incomingEntries.filter(([k, v]) => v !== original[k]);

  return Object.fromEntries<T>(diff);
};

export default getObjectDifferences;
