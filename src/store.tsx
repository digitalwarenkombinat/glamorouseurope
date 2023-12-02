import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface Image {
  creator: string;
  country: string;
  id: string;
  image: string;
  location: string;
  name: string;
  url: string;
  year: string;
  thumbnail: string;
}

interface GlamState {
  imageLikeList: Image[];
  canvasList: string[];
  likeImage: (image: Image) => void;
  addToCanvas: (imageURL: string) => void;
}

const useStore = create<GlamState>()(
  devtools(
    persist(
      (set) => ({
        imageLikeList: [],
        canvasList: [],
        likeImage: (image) =>
          set((state) => ({ imageLikeList: [...state.imageLikeList, image] })),
        addToCanvas: (imageURL) =>
          set((state) => ({ canvasList: [...state.canvasList, imageURL] })),
      }),
      { name: "glamStore" },
    ),
  ),
);

export default useStore;
