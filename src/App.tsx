import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Collection from "./Collection";
import Creation from "./Creation";
import Select from "./Select";
import Start from "./Start";

function App() {
  const [imageURL] = useState("");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Start />} />
        <Route path="selection" element={<Select />} />
        <Route
          path="collection"
          element={
            <Collection
              images={[
                "https://iiif-manifest.library.vanderbilt.edu/gallery/1988/1988.077.json",
              ]}
            />
          }
        />
        <Route path="creation" element={<Creation imageURL={imageURL} />} />
      </Route>
    </Routes>
  );
}

export default App;
