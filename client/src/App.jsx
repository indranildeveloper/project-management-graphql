import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Project from "./pages/Project";
import NotFound from "./pages/NotFound";

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
        <BrowserRouter>
          <Header />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:projectId" element={<Project />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
};

export default App;
