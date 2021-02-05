export const StyledSelect = {
  menu: (base) => ({
    ...base,
    paddingTop: 0,
    marginTop: 0,
  }),
  singleValue: (base) => ({
    ...base,
    color: "black",
  }),
  input: (base) => ({
    ...base,
    color: "black",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#8a8a8a",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0px 4px",
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    display: "none",
  }),
  clearIndicator: (base) => ({
    ...base,
    cursor: "pointer",
  }),
  control: (base) => ({
    ...base,
    cursor: "text",
    height: "34px",
    minHeight: "none",
    boxShadow: "none",
    borderRadius: "0px",
    border: "none",
    backgroundColor: "transparent",
    borderBottom: "2px solid #D6D6D6",
    ":hover": {
      border: "none",
      borderBottom: "2px solid black",
    },
  }),
};
