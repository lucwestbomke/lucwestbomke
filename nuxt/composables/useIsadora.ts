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
  const useIsadoraImageURL = () => {
    return useState("isadoraImageURL", () => "");
  };
  async function postImageData(data: IsadoraPostData) {
    const res: any = await $fetch("/api/isadora", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        ...data,
      },
    });
    useIsadoraImageURL().value = res.image_id;
    return res;
  }
  async function patchImageData(data: IsadoraPostData) {
    const res = await $fetch("/api/isadora", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        ...data,
        isadora_image_id: useIsadoraImageURL().value,
      },
    });
    return res;
  }

  return {
    reshapeData,
    postImageData,
    patchImageData,
    useIsadoraImageURL,
  };
}

export type PaintingCategory = "space" | "ocean" | "human" | "landscape" | "animal" | "house";
export interface IsadoraPostData {
  image_data: number[][][];
}
export interface IsadoraPatchData {
  correct_category: PaintingCategory;
}
