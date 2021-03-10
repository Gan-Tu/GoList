// Fake API actions to mock out front end

import ICON from "../assets/images/other-images/sidebar-bg.jpg";

const IMAGE_URL_CARD_PLACEHOLDER = {
  title: "Lorem ipsum dolor sit amet, consectetur.",
  image: ICON,
  date: "9 April 2019",
  owner: "Admin",
  hits: 100,
};

const TEXT_URL_CARD_PLACEHOLDER = {
  title: "Lorem ipsum dolor sit amet, consectetur.",
  date: "9 April 2019",
  owner: "Admin",
  hits: 100,
};

export const fetchItems = () => {
  return {
    data: Array(3)
      .fill(IMAGE_URL_CARD_PLACEHOLDER)
      .concat(Array(9).fill(TEXT_URL_CARD_PLACEHOLDER)),
  };
};
