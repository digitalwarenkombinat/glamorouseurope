import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
// @ts-expect-error konsta typing
import { Button, Icon } from "konsta/react";

function ScrollButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <div className="self-center">
      <Button rounded inline onClick={onClick}>
        <Icon
          material={
            direction === "left" ? (
              <ChevronLeftIcon className="w-4 h-4 lg:w-6 lg:h-6" />
            ) : (
              <ChevronRightIcon className="w-4 h-4 lg:w-6 lg:h-6" />
            )
          }
        />
      </Button>
    </div>
  );
}

export default ScrollButton;
