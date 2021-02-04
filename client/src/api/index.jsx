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
