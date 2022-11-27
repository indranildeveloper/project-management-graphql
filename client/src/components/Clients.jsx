import { useQuery } from "@apollo/client";
import Table from "react-bootstrap/Table";
import ClientRow from "./ClientRow";
import Loading from "./Loading";
import { GET_CLIENTS } from "../queries/clientQueries";

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Something went wrong!</p>;
  }

  return (
    <div>
      {!loading && !error && (
        <Table hover bordered striped className="mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>email</th>
              <th>phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Clients;
