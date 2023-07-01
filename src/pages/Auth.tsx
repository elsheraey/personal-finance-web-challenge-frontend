import { Button, Container, Flex } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { PATH_LOGIN, PATH_REGISTER } from "../constants/paths";

export default function Auth() {
  const navigate = useNavigate();
  const handleClickLogin = () => void navigate(PATH_LOGIN);
  const handleClickRegister = () => void navigate(PATH_REGISTER);

  return (
    <Container>
      <Flex gap="md" wrap="wrap" justify="center">
        <Button data-testid="login-button" onClick={handleClickLogin}>
          Login
        </Button>

        <Button data-testid="register-button" onClick={handleClickRegister}>
          Register
        </Button>
      </Flex>
    </Container>
  );
}
