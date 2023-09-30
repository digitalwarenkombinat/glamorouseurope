import { Block, Button, Link } from "konsta/react";
import { NavLink } from "react-router-dom";

function Start() {
  return (
    <Block className="flex flex-col gap-16 container mx-auto justify-center content-evenly">
      <h1 className="neon neonFont">GLAMorouS Europe</h1>
      <Link to="/collect" component={NavLink}>
        <Button large rounded className="k-color-brand-secondary">
          Collect the items
        </Button>
      </Link>
    </Block>
  );
}

export default Start;
