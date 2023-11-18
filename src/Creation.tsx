// @ts-ignore
import { Block } from "konsta/react";

interface CreationProps {
  imageURL: string;
}

function Creation({ imageURL }: CreationProps) {
  return (
    <Block className="flex flex-col gap-16 container mx-auto justify-center content-evenly">
      {imageURL && <img src={imageURL} alt="Background Removed" />}
    </Block>
  );
}

export default Creation;
