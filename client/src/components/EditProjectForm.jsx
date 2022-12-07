import { useState } from "react";
import { useMutation } from "@apollo/client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { GET_PROJECT } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutations";

const EditProjectForm = ({ project }) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState("new");

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !status) {
      return alert("Please fill out all the fields!");
    }

    updateProject(name, description, status);
  };

  return (
    <div className="mt-4">
      <h3>Update Project Details</h3>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="projectName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Client Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="projectDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            placeholder="Enter Project Description"
            as="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="projectStatus">
          <Form.Label>Status</Form.Label>
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Project
        </Button>
      </Form>
    </div>
  );
};

export default EditProjectForm;
