import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";

const AddProjectModal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Get Clients for select
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !status) {
      return alert("Please fill in all fields!");
    }

    addProject(name, description, status, clientId);

    setName("");
    setDescription("");
    setStatus("new");
  };

  if (loading) {
    return null;
  }

  if (error) {
    return "Something went wrong!";
  }

  return (
    <>
      {!loading && !error && (
        <div className="mt-4">
          <Button variant="dark" onClick={handleShow}>
            <Stack direction="horizontal" gap={2}>
              <FaList /> Add Project
            </Stack>
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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

                <Form.Group className="mb-3" controlId="projectClients">
                  <Form.Label>Project Client</Form.Label>
                  <Form.Select
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                  >
                    <option value="">Select Client</option>
                    {data.clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Button variant="dark" type="submit" onClick={handleClose}>
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
};

export default AddProjectModal;
