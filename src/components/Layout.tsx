import { Bars3Icon } from "@heroicons/react/24/outline";
// @ts-expect-error konsta typing
import { App, Navbar, Page } from "konsta/react";
import { useState } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

import Footer from "./Footer";
import Sidebar from "./Sidebar";

function Layout() {
  const [panelOpened, setPanelOpened] = useState(false);

  return (
    <>
      <App theme="material">
        <Page>
          <Navbar
            className="top-0 sticky"
            transparent
            right={
              <Bars3Icon
                onClick={() => setPanelOpened(true)}
                className="mr-4 w-10 h-10"
              />
            }
          />
          <main className="h-[calc(100%_-_192px)] overflow-auto">
            <Outlet />
          </main>
          <Footer />
          {Sidebar(panelOpened, setPanelOpened)}
        </Page>
      </App>
      <ScrollRestoration />
    </>
  );
}

export default Layout;
