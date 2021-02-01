// Fake API actions to mock out front end

export const fetchLists = () => {
    return {
      lists: [
        {
          links: [
            "https://www.google.com",
            "https://www.github.com",
          ]
        }
      ]
    }
};