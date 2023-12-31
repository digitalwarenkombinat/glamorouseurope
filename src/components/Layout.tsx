// @ts-expect-error konsta typing
import { App, Icon, Page, Tabbar, TabbarLink } from "konsta/react";
import { useTranslation } from "react-i18next";
import {
  MdFavoriteBorder,
  MdOutlineAssignmentInd,
  MdOutlineCollections,
  MdOutlineDoorFront,
} from "react-icons/md";
import { NavLink, Outlet, useMatch, useResolvedPath } from "react-router-dom";

function Layout() {
  const { t } = useTranslation();
  return (
    <App theme="material">
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
            label={t("portal")}
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
                material={<MdFavoriteBorder className="w-10 h-10" />}
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
                material={<MdOutlineCollections className="w-10 h-10" />}
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
                material={<MdOutlineAssignmentInd className="w-10 h-10" />}
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
        <main className="h-[calc(100%_-_80px)] overflow-auto">
          <Outlet />
        </main>
      </Page>
    </App>
  );
}

export default Layout;
