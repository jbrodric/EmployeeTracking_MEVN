export function formatDateUI(formattedData) {
  let ret = new Date(formattedData).toLocaleDateString("en-us", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  return ret === "Invalid Date" ? "" : ret;
}
