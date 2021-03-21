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
  required: "Please either provide a valid Image URL, or upload an image",
  pattern: {
    value: /.*\.(gif|jpe?g|bmp|png|svg|webp)$/gim,
    message: "Image URL must ends with gif, jpg, jpeg, bmp, png, svg, or webp.",
  },
};

export const urlValidations = {
  required: "Please provide a valid URL",
};
