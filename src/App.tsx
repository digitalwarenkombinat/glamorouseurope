import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Collect from "./Collect";
import Create from "./Create";
import Start from "./Start";

import "./App.css";

function App() {
  const [imageURL, setImageURL] = useState("");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Start />} />
        <Route path="collect" element={<Collect setImageURL={setImageURL} />} />
        <Route path="create" element={<Create imageURL={imageURL} />} />
      </Route>
    </Routes>
  );
}

export default App;
