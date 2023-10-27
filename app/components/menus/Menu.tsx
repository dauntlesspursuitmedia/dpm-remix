
import { z } from "zod";
import { MenuItem } from "./MenuItem";
import { menuItemZ } from "@/types/siteConfig";

export const menuItemsZ = z.array(
  menuItemZ.extend({
    nestedRoutes: z.array(menuItemZ).nullish(),
  })
);

export type DropdownState = `open` | `closed`;
export type MenuItems = z.infer<typeof menuItemsZ>;

export const Menu = ({ items, className = '' }: { items: MenuItems; className?: string }) => {


  return (
    <nav className={` ${className}`}>
      <ul className="flex gap-4  relative">
        {items?.length > 0 &&
          items.map((navItem) => {
            return (
              <MenuItem
                key={navItem._key}
                navItem={navItem}
              />
            );
          })}
      </ul>
    </nav>
  );
};
