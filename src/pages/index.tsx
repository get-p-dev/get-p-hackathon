import type { NextPage } from "next";
import AdBanner from "../components/home/adbanner";
import PeopleList from "../components/people/people-list";
import { BodyLayout } from "../components/common/bodylayout";
import ProjectList from "../components/projects/project-list";
import Footer from "./footer";

const Home: NextPage = () => {
  return (
    <BodyLayout>
      <AdBanner />
      <h2 className="mx-auto max-w-5xl px-4 text-3xl font-bold">
        인기 있는 피플
      </h2>
      <PeopleList />
      <h2 className="mx-auto max-w-5xl px-4 pt-4 text-3xl font-bold">
        마감 임박 프로젝트
      </h2>
      <ProjectList />
      <Footer />
    </BodyLayout>
  );
};

export default Home;
