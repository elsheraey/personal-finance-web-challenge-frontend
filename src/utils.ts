// NOTE: Even though I got this from Mantine docs, I'm not sure if it's the best way to do.
//       I would prefer something that gives a similar expanded output to toLocaleString("en-us").
export const formatNumberInputValue = (value: string) =>
  !Number.isNaN(parseFloat(value))
    ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    : "";

export const parseNumberInputValue = (value: string) =>
  value.replace(/\$\s?|(,*)/g, "");

export const formatDateString = (dateStr: string) => {
  const date = new Date(dateStr);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${year}`;
};

// NOTE: This could be more interesting with interest and FV calculations
// REFACTOR: This is out of place in utils....
export const calculateMonthlyAmount = (
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
