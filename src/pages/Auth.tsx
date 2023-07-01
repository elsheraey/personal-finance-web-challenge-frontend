import { Button, Container, Flex } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();
  const handleClickLogin = () => void navigate("/login");
  const handleClickRegister = () => void navigate("/register");

  return (
    <Container>
      <Flex gap="md" wrap="wrap" justify="center">
        <Button onClick={handleClickLogin}>Login</Button>
        <Button onClick={handleClickRegister}>Register</Button>
      </Flex>
    </Container>
  );
}
