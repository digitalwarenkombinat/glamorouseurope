// @ts-expect-error konsta typing
import { Button, Icon } from "konsta/react";

export const SwipeButton = ({
  onClick,
  materialIcon,
}: {
  onClick: () => void;
  materialIcon: React.ReactNode;
}) => (
  <Button className="p-4 text-xl text-black" onClick={onClick} rounded inline>
    <Icon material={materialIcon} />
  </Button>
);
