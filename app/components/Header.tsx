import { Link, useLocation } from "@remix-run/react";
import type { SiteConfigDoc } from "types/siteConfig";
import { normalizePath } from "~/lib/getUrlPath";
import { MenuItem } from "./menus/MenuItem";

export const Header = ({
  navigation,
}: {
  navigation: SiteConfigDoc["mainNavigation"];
  logo?: SiteConfigDoc["logo"];
}) => {
  // const imageProps = useNextSanityImage(client, (logo || {}));
  const { pathname } = useLocation();

  return (
    <header className={`container mx-auto px-8 "relative"}`}>
      <div className="py-8 flex justify-between items-center gap-16">
        <Link to="/">
          <img src="/letter-logo.svg" alt="logo" width={200} />
        </Link>
        <nav className=" gap-8  hidden md:flex">
          <ul className="flex gap-4">
            {navigation.map((item) => {
              const isActive =
                pathname.startsWith(normalizePath(item?.item?.slug || "")) &&
                item?.item?.slug !== "/";

              return (
                <MenuItem key={item._key} isActive={isActive} navItem={item} />
              );
            })}
          </ul>
        </nav>
        <Link
          to="/contact/"
          className="hidden md:block bg-yellow-500 px-4 py-2 rounded-lg shadow-black/25 shadow-lg"
        >
          Let's Talk!
        </Link>
      </div>
    </header>
  );
};
