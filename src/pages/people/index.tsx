import { BodyLayout } from "../../components/common/bodylayout";
import Search from "../../components/input/search";
import PeopleList from "../../components/people/people-list";

export default function People() {
  return (
    <BodyLayout>
      <Search option="νΌνμ" />
      <PeopleList />
    </BodyLayout>
  );
}
