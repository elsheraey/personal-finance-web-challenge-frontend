import axios from "./axios";

export const createGoal = (
  name: string,
  amount: number,
  date: string,
  monthlyDeposit: number
) => {
  return axios.post("goals", { name, amount, date, monthlyDeposit });
};

export const getGoals = () => {
  return axios.get("goals");
};
