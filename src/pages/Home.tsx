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
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getGoals } from "../api/goals";
import AddGoalModal from "../components/home/AddGoalModal";
import { logout } from "../store/auth";
import { formatDateString } from "../utils";

export default function Home() {
  const [opened, { open, close }] = useDisclosure(false);

  const dispatch = useDispatch();
  const handleClickLogout = () => void dispatch(logout());

  // OPTIMIZATION: Cache and update
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    getGoals().then((response) => setGoals(response.data));
  }, []);

  return (
    <>
      <AddGoalModal onClose={close} opened={opened} setGoals={setGoals} />

      <Container size="512px">
        <Flex gap="md" direction="column">
          <Center>
            <Title data-testid="home-title">Home</Title>
          </Center>

          <Button onClick={open}>Add Goal</Button>

          {/* OPTIMIZATION: List Virtualization */}
          {goals.map((goal: any) => (
            <Card shadow="sm" padding="lg" radius="md" withBorder key={goal.id}>
              <Flex direction="column" gap="md">
                <Text>{goal.name}</Text>
                <Text>Date: {formatDateString(goal.date)}</Text>
                <Text>Monthly Deposit: {goal.monthlyDeposit}</Text>
              </Flex>
            </Card>
          ))}

          <Button onClick={handleClickLogout}>Logout</Button>
        </Flex>
      </Container>
    </>
  );
}
