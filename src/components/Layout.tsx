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

function useDragState() {
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

  return {
    activeItem,
    handleDragStart,
    handleDragEnd,
  };
}

function LayoutNavbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <Navbar
      className="top-0 sticky"
      transparent
      right={<Bars3Icon onClick={onMenuClick} className="mr-4 w-10 h-10" />}
    />
  );
}

function MainContent() {
  return (
    <main className="h-[calc(100%_-_192px)] overflow-auto">
      <Outlet />
    </main>
  );
}

function DragOverlayContent({ activeItem }: { activeItem: any }) {
  return (
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
  );
}

function Layout() {
  const [panelOpened, setPanelOpened] = useState(false);
  const { activeItem, handleDragStart, handleDragEnd } = useDragState();

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <App theme="material">
        <Page>
          <LayoutNavbar onMenuClick={() => setPanelOpened(true)} />
          <MainContent />
          <Footer />
          {Sidebar(panelOpened, setPanelOpened)}
        </Page>
      </App>
      <ScrollRestoration />
      <DragOverlayContent activeItem={activeItem} />
    </DndContext>
  );
}

export default Layout;
