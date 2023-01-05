export const removeUnderScore = (name) => {
  return name !== undefined ? name.replaceAll("_", " ") : "";
};

export const formatKey = (key) => {
  if (key.includes("one_year")) {
    return removeUnderScore(key.replace("one_year", "1Y"));
  } else if (key.includes("three_year")) {
    return removeUnderScore(key.replace("three_year", "3Y"));
  } else if (key.includes("five_year")) {
    return removeUnderScore(key.replace("five_year", "5Y"));
  } else {
    return removeUnderScore(key);
  }
};
