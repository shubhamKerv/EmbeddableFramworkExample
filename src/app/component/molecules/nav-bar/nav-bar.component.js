import navBarTemplate from "./nav-bar.template";
import { useLocation } from "react-router-dom";

export const NavBar = () => {
  const pathname = useLocation()?.pathname;
  let location = {
    home: false,
    contacts: false,
    interactions: false,
    config: false
  }

  if (pathname.startsWith("/contacts"))
    location.contacts = true;
  else if (pathname.startsWith("/interactions"))
    location.interactions = true;
  else if (pathname.startsWith("/config"))
    location.config = true;
  else if (pathname.length === 1)
    location.home = true;

  console.log("inside navbar ", pathname, location);
  return navBarTemplate({ location });
};