export const useApiURL = () => {
  return useState("apiURL", () => "http://localhost:9988");
};
export const useCurrentIndex = () => {
  return useState("currentIndex", () => 0);
};
