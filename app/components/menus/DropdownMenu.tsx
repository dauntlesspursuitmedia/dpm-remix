"use client"
import { ChevronDown } from "lucide-react";
import type { DropdownState, MenuItems } from "./Menu";
import {AnimatePresence, motion} from 'framer-motion'
export const DropdownMenu = ({
  parent = "",
  items,
	id
}: {
  items: MenuItems;
	id:string;
  parent?: string;
}) => {


  return (
    <AnimatePresence>
      <button
				className={`${dropdownState && dropdownState === 'open' && activeId === id ? "rotate-180" : "rotate-0"} transition-transform`}
        onClick={() => changeDropdownState(id)}
        aria-pressed="false"
        aria-label="Toggle Dropdown Menu"
      >
        <ChevronDown />
      </button>
      {dropdownState === "open" && id === activeId ? (
        <motion.ul initial={{opacity: 0}} animate={{opacity:1}} className="rounded-sm shadow-md absolute right-0 top-6 bg-white bg-opacity-70 backdrop-blur-md w-full px-4 divide-y-2 py-2">
          {items.map((navItem) => {
            const { externalLink, itemName, item } = navItem;
            return (
              <li className="py-2" key={navItem._key}>
                {externalLink ? (
                  <Link
                    target={"_blank"}
                    onClick={closeDropdown}
                    to={externalLink}
                  >
                    {itemName}
                  </Link>
                ) : (
                  <NavLink
                    onClick={closeDropdown}
                    className={({isActive}) => isActive ? "text-red-400": ""}
                    to={normalizePath(
                      `${parent !== "" && item?._type !== "route" ? `/${parent}` : ""}/${
                        navItem.item?.slug
                      }`
                    )}
                  >
                    {itemName && itemName !== "" ? itemName : item?.title}
                  </NavLink>
                )}
              </li>
            );
          })}
        </motion.ul>
      ) : null}
    </AnimatePresence>
  );
};
