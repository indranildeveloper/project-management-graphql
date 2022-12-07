import Stack from "react-bootstrap/Stack";
import AddClientModal from "../components/AddClientModal";
import AddProjectModal from "../components/AddProjectModal";
import Projects from "../components/Projects";
import Clients from "../components/Clients";

const Home = () => {
  return (
    <>
      <Stack direction="horizontal" gap={2}>
        <AddClientModal />
        <AddProjectModal />
      </Stack>
      <hr />
      <Projects />
      <Clients />
    </>
  );
};

export default Home;
