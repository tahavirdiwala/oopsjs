const getQueryIds = (ids: string, separator = ",") => {
  return ids.split(separator).map((id) => parseInt(id.trim()));
};

export { getQueryIds };
