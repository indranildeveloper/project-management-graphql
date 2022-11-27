import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import Clients from "./components/Clients";
import AddClientModal from "./components/AddClientModal";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache,
});

const App = () => {
  return (
    <div>
      <ApolloProvider client={client}>
        <Header />
        <Container>
          <AddClientModal />
          <Clients />
        </Container>
      </ApolloProvider>
    </div>
  );
};

export default App;
