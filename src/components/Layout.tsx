// @ts-ignore
import { App, Icon, Page, Tabbar, TabbarLink } from "konsta/react";
import {
  MdFavoriteBorder,
  MdOutlineAssignmentInd,
  MdOutlineCollections,
  MdOutlineDoorFront,
} from "react-icons/md";
import { NavLink, Outlet, useMatch, useResolvedPath } from "react-router-dom";

function Layout() {
  return (
    <App theme="material" touchRipple={false}>
      <Page>
        <Tabbar
          labels={true}
          icons={true}
          className="left-0 bottom-0 fixed k-color-brand-secondary"
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
                material={<MdOutlineDoorFront className="w-10 h-10" />}
                className={`transition duration-300 ${
                  useMatch({
                    path: useResolvedPath("/").pathname,
                    end: true,
                  }) && "animate-pulse"
                }`}
              />
            }
            label={"Portal"}
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
                material={<MdFavoriteBorder className="w-10 h-10" />}
                className={`transition duration-300 ${
                  useMatch({
                    path: useResolvedPath("/selection").pathname,
                    end: true,
                  }) && "animate-pulse"
                }`}
              />
            }
            label={"Meine Auswahl"}
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
                material={<MdOutlineCollections className="w-10 h-10" />}
                className={`transition duration-300 ${
                  useMatch({
                    path: useResolvedPath("/collection").pathname,
                    end: true,
                  }) && "animate-pulse"
                }`}
              />
            }
            label={"Meine Sammlung"}
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
                material={<MdOutlineAssignmentInd className="w-10 h-10" />}
                className={`transition duration-300 ${
                  useMatch({
                    path: useResolvedPath("/creation").pathname,
                    end: true,
                  }) && "animate-pulse"
                }`}
              />
            }
            label={"Meine Leinwand"}
          />
        </Tabbar>
        <main className="h-[calc(100%_-_80px)]">
          <Outlet />
        </main>
      </Page>
    </App>
  );
}

export default Layout;
