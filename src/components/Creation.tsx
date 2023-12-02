// @ts-ignore
import { Block, Button, Icon } from "konsta/react";
import { MdDownloadForOffline, MdShare } from "react-icons/md";
import CanvasIcon from "/canvas.webp";

const Canvas = () => {
  return (
    <img
      src={CanvasIcon}
      alt="Background canvas"
      className="w-160 h-160 mb-8"
    />
  );
};
interface CreationProps {
  canvasList: string[];
}

function Creation({ canvasList }: CreationProps) {
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
