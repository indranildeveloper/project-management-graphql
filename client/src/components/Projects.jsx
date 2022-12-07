import { useQuery } from "@apollo/client";
import Row from "react-bootstrap/Row";
import Loading from "./Loading";
import ProjectCard from "./ProjectCard";
import { GET_PROJECTS } from "../queries/projectQueries";

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <h3>Something went wrong!</h3>;
  }

  return (
    <div className="mt-3">
      {data.projects.length > 0 ? (
        <Row>
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Row>
      ) : (
        <p>No Projects!</p>
      )}
    </div>
  );
};

export default Projects;
