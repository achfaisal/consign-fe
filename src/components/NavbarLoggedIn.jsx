import { Link } from "react-router-dom";
import NewPostModal from "./NewPostModal";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const NavbarLoggedIn = ({ isLoggedIn, onLogout, name }) => {
  const [message, setMessage] = useState("");

  // const [name, setName] = useState("");
  // const [isScrolled, setIsScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollTop = window.scrollY;
  //     if (scrollTop > 0) {
  //       setIsScrolled(true);
  //     } else {
  //       setIsScrolled(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-base-300 fixed top-0 z-50">
            <div className="flex-1 px-2 mx-2">
              <Link to="/">Home</Link>
            </div>

            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>

            <dialog
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <NewPostModal message={message} setMessage={setMessage} />
                <div className="modal-action">
                  <form method="dialog">
                    <button
                      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                      onClick={() => setMessage("")}
                    >
                      ✕
                    </button>
                  </form>
                </div>
              </div>
            </dialog>

            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                <li>
                  <button
                    onClick={() =>
                      document.getElementById("my_modal_5").showModal()
                    }
                  >
                    Posting Baru
                  </button>
                  <dialog
                    id="my_modal_5"
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box">
                      <NewPostModal />
                      <div className="modal-action">
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </li>
                <li>
                  <details>
                    <summary>Hello, {name}</summary>
                    <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-28 right-0 text-black">
                      <li>
                        <Link to="/my-posts">My Posts</Link>
                      </li>
                      <li>
                        <button onClick={onLogout}>Logout</button>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="drawer-side z-50">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            <li>
              <a>Sidebar Item 2</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavbarLoggedIn;
