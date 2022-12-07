import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useQuery } from "@apollo/client";
import { FaArrowLeft } from "react-icons/fa";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import ClientInfo from "../components/ClientInfo";
import Loading from "../components/Loading";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditProjectForm from "../components/EditProjectForm";
import { GET_PROJECT } from "../queries/projectQueries";

const Project = () => {
  const { projectId } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id: projectId },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <h3>Something went wrong!</h3>;
  }

  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 mt-5 mb-5">
          <Card className="p-5">
            <LinkContainer to="/">
              <Button variant="success" className="w-25 mb-4">
                <FaArrowLeft /> Go Back
              </Button>
            </LinkContainer>

            <h1>{data.project.name}</h1>
            <p>{data.project.description}</p>

            <h5 className="mt-3">Project Status</h5>
            <p className="lea">{data.project.status}</p>

            <ClientInfo client={data.project.client} />

            <EditProjectForm project={data.project} />

            <DeleteProjectButton projectId={data.project.id} />
          </Card>
        </div>
      )}
    </>
  );
};

export default Project;
