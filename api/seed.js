const { Datastore } = require("@google-cloud/datastore");
const datastore = new Datastore();

const SEED_DATA = [
  {
    key: datastore.key(["GoLists", "tugan"]),
    data: {
      name: "tugan",
      title: "Gan is the best",
      last_modified_date: new Date("29 March 1997"),
      owner: "Admin",
      hits: 100,
    },
  },
  {
    key: datastore.key(["GoLists", "demo"]),
    data: {
      name: "demo",
      title: "Lorem ipsum dolor sit amet, consectetur.",
      last_modified_date: new Date("9 April 2019"),
      owner: "Admin",
      hits: 100,
    },
  },
  {
    key: datastore.key(["GoLists", "demo", "nested", "01"]),
    data: {
      name: "demo-nested-01",
      title: "Lorem ipsum dolor sit amet, consectetur.",
      last_modified_date: new Date("9 April 2019"),
      owner: "Admin",
      hits: 100,
    },
  },
  {
    key: datastore.key(["GoLists", "demo", "nested", "02"]),
    data: {
      name: "demo-nested-02",
      title: "Lorem ipsum dolor sit amet, consectetur.",
      last_modified_date: new Date("9 April 2019"),
      owner: "Admin",
      hits: 100,
    },
  },
  {
    key: datastore.key(["nested", "03"]),
    data: {
      name: "nested-03",
      title: "Lorem ipsum dolor sit amet, consectetur.",
      last_modified_date: new Date("9 April 2019"),
      owner: "Admin",
      hits: 100,
    },
  },
];

async function getData() {
  let query = datastore
    .createQuery("nested")
    .hasAncestor(datastore.key(["GoLists", "demo"]));
  // .filter("date", "<", new Date("29 March 2000"));
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
  getData();
});