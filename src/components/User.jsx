import { createContext, useState, useEffect } from "react";
import { getUser } from "../utils/api";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [loggedInUser, setLoggedInUser] = useState({
    username: "Naomi",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function fetchUser() {
      setIsLoading(true);
      setErr(null);

      try {
        const result = await getUser();

        if (!ignore) setLoggedInUser(result);
      } catch (e) {
        if (!ignore) setErr(e.message);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    fetchUser();

    return () => {
      ignore = true;
    };
  }, []);
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {err && <p>{err}</p>}

      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        {props.children}
      </UserContext.Provider>
    </>
  );
};
