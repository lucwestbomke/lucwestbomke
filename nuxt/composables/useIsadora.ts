export default function useIsadora() {
  function reshapeData(data: number[]) {
    const result: number[][][] = new Array(540);

    for (let i = 0; i < 540; i++) {
      const row: number[][] = new Array(960);
      for (let j = 0; j < 960; j++) {
        const pixel: number[] = [data[(i * 960 + j) * 3], data[(i * 960 + j) * 3 + 1], data[(i * 960 + j) * 3 + 2]];
        row[j] = pixel;
      }
      result[i] = row;
    }
    return result;
  }
  return {
    reshapeData,
  };
}
