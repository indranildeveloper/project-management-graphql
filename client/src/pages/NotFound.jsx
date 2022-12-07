import { FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import Button from "react-bootstrap/Button";

const NotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <FaExclamationTriangle className="text-danger" size="5em" />
      <h1>404</h1>
      <p className="lead">Sorry, this page does not exists!</p>
      <LinkContainer to="/">
        <Button variant="success">
          <FaArrowLeft /> Go Back
        </Button>
      </LinkContainer>
    </div>
  );
};

export default NotFound;
