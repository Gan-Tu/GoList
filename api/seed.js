const { Datastore } = require("@google-cloud/datastore");
const datastore = new Datastore();
const fetch = require("node-fetch");

const GOLIST_API_ENDPOINT = "https://api.goli.st";
// const GOLIST_API_ENDPOINT = "localhost:3000";

const GAN_UID = "69dlMd8Ze2RPw5ANlmLhZoivaxJ2";
const GAN_DISPLAY_NAME = "Gan Tu";

const TRAVIS_UID = "tkWUUkPeSnQAbrc7Qrn17eJV7Et2";
const TRAVIS_DISPLAY_NAME = "Travis Brashears";

async function purgeAllDate(kind) {
  let query = datastore.createQuery(kind);
  try {
    const [tasks] = await datastore.runQuery(query);
    const keys = tasks.map((task) => task[datastore.KEY]);
    datastore.delete(keys, (err, apiResponse) => {
      if (err) {
        console.error(err);
      } else {
        console.log(apiResponse);
      }
    });
  } catch (err) {
    console.error(err);
  }
}

function seedLists(listName, data) {
  fetch(`${GOLIST_API_ENDPOINT}/lists/${listName}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then(({ err, ok }) => {
      if (ok) {
        console.log(`Seeded GoList: https://api.goli.st/lists/${listName}`);
      } else {
        console.info(err);
      }
    });
}

function seedListItem(listName, data) {
  fetch(`${GOLIST_API_ENDPOINT}/lists/${listName}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then(({ err, ok, itemId }) => {
      if (ok) {
        console.log(
          `Seeded GoList Item: '${data.title}' at ` +
            `https://api.goli.st/lists/${listName}/items/${itemId}`
        );
      } else {
        console.info(err);
      }
    });
}

function seedAllLists() {
  seedLists("tugan", {
    owner_uid: GAN_UID,
    owner_display_name: GAN_DISPLAY_NAME,
    title: "Learn about Gan",
    description: "A curated social media list to learn more about Gan",
  });

  seedLists("demo", {
    owner_uid: GAN_UID,
    owner_display_name: GAN_DISPLAY_NAME,
    title: "Demo List",
    description: "A curated demo by GoList team",
  });

  seedLists("demo2", {
    owner_uid: TRAVIS_UID,
    owner_display_name: TRAVIS_DISPLAY_NAME,
    title: "Demo List",
    description: "A curated demo by GoList team",
  });
}

// purgeAllDate("GoLists").then(() => {
//   seedAllLists();
// });

seedAllLists();

function seedAllListItems() {
  seedListItem("tugan", {
    owner_uid: GAN_UID,
    owner_display_name: GAN_DISPLAY_NAME,
    title: "LinkedIn",
    description: "My Professional Journey",
    link: "https://www.linkedin.com/in/gantu/",
    tags: ["Career", "Social Media"],
    image_url:
      "http://www.freelogovectors.net/wp-content/uploads/2020/01/linkedin-logo.png",
  });

  seedListItem("tugan", {
    owner_uid: GAN_UID,
    owner_display_name: GAN_DISPLAY_NAME,
    title: "GitHub",
    description: "A repo of my software developments",
    link: "https://github.com/Gan-Tu",
    tags: ["Coding", "Social Media"],
    image_url:
      "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
  });

  seedListItem("tugan", {
    owner_uid: GAN_UID,
    owner_display_name: GAN_DISPLAY_NAME,
    title: "YouTube",
    description: "Don't forget to subscribe!",
    link: "https://www.youtube.com/channel/UC6iqsCyBrY79kv84B0HWojw",
    tags: [],
    image_url:
      "https://i.pinimg.com/originals/de/b4/93/deb493608dae9e533ef6b6894095b797.png",
  });

  const SEED_ITEMS = [
    {
      title: "Admin Template",
      link: "http://admin.pixelstrap.com/Xolo/ltr/landing-page.html",
      tags: ["Example"],
      description:
        "Xolo is beautifully crafted, clean and modern designed admin theme with 6 different demos and light - dark versions.",
      update_date: new Date(),
    },
    {
      title: "Universal Template",
      link: "https://angular.pixelstrap.com/universal/landing",
      tags: ["Example"],
      image_url:
        "https://react.pixelstrap.com/cuba/static/media/02.4305442c.jpg",
      description:
        "Universal is beautifully crafted, clean and modern designed admin theme",
      update_date: new Date(),
    },
    {
      title: "Angular Theme",
      link: "https://angular.pixelstrap.com/Xolo/landing",
      tags: ["Example"],
      image_url:
        "https://react.pixelstrap.com/cuba/static/media/03.db84143c.jpg",
      description:
        "Xolo is beautifully crafted, clean and modern designed admin theme",
      update_date: new Date(),
    },
    {
      title: "Multikart Admin",
      link: "http://themes.pixelstrap.com/multikart/back-end/index.html",
      tags: ["Example"],
      image_url:
        "https://react.pixelstrap.com/cuba/static/media/04.0fee3312.jpg",
      description: "Multikart Admin is modern designed admin theme",
      update_date: new Date(),
    },
    {
      title: "Ecommerece theme",
      link: "http://themes.pixelstrap.com/multikart",
      tags: ["Example"],
      image_url:
        "https://react.pixelstrap.com/cuba/static/media/05.77a41af3.jpg",
      description:
        "Multikart HTML template is an apparently simple but highly functional tempalate designed for creating a flourisahing online business.",
      update_date: new Date(),
    },
    {
      title: "Tovo app landing page",
      link: "http://vue.pixelstrap.com/tovo/home-one",
      tags: ["Example"],
      image_url:
        "https://react.pixelstrap.com/cuba/static/media/06.1d72b207.jpg",
      description: "Amazing Landing Page With Easy Customization",
      update_date: new Date(),
    },
  ];

  SEED_ITEMS.map((item) =>
    seedListItem("demo", {
      ...item,
      owner_uid: GAN_UID,
      owner_display_name: GAN_DISPLAY_NAME,
    })
  );

  SEED_ITEMS.map((item) =>
    seedListItem("demo2", {
      ...item,
      owner_uid: TRAVIS_UID,
      owner_display_name: TRAVIS_DISPLAY_NAME,
    })
  );
}

// purgeAllDate("GoListItems").then(() => {
//   seedAllListItems();
// });
seedAllListItems();
