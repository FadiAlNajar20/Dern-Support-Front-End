const InputTypes = {
  TEXT: "text",
  EMAIL: "email",
  PHONE: "tel", // "tel" is the correct type for phone inputs in HTML
  PASSWORD: "password",
  NUMBER: "number",
};

const Filters = ["Pending", "Completed", "In Progress"];

const requestStatus = {
  inProgress: Filters[2],
  completed: Filters[1],
  pending: Filters[0],
};

export { InputTypes, Filters,requestStatus };
