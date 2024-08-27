import {
  HeartIcon,
  HomeIcon,
  PhotoIcon,
  Square2StackIcon,
} from "@heroicons/react/24/outline";
// @ts-expect-error konsta typing
import { Icon, Tabbar, TabbarLink } from "konsta/react";
import { useTranslation } from "react-i18next";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";

function useActiveLink(path: string) {
  return useMatch({
    path: useResolvedPath(path).pathname,
    end: true,
  });
}

const FooterLink: React.FC<{
  to: string;
  icon: JSX.Element;
  label: string;
}> = ({ to, icon, label }) => {
  const isActive = useActiveLink(to);

  return (
    <TabbarLink
      active={isActive}
      to={to}
      component={NavLink}
      icon={
        <Icon
          material={icon}
          className={`transition duration-300 ${isActive && "animate-pulse"}`}
        />
      }
      label={label}
      touchRipple={false}
    />
  );
};

function Footer() {
  const { t } = useTranslation();

  return (
    <Tabbar
      labels={true}
      icons={true}
      className="left-0 bottom-0 fixed k-color-brand-primary text-center"
      innerClassName="tabbar-inner"
    >
      <FooterLink
        to="/"
        icon={<HomeIcon className="w-10 h-10" />}
        label={t("start")}
      />
      <FooterLink
        to="/selection"
        icon={<HeartIcon className="w-10 h-10" />}
        label={t("selection")}
      />
      <FooterLink
        to="/collection"
        icon={<Square2StackIcon className="w-10 h-10" />}
        label={t("collection")}
      />
      <FooterLink
        to="/creation"
        icon={<PhotoIcon className="w-10 h-10" />}
        label={t("artwork")}
      />
    </Tabbar>
  );
}

export default Footer;
