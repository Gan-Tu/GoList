import { Home, Edit} from "react-feather";
export const MENUITEMS = [
  {
    menutitle: null,
    menucontent: null,
    displaytopmenu: false,
    Items: [
      {
        title: "Home",
        icon: Home,
        type: "link",
        path: `${process.env.PUBLIC_URL}/home`,
        active: true,
      },
      {
        title: "My Links",
        icon: Edit,
        type: "link",
        path: `${process.env.PUBLIC_URL}/my-links`,
        active: false,
        badge: "badge badge-success",
        badgetxt: "0"
      },
    ],
  },
];
