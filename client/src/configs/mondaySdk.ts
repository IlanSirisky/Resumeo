import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();

export const getContext = async () => {
  return monday.get("context");
};

export default monday;
