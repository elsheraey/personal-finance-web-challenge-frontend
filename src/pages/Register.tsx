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
import { useNavigate } from "react-router-dom";

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
  const handleClickBack = () => void navigate("/");

  return (
    // NOTE: I replaced sx={{ maxWidth: "512px" }} with size="512px" after I learned about the size prop
    <Container size="512px">
      <Center>
        <form
          onSubmit={form.onSubmit((values) => console.log(values))}
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
