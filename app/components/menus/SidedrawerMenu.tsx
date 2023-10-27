import type { OutletContext } from "~/root";
import type { MenuItems } from "./Menu";
import { DropdownState } from "./Menu";
import { MenuItem } from "./MenuItem";
import { Link } from "lucide-react";
import { NavLink, useOutletContext, useRouteLoaderData } from "@remix-run/react";
import { normalizePath } from "~/lib/getUrlPath";
import { DropdownMenu } from "./DropdownMenu";
import type { siteConfigZ } from "types/siteConfig";
import { urlFor } from "~/lib/urlFor";
import type { z } from "zod";

export const SideDrawerNavigation = ({
  primaryNavigation,
  secondaryNavigation,
  dropdownState,
  changeDropdownState,
  closeDropdown,
  closeSidedrawer,
  sideDrawerState,
}: OutletContext & {
  primaryNavigation: MenuItems;
  secondaryNavigation: MenuItems;
  closeSidedrawer: () => void;
}) => {
  const handleCloseClick = () => {
    closeDropdown();
    closeSidedrawer();
  };

	const { logo } = useRouteLoaderData("root") as z.infer<typeof siteConfigZ>;
  return (
    <div className="bg-white border-r-blue-500 border-r-2 h-screen w-max  fixed top-0 left-0 px-16 z-50 overflow-y-auto">
			<div className="my-16">
				<img src={urlFor(logo).width(200).url()} />
			</div>
      <nav className="my-8">
        <ul className="leading-loose mb-8 divide-y-2">
          {primaryNavigation?.map((navItem) => {
            const { externalLink, item, itemName, nestedRoutes, _key } =
              navItem;
            return (
              <li className="py-2" key={_key}>
                {externalLink ? (
                  <a className="" href={externalLink}>
                    {itemName}
                  </a>
                ) : (
                  <NavLink
                    key={_key}
                    prefetch="intent"
                    onClick={handleCloseClick}
                    className={"py-2"}
                    to={normalizePath(navItem.item?.slug || "")}
                  >
                    {itemName && itemName !== "" ? itemName : item?.title}
                  </NavLink>
                )}
                {nestedRoutes && nestedRoutes?.length > 0 && (
                  <ul className="pl-4 my-4 bg-gray-100/50 leading-loose border-l-[1px] border-gray-300 divide-y-2">
                    {nestedRoutes?.map(
                      ({
                        _key: nestedKey,
                        externalLink: nestedExternalLink,
                        item: nestedItem,
                        itemName: nestedItemName,
                      }) => (
                        <li key={nestedKey} className="px-2">
                          {externalLink ? (
                            <a
                              onClick={handleCloseClick}
                              href={nestedExternalLink || ""}
                            >
                              {nestedItemName}
                            </a>
                          ) : (
                            <NavLink
                              onClick={handleCloseClick}
                              className={"px-2"}
                              prefetch="intent"
                              to={normalizePath(
                                `${
                                  item?.slug !== "" &&
                                  nestedItem?._type !== "route"
                                    ? `/${item?.slug}`
                                    : ""
                                }/${nestedItem?.slug}`
                              )}
                            >
                              {nestedItem?.title || nestedItemName}
                            </NavLink>
                          )}
                        </li>
                      )
                    )}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
        <hr />
        <ul className=" leading-loose divide-y-[1px]">
          {secondaryNavigation?.map((navItem) => {
            const { externalLink, item, itemName, nestedRoutes, _key } =
              navItem;

            return (
              <li className="py-2" key={_key}>
                {externalLink ? (
                  <a

                    onClick={handleCloseClick}
                    className="py-2"
                    href={externalLink}
                  >
                    {itemName}
                  </a>
                ) : (
                  <NavLink
                    prefetch="intent"
                    onClick={handleCloseClick}
                    className={"px-2 py-2"}
                    to={normalizePath(navItem.item?.slug || "")}
                  >
                    {itemName && itemName !== "" ? itemName : item?.title}
                  </NavLink>
                )}
                {nestedRoutes && nestedRoutes?.length > 0 && (
                  <ul className="pl-4 my-4 bg-gray-100/50 leading-loose border-l-[1px] border-gray-300 divide-y-2">
                    {nestedRoutes?.map(
                      ({
                        _key: nestedKey,
                        externalLink: nestedExternalLink,
                        item: nestedItem,
                        itemName: nestedItemName,
                      }) => {
												return (
                        <li key={nestedKey} className="px-2 py-2">
                          {nestedExternalLink ? (
                            <a
                              onClick={handleCloseClick}
                              href={nestedExternalLink || ""}
                            >
                              {nestedItemName}
                            </a>
                          ) : (
                            <NavLink
                              onClick={handleCloseClick}
                              prefetch="intent"
                              to={normalizePath(
                                `${
                                  item?.slug !== "" &&
                                  nestedItem?._type !== "route"
                                    ? `/${item?.slug}`
                                    : ""
                                }/${nestedItem?.slug}`
                              )}
                            >
                              {nestedItem?.title || nestedItemName}
                            </NavLink>
                          )}
                        </li>
                      )}
                    )}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
