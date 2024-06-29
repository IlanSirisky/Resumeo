import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();

export const showNotification = (message: string, type: string) => {
  monday.execute("notice", {
    message,
    type,
    timeout: 5000,
  });
};

export default monday;
