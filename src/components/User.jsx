import { createContext, useState, useEffect } from "react";
import { getUser } from "../utils/api";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [loggedInUser, setLoggedInUser] = useState({
    username: "Naomi",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141",
  });

  useEffect(() => {
    async function fetchUser() {
      const result = await getUser();
      setLoggedInUser(result);
    }

    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
