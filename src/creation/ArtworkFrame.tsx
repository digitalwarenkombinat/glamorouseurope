import { Image } from "react-konva";
import useImage from "use-image";

import useStore from "../store";

const ArtworkFrame = ({ front }: { front: boolean }) => {
  const { frame } = useStore();
  const [image] = useImage(front ? frame.front : frame.image, "anonymous");
  return <Image image={image} draggable={false} />;
};

export default ArtworkFrame;
