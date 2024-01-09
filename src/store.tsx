import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface ImageProps {
  country: string;
  creator: string;
  id: string;
  identifier: string;
  image: string;
  location: string;
  name: string;
  thumbnail: string;
  url: string;
  year: string;
}

export interface CanvasImageProps {
  height: number;
  id: string;
  image: string;
  isDragging: boolean;
  width: number;
  x: number;
  y: number;
}

interface GlamState {
  addToCanvas: (id: string, imageURL: string) => void;
  canvasList: CanvasImageProps[];
  imageLikeList: ImageProps[];
  likeImage: (image: ImageProps) => void;
  transformCanvasImage: (canvasImage: CanvasImageProps) => void;
}

const useStore = create<GlamState>()(
  devtools(
    persist(
      (set) => ({
        addToCanvas: (id, imageURL) =>
          set((state) => ({
            canvasList: [
              ...state.canvasList,
              {
                height: 1080 * 0.8,
                id: id,
                image: imageURL,
                isDragging: false,
                width: 1080 * 0.8,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              },
            ],
          })),
        canvasList: [],
        imageLikeList: [],
        likeImage: (image) =>
          set((state) => ({ imageLikeList: [...state.imageLikeList, image] })),
        transformCanvasImage: (canvasImage) =>
          set((state) => ({
            canvasList: state.canvasList.map((canvas) => {
              if (canvas.id !== canvasImage.id) {
                return canvas;
              }
              return {
                ...canvas,
                height: canvasImage.height,
                width: canvasImage.width,
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
