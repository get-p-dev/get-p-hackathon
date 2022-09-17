import axios from "axios";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import { z } from "zod";
import ProjectCard from "./project-card";

const ProjectSchema = z.object({
  _id: z.string(),
  applicationDeadline: z.date(),
  startDate: z.date(),
  endDate: z.date(),
  field: z.string(),
  location: z.string(),
  title: z.string(),
  meeting: z.number(),
  hashtags: z.array(z.string()),
  successPay: z.number(),
  likes: z.number(),
});

export type ProjectProps = z.infer<typeof ProjectSchema>;

const ProjectList = () => {
  // [GET] http://localhost:8080/projects
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
    <section className="px-4 py-4">
      <article className="flex flex-col">
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
