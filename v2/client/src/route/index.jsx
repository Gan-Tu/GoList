import Default from "../components/home";
import Edit from "../components/edit";


export const routes = [
  { path: `${process.env.PUBLIC_URL}/home`, Component: Default },
  { path: `${process.env.PUBLIC_URL}/edit`, Component: Edit },
];
