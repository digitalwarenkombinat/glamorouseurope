import {
  Bars3Icon,
  HeartIcon,
  HomeIcon,
  PhotoIcon,
  Square2StackIcon,
} from "@heroicons/react/24/outline";
// @ts-expect-error konsta typing
import { App, Icon, Navbar, Page, Tabbar, TabbarLink } from "konsta/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet, useMatch, useResolvedPath } from "react-router-dom";

import Sidebar from "./Sidebar";

function Layout() {
  const { t } = useTranslation();
  const [panelOpened, setPanelOpened] = useState(false);

  return (
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
        <Tabbar
          labels={true}
          icons={true}
          className="left-0 bottom-0 fixed k-color-brand-primary text-center"
          innerClassName="tabbar-inner"
        >
          <TabbarLink
            active={useMatch({
              path: useResolvedPath("/").pathname,
              end: true,
            })}
            to="/"
            component={NavLink}
            icon={
              <Icon
                material={<HomeIcon className="w-10 h-10" />}
                className={`transition duration-300 ${
                  useMatch({
                    path: useResolvedPath("/").pathname,
                    end: true,
                  }) && "animate-pulse"
                }`}
              />
            }
            label={t("start")}
            touchRipple={false}
          />

          <TabbarLink
            active={useMatch({
              path: useResolvedPath("/selection").pathname,
              end: true,
            })}
            to="/selection"
            component={NavLink}
            icon={
              <Icon
                material={<HeartIcon className="w-10 h-10" />}
                className={`transition duration-300 ${
                  useMatch({
                    path: useResolvedPath("/selection").pathname,
                    end: true,
                  }) && "animate-pulse"
                }`}
              />
            }
            label={t("selection")}
            touchRipple={false}
          />

          <TabbarLink
            active={useMatch({
              path: useResolvedPath("/collection").pathname,
              end: true,
            })}
            to="/collection"
            component={NavLink}
            icon={
              <Icon
                material={<Square2StackIcon className="w-10 h-10" />}
                className={`transition duration-300 ${
                  useMatch({
                    path: useResolvedPath("/collection").pathname,
                    end: true,
                  }) && "animate-pulse"
                }`}
              />
            }
            label={t("collection")}
            touchRipple={false}
          />

          <TabbarLink
            active={useMatch({
              path: useResolvedPath("/creation").pathname,
              end: true,
            })}
            to="/creation"
            component={NavLink}
            icon={
              <Icon
                material={<PhotoIcon className="w-10 h-10" />}
                className={`transition duration-300 ${
                  useMatch({
                    path: useResolvedPath("/creation").pathname,
                    end: true,
                  }) && "animate-pulse"
                }`}
              />
            }
            label={t("artwork")}
            touchRipple={false}
          />
        </Tabbar>
        <main className="h-[calc(100%_-_128px)] overflow-auto">
          <Outlet />
        </main>
        {Sidebar(panelOpened, setPanelOpened)}
      </Page>
    </App>
  );
}

export default Layout;
