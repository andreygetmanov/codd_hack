import { Box, Container} from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
});







function Dashboard() {
  
  return (
    <>
      <Container>
        <Box>
        </Box>
      </Container>
    </>
  );
}