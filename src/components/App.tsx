import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Collection from "./Collection";
import Creation from "./Creation";
import Select from "./Select";
import Start from "./Start";

import { Image } from "../types";

function App() {
  const [imageLikeList, setImageLikeList] = useState([] as Image[]);
  const [canvasList, setCanvasList] = useState([] as string[]);

  console.log("imageLikeList: " + imageLikeList[0]);
  console.log("canvasList:" + canvasList);

  const handleImageLikeList = (image: Image) => {
    setImageLikeList([...imageLikeList, image]);
  };

  const handleCanvasList = (imageURL: string) => {
    setCanvasList([...canvasList, imageURL]);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Start />} />
        <Route
          path="selection"
          element={<Select handleImageLikeList={handleImageLikeList} />}
        />
        <Route
          path="collection"
          element={
            <Collection
              imageLikeList={imageLikeList}
              handleCanvasList={handleCanvasList}
            />
          }
        />
        <Route path="creation" element={<Creation canvasList={canvasList} />} />
      </Route>
    </Routes>
  );
}

export default App;
