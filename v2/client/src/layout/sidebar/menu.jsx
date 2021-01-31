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
        path: `${process.env.PUBLIC_URL}/welcome/default`,
        active: true,
      },
      {
        title: "Edit",
        icon: Edit,
        type: "link",
        path: `${process.env.PUBLIC_URL}/welcome/edit`,
        active: false,
      },
    ],
  },
];
