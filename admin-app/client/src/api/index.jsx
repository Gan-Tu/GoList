// Fake API actions to mock out front end

import ICON from "../assets/images/other-images/sidebar-bg.jpg";

const _EXAMPLE_LIST_METADATA = [
  {
    title: "UI/UX IT Frontend Developer",
    listName: "ui-ux-job",
    body:
      "We are looking for an experienced and creative designer and/or frontend engineer with ...",
    badge: "success",
    badgetxt: "New",
    links: ["https://www.google.com", "https://www.github.com"],
  },
  {
    title: "React Developer",
    listName: "react-developer-job",
    body:
      "Ideally 2+ years experience with React. Bonus points if you have React Native experience...",
    badge: "danger",
    badgetxt: "Expired",
    links: ["https://www.google.com", "https://www.github.com"],
  },
];

export const fetchLists = (uid) => {
  if (!uid) {
    return { lists: _EXAMPLE_LIST_METADATA };
  }

  console.info(`fetching golist metadata for user ID: ${uid}`);
  return fetch(`https://api.goli.st/users/${uid}/lists`)
    .then((resp) => resp.json())
    .then((result) => {
      var lists = [];
      if (result && result.lists) {
        lists = result.lists.map((x) => ({
          title: x.title,
          listName: x.listName,
          body: x.description,
        }));
      }
      return { lists };
    });
};

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
