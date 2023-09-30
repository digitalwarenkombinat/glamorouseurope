import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Collect from "./Collect";
import Start from "./Start";
import Create from "./Create";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Start />} />
        <Route path="collect" element={<Collect />} />
        <Route path="create" element={<Create />} />
      </Route>
    </Routes>
  );
}

export default App;
