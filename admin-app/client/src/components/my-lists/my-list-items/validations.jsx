export const titleValidations = {
  required: "Please provide a valid title",
  maxLength: {
    value: 30,
    message: "title must be at most 30 characters long",
  },
};

export const descriptionValidations = {
  required: "Please provide a valid description",
  minLength: {
    value: 2,
    message: "description must be at least 2 characters long",
  },
};

export const imageUrlValidation = {
  required: "Please provide a valid Image URL",
  pattern: {
    value: /.*\.(gif|jpe?g|bmp|png|svg)$/gim,
    message: "Image URL must ends with gif, jpg, jpeg, bmp, png, or svg.",
  },
};

export const urlValidations = {
  required: "Please provide a valid URL",
};