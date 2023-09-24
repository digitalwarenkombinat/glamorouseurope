import removeBackground, { Config } from "@imgly/background-removal";

const config: Config = {
  model: "small",
  progress: (key: unknown, current: unknown, total: unknown) => {
    console.log(`Downloading ${key}: ${current} of ${total}`);
  },
};

export default {
  bgRemoval: async (path: string) => {
    const startTime = Date.now();

    try {
      const blob: Blob = await removeBackground(path, config);
      const url = URL.createObjectURL(blob);
      const timeDiffInSeconds = (Date.now() - startTime) / 1000;
      console.log(timeDiffInSeconds);
      console.log(url);
      return url;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
