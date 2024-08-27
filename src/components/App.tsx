import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Artwork from "./Artwork";
import Collection from "./Collection";
import Layout from "./Layout";
import Select from "./Select";
import Start from "./Start";
import About from "./about/About";
import Legal from "./about/Legal";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Start />} />
      <Route path="selection" element={<Select />} />
      <Route path="collection" element={<Collection />} />
      <Route path="creation" element={<Artwork />} />
      <Route path="about" element={<About />} />
      <Route path="legal" element={<Legal />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
