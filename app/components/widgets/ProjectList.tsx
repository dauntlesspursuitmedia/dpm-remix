import { ProjectDoc } from "types/project";
import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import { SanityImage } from "~/components/SanityImage";
import { JsonPreview } from "../JsonPreview";
import { ProjectCard } from "../ProjectCard";

export const ProjectListing = () => {
  const projectFetcher = useFetcher<{ projects: ProjectDoc[] }>();

  useEffect(() => {
    if (projectFetcher.state === "idle" && projectFetcher.data == null) {
      projectFetcher.load("/resources/projects");
    }
  }, [projectFetcher]);

  const projects = projectFetcher.data?.projects ?? [];
  return (
    <section className="container mx-auto my-16">
      <div className="px-4 @container flex flex-col gap-8 ">
        {projects?.map((project) => {
          return <ProjectCard key={project._id} {...project} />
        })}
      </div>
    </section>
  );
};
