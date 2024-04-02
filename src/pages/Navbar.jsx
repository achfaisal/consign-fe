import NavbarLoggedIn from "../components/NavbarLoggedIn";
import NavbarLoggedOut from "../components/NavbarLoggedOut";
import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
function Navbar({ isLoggedIn, onLogout, name }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = () => {
    onLogout();
  };

  useEffect(() => {
    if (name !== "") {
      setIsLoading(false);
    }
  }, [name]);

  return (
    <nav>
      <ul>
        {!isLoading && isLoggedIn ? (
          <NavbarLoggedIn
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            name={name}
          />
        ) : (
          <NavbarLoggedOut />
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
