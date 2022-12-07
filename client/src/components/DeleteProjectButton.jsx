import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { GET_PROJECTS } from "../queries/projectQueries";
import { DELETE_PROJECT } from "../mutations/projectMutations";

const DeleteProjectButton = ({ projectId }) => {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  return (
    <div>
      <Stack>
        <Button
          variant="danger"
          className="w-25 ms-auto"
          onClick={deleteProject}
        >
          <FaTrash /> Delete Project
        </Button>
      </Stack>
    </div>
  );
};

export default DeleteProjectButton;
