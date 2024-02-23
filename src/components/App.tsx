import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { registerSW } from "virtual:pwa-register";

import Artwork from "./Artwork";
import Collection from "./Collection";
import Layout from "./Layout";
import Select from "./Select";
import Start from "./Start";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Start />} />
      <Route path="selection" element={<Select />} />
      <Route path="collection" element={<Collection />} />
      <Route path="creation" element={<Artwork />} />
    </Route>,
  ),
);

function App() {
  registerSW({ immediate: true });
  return <RouterProvider router={router} />;
}

export default App;
