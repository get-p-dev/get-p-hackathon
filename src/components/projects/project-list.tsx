import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { z } from "zod";
import ProjectCard from "./project-card";

const ProjectSchema = z.object({
  _id: z.string(),
  applicationDeadline: z.date(),
  startDate: z.date(),
  endDate: z.date(),
  category: z.string(),
  field: z.string(),
  location: z.string(),
  title: z.string(),
  introduction: z.string(),
  meeting: z.string(),
  hashtags: z.array(z.string()),
  successPay: z.number(),
  company: z.any(),
  likes: z.number(),
});

export type ProjectProps = z.infer<typeof ProjectSchema>;

const ProjectList = () => {
  const { data: projects, isLoading: isProjectLoading } = useQuery<
    ProjectProps[]
  >("project-list", async () => {
    const res = await axios.get("http://localhost:8080/projects");
    return await res.data;
  });

  if (isProjectLoading) {
    return <pre>loading...</pre>;
  }

  return (
    <section className="mx-auto max-w-6xl py-4">
      <article className="flex flex-col lg:grid lg:grid-flow-row lg:grid-cols-2 lg:grid-rows-2">
        {projects &&
          projects?.length > 0 &&
          projects.map((project) => {
            return <ProjectCard key={project._id} {...project} />;
          })}
      </article>
    </section>
  );
};

export default ProjectList;
