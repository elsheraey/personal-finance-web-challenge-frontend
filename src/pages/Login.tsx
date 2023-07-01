import {
  Button,
  Center,
  Container,
  Flex,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { IconAt } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { HTTP_EXCEPTION_NOT_FOUND } from "../api/axios";
import { PATH_HOME } from "../constants/paths";
import { setAccessToken, setIsLoggedIn, setRefreshToken } from "../store/auth";

export default function Login() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: isEmail("Invalid email"),
      password: hasLength({ min: 8 }, "Must be at least 8 characters long"),
    },
  });

  const navigate = useNavigate();
  const handleClickBack = () => void navigate(PATH_HOME);

  const dispatch = useDispatch();

  const handleFormSubmit = (values: typeof form.values) => {
    login(values.email, values.password)
      .then((response) => {
        const { accessToken, refreshToken } = response.data;
        dispatch(setIsLoggedIn(true));
        dispatch(setAccessToken(accessToken));
        dispatch(setRefreshToken(refreshToken));
        navigate(PATH_HOME);
      })
      .catch((error) => {
        if (HTTP_EXCEPTION_NOT_FOUND === error?.response?.status) {
          form.setFieldError("email", "Email not found");
        }
      });
  };

  return (
    // REFACTOR: This is a duplicate of Register.tsx, can we extract it? I kept it in case we wanted both pages to look different.
    <Container size="512px">
      <Center>
        <form
          onSubmit={form.onSubmit(handleFormSubmit)}
          style={{ width: "100%" }}
        >
          <Flex direction="column" gap="md">
            <Center>
              <Title>Login Form</Title>
            </Center>

            <TextInput
              {...form.getInputProps("email")}
              data-testid="login-email-input"
              icon={<IconAt />}
              placeholder="Your email"
            />

            <PasswordInput
              {...form.getInputProps("password")}
              data-testid="login-password-input"
              placeholder="Your password"
            />

            <Button data-testid="login-submit-button" type="submit">
              Login
            </Button>

            <Button data-testid="login-back-button" onClick={handleClickBack}>
              Back
            </Button>
          </Flex>
        </form>
      </Center>
    </Container>
  );
}
