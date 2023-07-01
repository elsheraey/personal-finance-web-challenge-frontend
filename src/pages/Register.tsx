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
import { register } from "../api/auth";
import { HTTP_EXCEPTION_CONFLICT } from "../api/axios";
import { PATH_HOME } from "../constants/paths";
import { setAccessToken, setIsLoggedIn, setRefreshToken } from "../store/auth";

export default function Register() {
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
    register(values.email, values.password)
      .then((response) => {
        const { accessToken, refreshToken } = response.data;
        dispatch(setIsLoggedIn(true));
        dispatch(setAccessToken(accessToken));
        dispatch(setRefreshToken(refreshToken));
        navigate(PATH_HOME);
      })
      .catch((error) => {
        if (HTTP_EXCEPTION_CONFLICT === error?.response?.status) {
          form.setFieldError("email", "Email already exists");
        }
      });
  };

  return (
    // NOTE: I replaced sx={{ maxWidth: "512px" }} with size="512px" after I learned about the size prop
    <Container size="512px">
      <Center>
        <form
          onSubmit={form.onSubmit(handleFormSubmit)}
          style={{ width: "100%" }}
        >
          <Flex direction="column" gap="md">
            <Center>
              {/* NOTE: Default order is 1 though I wanted to play with it */}
              <Title order={1}>Registeration Form</Title>
            </Center>

            <TextInput
              {...form.getInputProps("email")}
              icon={<IconAt />}
              placeholder="Your email"
            />

            <PasswordInput
              {...form.getInputProps("password")}
              placeholder="Your password"
            />

            <Button type="submit">Register</Button>

            <Button onClick={handleClickBack}>Back</Button>
          </Flex>
        </form>
      </Center>
    </Container>
  );
}
