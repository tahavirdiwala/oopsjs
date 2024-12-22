const getQueryIds = (ids: string, splitter = ",") => {
  return ids.split(splitter).map((id) => parseInt(id.trim()));
};

export { getQueryIds };
