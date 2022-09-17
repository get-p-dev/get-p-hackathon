import { BodyLayout } from "../../components/common/bodylayout";
import Search from "../../components/input/search";
import ProjectList from "../../components/projects/project-list";

const ProjectSearch = () => {
  return (
    <BodyLayout>
      <Search option="프로젝트를" />
      <ProjectList />
    </BodyLayout>
  );
};

export default ProjectSearch;
