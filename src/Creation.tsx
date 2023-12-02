// @ts-ignore
import { Block } from "konsta/react";

import CanvasIcon from "/canvas.webp";
interface CreationProps {
  canvasList: string[];
}

function Creation({ canvasList }: CreationProps) {
  return (
    <Block className="flex flex-col gap-16 container mx-auto justify-center content-evenly">
      {canvasList && <img src={CanvasIcon} alt="Background canvas" />}
    </Block>
  );
}

export default Creation;
