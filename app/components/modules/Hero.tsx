"use client"
import { normalizePath } from "~/lib/getUrlPath";
import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";
import type { z } from "zod";
import { SanityImage } from "../SanityImage";
import type { heroPropsZ } from "types/shared";
import { Link, useLocation } from "@remix-run/react";

export const directionOffset = 800;
export const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? -directionOffset : directionOffset,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? -directionOffset : directionOffset,
    opacity: 0,
  }),
};
export type HeroProps = z.infer<typeof heroPropsZ>;
export const HeroSection = ({ _key, _type, heros }: HeroProps) => {
	  const {pathname} = useLocation()
    const [[page, direction], setPage] = useState([0, 0]);
    const [running, setRunning] = useState<boolean>(true);
    const index = Math.min(Math.max(page, 0), heros?.length || 0);

  return (
    <section className=" ">
      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="grid items-center"
          onMouseEnter={() => setRunning(false)}
          onMouseLeave={() => setRunning(true)}
          transition={{
            x: {
              type: "spring",
              stiffness: 800,
              damping: 100,
              duration: 0.01,
            },
            opacity: { duration: 0.2 },
          }}
        >
          <SanityImage
						image={heros?.[index]?.image}
            className="w-full z-0 sm:aspect-[21/9]  object-cover brightness-75 col-span-full col-start-1 row-start-1"
            width={1920}
            loading="eager"
          />
          <div className="z-10 p-16 col-span-full col-start-1 row-start-1 flex flex-col items-center mx-auto max-w-3xl text-center ">
            <h1
              className={`font-title tracking-normal font-normal  text-white  mb-8`}
            >
              {heros?.[index]?.title}
            </h1>

            {heros?.[index]?.action && (
              <Link
                className="px-6 py-2 rounded-full bg-sky-600 text-white border-gray-200 border-2 hover:bg-blue-400 transition-colors duration-200 focus:bg-blue-400"
                to={normalizePath(heros?.[index]?.action?.route?.slug || "/")}
                aria-label={heros?.[index]?.action?.route?.title}
              >
                {heros?.[index]?.action?.actionTitle}
              </Link>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
