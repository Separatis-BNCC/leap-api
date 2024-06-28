export const logger = (type: "info" | "error", msg: string) => {
  if (type === "info") {
    console.log("\x1b[36m[INFO]\x1b[0m :", msg);
  } else {
    console.log("\x1b[31m[ERROR]\x1b[0m:", msg);
  }
};
