// @ts-expect-error konsta typing
import { Block, Button, Icon } from "konsta/react";
import { MdDownloadForOffline, MdShare } from "react-icons/md";
import { Image, Layer, Stage } from "react-konva";
import useImage from "use-image";

import useStore from "../store";

const CanvasImage = ({ canvas }: { canvas: string }) => {
  const [image] = useImage(canvas);

  return <Image image={image} />;
};

const Canvas = () => {
  const { canvasList } = useStore();

  return (
    <Stage width={window.innerWidth} height={800}>
      <Layer>
        {canvasList.map((canvas: string) => (
          <CanvasImage key={canvas} canvas={canvas} />
        ))}
      </Layer>
    </Stage>
  );
};

function Creation() {
  const { canvasList } = useStore();
  return (
    <Block className="flex flex-col flex-wrap gap-4 container mx-auto justify-center content-center">
      {canvasList && <Canvas />}
      <Button className="p-2 rounded-full" rounded inline outline>
        <Icon material={<MdShare className="w-6 h-6" />} />
      </Button>
      <Button className="p-2 rounded-full" rounded inline outline>
        <Icon material={<MdDownloadForOffline className="w-6 h-6" />} />
      </Button>
    </Block>
  );
}

export default Creation;
