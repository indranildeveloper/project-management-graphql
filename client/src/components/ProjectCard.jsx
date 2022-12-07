import { LinkContainer } from "react-router-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";

const ProjectCard = ({ project }) => {
  return (
    <Col md={6}>
      <Card className="mb-3">
        <Card.Body>
          <Stack direction="horizontal">
            <Card.Title>{project.name}</Card.Title>
            <LinkContainer to={`/projects/${project.id}`}>
              <Button variant="light" className="ms-auto">
                View
              </Button>
            </LinkContainer>
          </Stack>
          <p>
            Status: <strong>{project.status}</strong>
          </p>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProjectCard;
