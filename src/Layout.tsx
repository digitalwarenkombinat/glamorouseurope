import { NavLink, Outlet, useMatch, useResolvedPath } from "react-router-dom";
import "./App.css";
import {
  App as KonstaApp,
  Icon,
  Page,
  Navbar,
  Tabbar,
  TabbarLink,
} from "konsta/react";
import { MdHome, MdCreate, MdCollections } from "react-icons/md";
import LogoIcon from "/logo.svg";

const Logo = () => {
  return (
    <img
      src={LogoIcon}
      alt="Logo GLAMorous Europe"
      className="bg-white h-8 w-8 mr-2"
    />
  );
};

function Layout() {
  return (
    <KonstaApp theme="material">
      <Page className="flex flex-col">
        <Navbar
          centerTitle
          title="GLAMorouS Europe"
          titleClassName="neonFont text-white text-2xl"
          className="top-0 sticky p-4"
          left={<Icon material={<Logo />} />}
        />
        <Tabbar labels={true} icons={true} className="left-0 bottom-0 fixed">
          <TabbarLink
            to="/"
            active={useMatch({
              path: useResolvedPath("/").pathname,
              end: true,
            })}
            component={NavLink}
            icon={<Icon material={<MdHome className="w-6 h-6" />} />}
          />

          <TabbarLink
            active={useMatch({
              path: useResolvedPath("/collect").pathname,
              end: true,
            })}
            to="/collect"
            component={NavLink}
            icon={<Icon material={<MdCollections className="w-6 h-6" />} />}
          />
          <TabbarLink
            active={useMatch({
              path: useResolvedPath("/create").pathname,
              end: true,
            })}
            to="/create"
            component={NavLink}
            icon={<Icon material={<MdCreate className="w-6 h-6" />} />}
          />
        </Tabbar>
        <main className="flex-1">
          <Outlet />
        </main>
      </Page>
    </KonstaApp>
  );
}

export default Layout;
