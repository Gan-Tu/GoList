const { Datastore } = require("@google-cloud/datastore");
const datastore = new Datastore();

const SEED_DATA = [
  {
    key: datastore.key(["GoLists", "tugan"]),
    data: {
      listName: "tugan",
      owner_uid: "69dlMd8Ze2RPw5ANlmLhZoivaxJ2",
      owner_display_name: "Gan Tu",
      title: "Learn about Gan",
      description: "A curated social media list to learn more about Gan",
      update_date: new Date(),
    },
  },
  {
    key: datastore.key(["GoLists", "demo"]),
    data: {
      listName: "demo",
      owner_uid: "69dlMd8Ze2RPw5ANlmLhZoivaxJ2",
      owner_display_name: "Gan Tu",
      title: "Demo List",
      description: "A curated demo by GoList team",
      update_date: new Date(),
    },
  },
  {
    key: datastore.key(["GoLists", "tugan", "GoListItems", "github"]),
    data: {
      title: "GitHub",
      description: "A repo of my software developments",
      owner_uid: "69dlMd8Ze2RPw5ANlmLhZoivaxJ2",
      owner_display_name: "Gan Tu",
      link: "https://github.com/Michael-Tu",
      tags: ["Coding", "Social Media"],
      image_url:
        "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
      update_date: new Date(),
    },
  },
  {
    key: datastore.key(["GoLists", "tugan", "GoListItems", "linkedin"]),
    data: {
      title: "LinkedIn",
      description: "My Professional Journey",
      owner_uid: "69dlMd8Ze2RPw5ANlmLhZoivaxJ2",
      owner_display_name: "Gan Tu",
      link: "https://www.linkedin.com/in/gantu/",
      tags: ["Career", "Social Media"],
      image_url:
        "http://www.freelogovectors.net/wp-content/uploads/2020/01/linkedin-logo.png",
      update_date: new Date(),
    },
  },
  {
    key: datastore.key(["GoLists", "tugan", "GoListItems", "youtube"]),
    data: {
      title: "YouTube",
      description: "Don't forget to subscribe!",
      owner_uid: "69dlMd8Ze2RPw5ANlmLhZoivaxJ2",
      owner_display_name: "Gan Tu",
      link: "https://www.youtube.com/channel/UC6iqsCyBrY79kv84B0HWojw",
      tags: [],
      image_url:
        "https://i.pinimg.com/originals/de/b4/93/deb493608dae9e533ef6b6894095b797.png",
      update_date: new Date(),
    },
  },
  {
    key: datastore.key(["GoLists", "demo", "GoListItems", "demo-item-01"]),
    data: {
      title: "Admin Template",
      link: "http://admin.pixelstrap.com/Xolo/ltr/landing-page.html",
      owner_uid: "69dlMd8Ze2RPw5ANlmLhZoivaxJ2",
      owner_display_name: "Gan Tu",
      tags: ["Example"],
      description:
        "Xolo is beautifully crafted, clean and modern designed admin theme with 6 different demos and light - dark versions.",
      update_date: new Date(),
    },
  },
  {
    key: datastore.key(["GoLists", "demo", "GoListItems", "demo-item-02"]),
    data: {
      title: "Universal Template",
      link: "https://angular.pixelstrap.com/universal/landing",
      owner_uid: "69dlMd8Ze2RPw5ANlmLhZoivaxJ2",
      owner_display_name: "Gan Tu",
      tags: ["Example"],
      image_url:
        "https://react.pixelstrap.com/cuba/static/media/02.4305442c.jpg",
      description:
        "Universal is beautifully crafted, clean and modern designed admin theme",
      update_date: new Date(),
    },
  },
  {
    key: datastore.key(["GoLists", "demo", "GoListItems", "demo-item-03"]),
    data: {
      title: "Angular Theme",
      link: "https://angular.pixelstrap.com/Xolo/landing",
      owner_uid: "69dlMd8Ze2RPw5ANlmLhZoivaxJ2",
      owner_display_name: "Gan Tu",
      tags: ["Example"],
      image_url:
        "https://react.pixelstrap.com/cuba/static/media/03.db84143c.jpg",
      description:
        "Xolo is beautifully crafted, clean and modern designed admin theme",
      update_date: new Date(),
    },
  },
  {
    key: datastore.key(["GoLists", "demo", "GoListItems", "demo-item-04"]),
    data: {
      title: "Multikart Admin",
      link: "http://themes.pixelstrap.com/multikart/back-end/index.html",
      owner_uid: "69dlMd8Ze2RPw5ANlmLhZoivaxJ2",
      owner_display_name: "Gan Tu",
      tags: ["Example"],
      image_url:
        "https://react.pixelstrap.com/cuba/static/media/04.0fee3312.jpg",
      description: "Multikart Admin is modern designed admin theme",
      update_date: new Date(),
    },
  },
  {
    key: datastore.key(["GoLists", "demo", "GoListItems", "demo-item-05"]),
    data: {
      title: "Ecommerece theme",
      link: "http://themes.pixelstrap.com/multikart",
      owner_uid: "69dlMd8Ze2RPw5ANlmLhZoivaxJ2",
      owner_display_name: "Gan Tu",
      tags: ["Example"],
      image_url:
        "https://react.pixelstrap.com/cuba/static/media/05.77a41af3.jpg",
      description:
        "Multikart HTML template is an apparently simple but highly functional tempalate designed for creating a flourisahing online business.",
      update_date: new Date(),
    },
  },
  {
    key: datastore.key(["GoLists", "demo", "GoListItems", "demo-item-06"]),
    data: {
      title: "Tovo app landing page",
      link: "http://vue.pixelstrap.com/tovo/home-one",
      owner_uid: "69dlMd8Ze2RPw5ANlmLhZoivaxJ2",
      owner_display_name: "Gan Tu",
      tags: ["Example"],
      image_url:
        "https://react.pixelstrap.com/cuba/static/media/06.1d72b207.jpg",
      description: "Amazing Landing Page With Easy Customization",
      update_date: new Date(),
    },
  },
];

async function getData(kind, parent_key) {
  let query = datastore.createQuery(kind).hasAncestor(parent_key);
  try {
    const [tasks] = await datastore.runQuery(query);
    console.log("Tasks:");
    tasks.forEach((task) => console.log(task));
  } catch (err) {
    console.error(err);
  }
}

datastore.save(SEED_DATA, function (err, apiResponse) {
  if (err && err.code === /* ALREADY_EXISTS */ 6) {
    console.log("already exists");
  } else if (err) {
    console.log(`error: ${err.message}`);
  } else {
    console.log(SEED_DATA);
    console.log(apiResponse);
  }
  // getData("Urls", datastore.key(["GoLists", "tugan"]));
});

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

// purgeAllDate("GoListItems");
// purgeAllDate("GoLists");
