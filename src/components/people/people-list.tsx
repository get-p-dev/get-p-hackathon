import Link from "next/link";
import { z } from "zod";
import axios from "axios";
import PeopleCard from "./people-card";
import { useQuery } from "react-query";

const PeopleSchema = z.object({
  name: z.string(),
  participation: z.number(),
  success: z.number(),
  totalPay: z.number(),
  school: z.string(),
  major: z.string(),
  activityArea: z.string(),
  introduction: z.string(),
  phoneNumber: z.string(),
  likes: z.number(),
  hashtags: z.array(z.string()),
  image: z.string(),
  _id: z.string(),
  _v: z.number(),
});

export type PeopleProps = z.infer<typeof PeopleSchema>;

const PeopleList = () => {
  const { data: people, isLoading } = useQuery<PeopleProps[]>(
    ["people"],
    async () => {
      const res = await axios.get("http://localhost:8080/people");
      const people = await res.data;
      console.log(people);

      return people;
    }
  );

  return (
    <section className="mx-auto max-w-6xl py-4">
      <article className="flex flex-col lg:grid lg:grid-flow-row lg:grid-cols-2 lg:grid-rows-2">
        {isLoading ? (
          <pre>loading...</pre>
        ) : (
          people &&
          people.map((person) => {
            return <PeopleCard key={person._id} {...person} />;
          })
        )}
      </article>
    </section>
  );
};

export default PeopleList;
