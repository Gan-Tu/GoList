const { Datastore } = require("@google-cloud/datastore");
const datastore = new Datastore();

const SEED_DATA = [
  {
    key: datastore.key(["GoLists", "tugan"]),
    data: {
      listName: "tugan",
      created_by: "Gan",
      title: "Learn about Gan",
      description: "A curated social media list to learn more about Gan",
      update_date: new Date(),
    },
  },
  {
    key: datastore.key(["GoLists", "demo"]),
    data: {
      listName: "demo",
      created_by: "GoList Team",
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
      created_by: "Gan",
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
      created_by: "Gan",
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
      created_by: "Gan",
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
      title: "Praesent tincidunt enim et interdum facilisis",
      description:
        "Quisque lobortis leo eget sodales bibendum. Duis vitae turpis tempor, convallis quam at, placerat mauris.",
      created_by: "Gan",
      link: "",
      tags: [],
      image_url: "",
      update_date: new Date(),
    },
  },
  {
    key: datastore.key(["GoLists", "demo", "GoListItems", "demo-item-02"]),
    data: {
      title: "Etiam congue est a bibendum ultrices.",
      description:
        "Nulla consequat libero non velit accumsan interdum. Curabitur malesuada ante suscipit cursus posuere.",
      created_by: "Bot",
      link: "https://www.lipsum.com",
      tags: ["Coding"],
      image_url:
        "https://media-exp1.licdn.com/dms/image/C4D0BAQFdm87slb1cgQ/company-logo_200_200/0/1531055417022?e=2159024400&v=beta&t=2IDEiHkI_DZ2jCK5XKjD2frSnmpoFgV1qYWT65y0ktI",
      update_date: new Date(),
    },
  },
  {
    key: datastore.key(["GoLists", "demo", "GoListItems", "demo-item-03"]),
    data: {
      title: "In quis lectus ullamcorper",
      description:
        "Vivamus a nisl cursus, luctus dolor vitae, sagittis nunc. Quisque et odio ut mauris tristique auctor.",
      created_by: "Gan",
      link: "",
      tags: [],
      image_url: "",
      update_date: new Date(),
    },
  },
  {
    key: datastore.key(["GoLists", "demo", "GoListItems", "demo-item-04"]),
    data: {
      title: "Aliquam non leo euismod",
      description:
        "Praesent feugiat nulla ut rhoncus tempus. Sed scelerisque lacus ac pretium vestibulum.",
      created_by: "Gan",
      link: "",
      tags: [],
      image_url: "",
      update_date: new Date(),
    },
  },
  {
    key: datastore.key(["GoLists", "demo", "GoListItems", "demo-item-05"]),
    data: {
      title: "Google",
      description: "The greatest search engine of all time",
      created_by: "Bot",
      link: "https://www.google.com",
      tags: ["Productivity"],
      image_url:
        "https://www.dtl.coventry.domains/wp-content/uploads/2020/07/Google-Logo.png",
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
