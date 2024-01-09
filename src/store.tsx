import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface ImageProps {
  creator: string;
  country: string;
  id: string;
  identifier: string;
  image: string;
  location: string;
  name: string;
  url: string;
  year: string;
  thumbnail: string;
}

export interface CanvasImageProps {
  id: string;
  image: string;
  x: number;
  y: number;
  isDragging: boolean;
}

interface GlamState {
  imageLikeList: ImageProps[];
  canvasList: CanvasImageProps[];
  likeImage: (image: ImageProps) => void;
  addToCanvas: (id: string, imageURL: string) => void;
  transformCanvasImage: (canvasImage: CanvasImageProps) => void;
}

const useStore = create<GlamState>()(
  devtools(
    persist(
      (set) => ({
        imageLikeList: [],
        canvasList: [],
        likeImage: (image) =>
          set((state) => ({ imageLikeList: [...state.imageLikeList, image] })),
        addToCanvas: (id, imageURL) =>
          set((state) => ({
            canvasList: [
              ...state.canvasList,
              {
                id: id,
                image: imageURL,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                isDragging: false,
              },
            ],
          })),
        transformCanvasImage: (canvasImage) =>
          set((state) => ({
            canvasList: state.canvasList.map((canvas) => {
              if (canvas.id !== canvasImage.id) {
                return canvas;
              }
              return {
                ...canvas,
                x: canvasImage.x,
                y: canvasImage.y,
              };
            }),
          })),
      }),
      { name: "glamStore" },
    ),
  ),
);

export default useStore;
