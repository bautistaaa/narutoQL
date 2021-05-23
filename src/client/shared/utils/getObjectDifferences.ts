const getObjectDifferences = <T, U>(original: T, incoming: U) => {
  const incomingEntries = Object.entries(incoming);
  // yeah i just did that..
  const diff = incomingEntries.filter(([k, v]) => v != original[k]);

  return Object.fromEntries<T>(diff);
};

export default getObjectDifferences;
