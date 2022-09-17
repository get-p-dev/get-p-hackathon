import type { NextPage } from "next";
import AdBanner from "../components/home/adbanner";
import PeopleList from "../components/people/people-list";
import { BodyLayout } from "../components/common/bodylayout";

const Home: NextPage = () => {
  return (
    <BodyLayout>
      <AdBanner />
      <PeopleList />
    </BodyLayout>
  );
};

export default Home;
