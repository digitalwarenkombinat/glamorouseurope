import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { Bars3Icon } from "@heroicons/react/24/outline";
// @ts-expect-error konsta typing
import { App, Navbar, Page } from "konsta/react";
import { useState } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

import Footer from "./Footer";
import Sidebar from "./Sidebar";

function Layout() {
  const [panelOpened, setPanelOpened] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [activeItem, setActiveItem] = useState<any | undefined>(null);

  function handleDragStart(event: DragStartEvent) {
    console.log(event.active);
    setActiveItem(event.active.data.current);
  }

  function handleDragEnd(event: DragEndEvent) {
    if (event.over) {
      setActiveItem(null);
    }
  }

  return (
    <DndContext
      // autoScroll={{ threshold: { x: 0.2, y: 0 } }}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
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
      <DragOverlay>
        {activeItem ? (
          <img
            src={activeItem.image}
            alt={activeItem.id}
            style={{
              cursor: "move",
              maxHeight: "100px",
              width: "auto",
              opacity: 0.4,
            }}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default Layout;
