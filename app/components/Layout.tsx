import { useLocation } from "@remix-run/react";
import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";
export const Layout = (props: PropsWithChildren) => {
  return (
    <motion.main className="flex-grow" key={useLocation().pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {props.children}
    </motion.main>
  );
};
