import {
  Button,
  Card,
  Center,
  Container,
  Flex,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useDispatch } from "react-redux";
import AddGoalModal from "../components/home/AddGoalModal";
import { logout } from "../store/auth";

export default function Home() {
  const [opened, { open, close }] = useDisclosure(false);

  const dispatch = useDispatch();
  const handleClickLogout = () => void dispatch(logout());

  return (
    <>
      <AddGoalModal onClose={close} opened={opened} />

      <Container size="512px">
        <Flex gap="md" direction="column">
          <Center>
            <Title data-testid="home-title">Home</Title>
          </Center>

          <Button onClick={open}>Add Goal</Button>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Flex direction="column" gap="md">
              <Text>Goal Name</Text>
              <Text>Date:</Text>
              <Text>Monthly Deposit:</Text>
            </Flex>
          </Card>

          <Button onClick={handleClickLogout}>Logout</Button>
        </Flex>
      </Container>
    </>
  );
}
