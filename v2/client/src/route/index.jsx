import Default from "../components/home";
import MyLinks from "../components/my-lists";


export const routes = [
  { path: `${process.env.PUBLIC_URL}/home`, Component: Default },
  { path: `${process.env.PUBLIC_URL}/my-lists`, Component: MyLinks },
];
