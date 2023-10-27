"use client";
import { normalizePath } from "@/lib/getUrlPath";
import { SiteConfigDoc } from "@/types/siteConfig";
import { FacebookIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MenuItem } from "./menus/MenuItem";
import { usePathname } from "next/navigation";

const SocialIcons = {
  facebook: <FacebookIcon className="w-24" />,
} as const;

export const Footer = ({
  navigation,
  privacyNav,
  socials,
}: {
  privacyNav: SiteConfigDoc["privacyNavigation"];
  socials?: SiteConfigDoc["socialLinks"];
  navigation: SiteConfigDoc["mainNavigation"];
}) => {
  const pathname = usePathname();
  return (
    <footer className="bg-black/30 text-white grid gap-4">
      <div className="py-16 container mx-auto flex flex-wrap justify-center md:justify-between items-center gap-8 px-8">
        <Image
          className="max-w-[200px]"
          src={"/logo-mark.svg"}
          alt="Logo"
          width={200}
          height={200}
          loading="eager"
          layout="responsive"
        />
        <nav className="flex gap-8 flex-wrap">
          {navigation?.map((item) => {
            const isActive =
              pathname.startsWith(normalizePath(item?.item?.slug || "")) &&
              item?.item?.slug !== "/";

            return (
              <MenuItem key={item?._key} isActive={isActive} navItem={item} />
            );
          })}
        </nav>
        <div className="grid gap-4 self-center justify-self-center">
          <h3 className="text-2xl font-sans font-bold">Contact Us</h3>
          <div className="flex gap-4 justify-center">
            {socials?.map(({ platform, url, _key }) => {
              return (
                <a href={url} target="_blank" key={_key}>
                  {SocialIcons[platform as keyof typeof SocialIcons]}
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-between px-8 mx-auto container">
        <div className="flex gap-4">
          {privacyNav?.map((item) => {
            const isActive =
              pathname.startsWith(normalizePath(item?.item?.slug || "")) &&
              item?.item?.slug !== "/";
            return (
              <Link

                className={`text-xs ${isActive ? "text-red-400" : "text-white"}`}
                key={item?._key}
                href={normalizePath(item?.item?.slug || "")}
              >
                {item?.item?.title}
              </Link>
            );
          })}
        </div>
        <p className="text-xs mx-auto mb-8 text-center overflow-clip px-8">
          &copy; 2019 -{" "}
          {Intl.DateTimeFormat("en-US", { year: "numeric" }).format(Date.now())}
          . All rights reserved, Dauntless Pursuit Media.
        </p>
      </div>
    </footer>
  );
};
