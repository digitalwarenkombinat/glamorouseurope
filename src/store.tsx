import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import data from "./data.json";
import frameList from "./utils/frameList";
import initialArtworkList from "./utils/initialArtworkList";

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
  contrast: number;
  height: number;
  id: string;
  image: string;
  isDragging: boolean;
  opacity: number;
  width: number;
  x: number;
  y: number;
}

export interface FrameImageProps {
  id: number;
  image: string;
  front: string;
}

type State = {
  artworkList: ArtworkImageProps[];
  canvasList: CanvasImageProps[];
  imageList: ImageProps[];
  frame: FrameImageProps;
  imageLikeList: ImageProps[];
};

type Actions = {
  addToCanvas: (imageURL: string, x: number, y: number) => void;
  addToArtwork: (id: string, imageURL: string) => void;
  likeImage: (image: ImageProps) => void;
  removeFromCanvas: (id: string) => void;
  removeFromImageList: (id: string) => void;
  resetState: () => void;
  setFrame: (id: number) => void;
  transformCanvasImage: (canvasImage: CanvasImageProps) => void;
  moveCanvasImage: (id: string, bringToFront: boolean) => void;
};

const initialState: State = {
  artworkList: initialArtworkList,
  frame: frameList[1],
  imageList: data.sort(() => Math.random() - 0.5),
  canvasList: [],
  imageLikeList: [],
};

const useStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        addToArtwork: (id, imageURL) =>
          set((state) => ({
            artworkList: [
              {
                id: id,
                image: imageURL,
              },
              ...state.artworkList,
            ],
          })),
        addToCanvas: (imageURL, x, y) =>
          set((state) => ({
            canvasList: [
              ...state.canvasList,
              {
                brightness: 0,
                contrast: 0,
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
        removeFromImageList: (id) =>
          set((state) => ({
            imageList: state.imageList.filter((image) => image.id !== id),
          })),
        likeImage: (image) =>
          set((state) => ({ imageLikeList: [...state.imageLikeList, image] })),
        resetState: () => set(initialState),
        removeFromCanvas: (id) =>
          set((state) => ({
            canvasList: state.canvasList.filter((image) => image.id !== id),
          })),
        setFrame: (id) =>
          set(() => ({
            frame: frameList.find((frame) => frame.id === id),
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
                contrast: canvasImage.contrast,
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
                ? currentIndex + 1
                : currentIndex - 1;

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
      { name: "glamStore", version: 2 },
    ),
  ),
);

export default useStore;
