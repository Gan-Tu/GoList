// Fake API actions to mock out front end

export const fetchLists = () => {
  return {
    lists: [
      {
        title: "UI/UX IT Frontend Developer",
        subtitle: "(L6) Salt Lake City, UT",
        body:
          "We are looking for an experienced and creative designer and/or frontend engineer with ...",
        badge: "success",
        badgetxt: "New",
        links: ["https://www.google.com", "https://www.github.com"],
      },
      {
        title: "React Developer",
        subtitle: "San Diego, CA",
        body:
          "Ideally 2+ years experience with React. Bonus points if you have React Native experience...",
        badge: "danger",
        badgetxt: "Expired",
        links: ["https://www.google.com", "https://www.github.com"],
      },
    ],
  };
};

const IMAGE_URL_CARD_PLACEHOLDER = {
  title: "Lorem ipsum dolor sit amet, consectetur.",
  image: require("../assets/images/other-images/sidebar-bg.jpg"),
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
