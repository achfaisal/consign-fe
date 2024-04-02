import { Link } from "react-router-dom";

const NavbarLoggedOut = () => {
  return (
    <>
      <div className="navbar bg-slate-500 text-white fixed top-0 w-full z-50">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavbarLoggedOut;
