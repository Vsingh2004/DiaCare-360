'use client';
const { useRouter } = require("next/navigation");
const { createContext, useState, useContext, useEffect } = require("react");

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Ensure localStorage is accessed only on the client side
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
    setLoggedIn(user !== null);
  }, []); // This will run once after the component mounts

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    setLoggedIn(false);
    router.push("/login");
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loggedIn,
        setLoggedIn,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);
export default useAppContext;
