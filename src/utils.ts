// NOTE: Even though I got this from Mantine docs, I'm not sure if it's the best way to do.
//       I would prefer something that gives a similar expanded output to toLocaleString("en-us").
export const formatNumberInputValue = (value: string) =>
  !Number.isNaN(parseFloat(value))
    ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    : "";

export const parseNumberInputValue = (value: string) =>
  value.replace(/\$\s?|(,*)/g, "");
