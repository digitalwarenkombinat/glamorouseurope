import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Collection from "./Collection";
import Creation from "./Creation";
import Select from "./Select";
import Start from "./Start";
import "./App.css";

function App() {
  const [imageURL, setImageURL] = useState("");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Start />} />
        <Route path="selection" element={<Select />} />
        <Route
          path="collection"
          element={<Collection setImageURL={setImageURL} />}
        />
        <Route path="creation" element={<Creation imageURL={imageURL} />} />
      </Route>
    </Routes>
  );
}

export default App;
