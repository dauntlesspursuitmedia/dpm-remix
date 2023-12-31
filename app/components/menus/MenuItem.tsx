import { Link, NavLink, useLocation } from "@remix-run/react";
import { DropdownMenu } from "./DropdownMenu";
import type { DropdownState, MenuItems } from "./Menu";
import { normalizePath } from "~/lib/getUrlPath";

export const MenuItem = ({
  navItem,
}: {
  navItem: MenuItems[0];
}) => {
  const {pathname} = useLocation();
  const { itemName, externalLink, item, _key, nestedRoutes } = navItem;

  return (
    <li
      key={_key}
      className="flex  items-center gap-2 relative   "
    >
      {externalLink ? (
        <a className="text-inherit" href={externalLink}>
          {itemName}
        </a>
      ) : (
        <NavLink
          className={({isActive}) => isActive ?  "text-red-400" : "text-inherit"}
          to={normalizePath(navItem.item?.slug || "")}
        >
          {itemName && itemName !== "" ? itemName : item?.title}
        </NavLink>
      )}
      {nestedRoutes && nestedRoutes?.length > 0 && (
        <DropdownMenu id={_key} parent={item?.slug} items={nestedRoutes} />
      )}
    </li>
  );
};
