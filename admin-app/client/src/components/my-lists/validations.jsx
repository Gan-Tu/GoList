export const nameValidations = {
  required: "Please provide a valid golist URL",
  minLength: {
    value: 4,
    message: "golist URL must be at least 4 characters long",
  },
  maxLength: {
    value: 30,
    message: "golist URL must be at most 30 characters long",
  },
  pattern: {
    value: /^[A-Za-z][A-Za-z0-9-]{2,28}[A-Za-z0-9]$/,
    message:
      "golist URL must be a unique string of 4 to 30 letters, digits, " +
      "hypens. It must start with a letter, and cannot have a trailing hypen.",
  },
};

export const titleValidations = {
  required: "Please provide a valid golist title",
  maxLength: {
    value: 30,
    message: "golist title must be at most 50 characters long",
  },
};

export const descriptionValidations = {
  required: "Please provide a valid golist description",
  minLength: {
    value: 2,
    message: "golist description must be at least 20 characters long",
  },
};
