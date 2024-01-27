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
  brightness: number;
  height: number;
  id: string;
  image: string;
  isDragging: boolean;
  opacity: number;
  width: number;
  x: number;
  y: number;
}

interface GlamState {
  addToCanvas: (id: string, imageURL: string) => void;
  canvasList: CanvasImageProps[];
  imageLikeList: ImageProps[];
  likeImage: (image: ImageProps) => void;
  resetState: () => void;
  transformCanvasImage: (canvasImage: CanvasImageProps) => void;
  updateCanvasList: (selectedIndex: number) => void;
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
                brightness: 0,
                height: 400,
                id: id,
                image: imageURL,
                isDragging: false,
                opacity: 1,
                width: 400,
                x: 0,
                y: 0,
              },
            ],
          })),
        canvasList: [],
        imageLikeList: [],
        likeImage: (image) =>
          set((state) => ({ imageLikeList: [...state.imageLikeList, image] })),
        resetState: () => set(() => ({ canvasList: [], imageLikeList: [] })),
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
                brightness: canvasImage.brightness,
                opacity: canvasImage.opacity,
              };
            }),
          })),
        updateCanvasList: (selectedIndex) =>
          set((state) => ({
            canvasList: [
              ...state.canvasList.slice(0, selectedIndex),
              ...state.canvasList.slice(selectedIndex + 1),
              state.canvasList[selectedIndex],
            ],
          })),
      }),
      { name: "glamStore" },
    ),
  ),
);

export default useStore;
