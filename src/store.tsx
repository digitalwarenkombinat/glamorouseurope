import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import initialImageList from "./initialImageList";

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

export interface ArtworkImageProps {
  id: string;
  image: string;
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
  addToCanvas: (imageURL: string, x: number, y: number) => void;
  addToArtwork: (id: string, imageURL: string) => void;
  addToImageList: (image: ImageProps[]) => void;
  artworkList: ArtworkImageProps[];
  canvasList: CanvasImageProps[];
  imageList: ImageProps[];
  imageLikeList: ImageProps[];
  likeImage: (image: ImageProps) => void;
  removeFromCanvas: (id: string) => void;
  resetState: () => void;
  transformCanvasImage: (canvasImage: CanvasImageProps) => void;
  moveCanvasImage: (id: string, bringToFront: boolean) => void;
}

const useStore = create<GlamState>()(
  devtools(
    persist(
      (set) => ({
        addToArtwork: (id, imageURL) =>
          set((state) => ({
            artworkList: [
              ...state.artworkList,
              {
                id: id,
                image: imageURL,
              },
            ],
          })),
        addToCanvas: (imageURL, x, y) =>
          set((state) => ({
            canvasList: [
              ...state.canvasList,
              {
                brightness: 0,
                height: 400,
                id: `${state.canvasList.length + 1}`,
                image: imageURL,
                isDragging: false,
                opacity: 1,
                width: 400,
                x: x,
                y: y,
              },
            ],
          })),
        addToImageList: (images) =>
          set((state) => ({ imageList: [...state.imageList, ...images] })),
        artworkList: [],
        canvasList: [],
        imageList: initialImageList.sort(() => Math.random() - 0.5),
        imageLikeList: [],
        likeImage: (image) =>
          set((state) => ({ imageLikeList: [...state.imageLikeList, image] })),
        resetState: () => set(() => ({ canvasList: [], imageLikeList: [] })),
        removeFromCanvas: (id) =>
          set((state) => ({
            canvasList: state.canvasList.filter((image) => image.id !== id),
          })),
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
        moveCanvasImage: (id: string, moveForward: boolean) =>
          set((state) => {
            const currentIndex = state.canvasList.findIndex(
              (image) => image.id === id,
            );

            if (currentIndex !== -1) {
              const targetIndex = moveForward
                ? currentIndex - 1
                : currentIndex + 1;

              if (targetIndex >= 0 && targetIndex < state.canvasList.length) {
                const updatedCanvasList = [...state.canvasList];
                const [movedImage] = updatedCanvasList.splice(currentIndex, 1);
                updatedCanvasList.splice(targetIndex, 0, movedImage);

                return { canvasList: updatedCanvasList };
              }
            }

            return {};
          }),
      }),
      { name: "glamStore" },
    ),
  ),
);

export default useStore;
