// @ts-ignore
import { Block } from "konsta/react";

interface CreateProps {
  imageURL: string;
}

function Create({ imageURL }: CreateProps) {
  return (
    <Block className="flex flex-col gap-16 container mx-auto justify-center content-evenly">
      <h1 className="neon neonFont">GLAMorouS Europe</h1>
      {imageURL && <img src={imageURL} alt="Background Removed" />}
    </Block>
  );
}

export default Create;
