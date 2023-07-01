import { Button, Flex, Modal, NumberInput, TextInput } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { isInRange, isNotEmpty, useForm } from "@mantine/form";
import { formatNumberInputValue, parseNumberInputValue } from "../../utils";

// NOTE: This could be more interesting with interest and FV calculations
const calculateMonthlyAmount = (
  totalAmount: number,
  currentDate: Date,
  goalDate: Date
): number => {
  const remainingMonths =
    (goalDate.getFullYear() - currentDate.getFullYear()) * 12 +
    goalDate.getMonth() -
    currentDate.getMonth();

  if (remainingMonths <= 0) {
    return 0; // Goal date is in the past or current month, no monthly amount needed
  }

  return totalAmount / remainingMonths;
};

interface AddGoalModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function AddGoalModal({ opened, onClose }: AddGoalModalProps) {
  const currentDate = new Date();
  const nextMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1
  );

  const form = useForm({
    initialValues: {
      name: "",
      totalAmount: 0,
      goalDate: nextMonthDate,
      monthlyAmount: 0,
    },
    validate: {
      name: isNotEmpty("Goal name is required"),
      totalAmount: isInRange({ min: 0 }, "Value must be positive"),
    },
  });

  const handleChangeGoalTotalAmount = (value: number) => {
    form.setFieldValue("totalAmount", value);
    const monthlyAmount = calculateMonthlyAmount(
      value,
      currentDate,
      form.values.goalDate
    );
    form.setValues({ monthlyAmount });
  };

  const handleChangeGoalDate = (value: Date) => {
    form.setFieldValue("goalDate", value);
    const monthlyAmount = calculateMonthlyAmount(
      form.values.totalAmount,
      currentDate,
      value
    );
    form.setValues({ monthlyAmount });
  };

  return (
    <Modal onClose={onClose} opened={opened} title="Add Goal">
      <form
        onSubmit={form.onSubmit((values) => console.log(values))}
        style={{ width: "100%" }}
      >
        <Flex direction="column" gap="md">
          <TextInput {...form.getInputProps("name")} label="Goal name" />

          <NumberInput
            {...form.getInputProps("totalAmount")}
            formatter={formatNumberInputValue}
            label="Total amount"
            min={0}
            onChange={handleChangeGoalTotalAmount}
            parser={parseNumberInputValue}
          />

          <MonthPickerInput
            {...form.getInputProps("goalDate")}
            label="Date to reach goal"
            minDate={nextMonthDate}
            onChange={handleChangeGoalDate}
            popoverProps={{ withinPortal: true }}
          />

          <TextInput
            label="Monthly amount"
            value={formatNumberInputValue(
              form.getInputProps("monthlyAmount").value
            )}
            readOnly
          />

          <Button type="submit">Add</Button>
        </Flex>
      </form>
    </Modal>
  );
}
