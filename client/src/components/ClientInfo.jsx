import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";

const ClientInfo = ({ client }) => {
  return (
    <>
      <h5 className="mt-1 mb-3">Client Information</h5>
      <ListGroup className="mb-4">
        <ListGroupItem>
          <FaIdBadge className="me-2" /> {client.name}
        </ListGroupItem>
        <ListGroupItem>
          <FaEnvelope className="me-2" /> {client.email}
        </ListGroupItem>
        <ListGroupItem>
          <FaPhone className="me-2" /> {client.phone}
        </ListGroupItem>
      </ListGroup>
    </>
  );
};

export default ClientInfo;
