import React from "react";
import { Link, NavLink } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useAuth } from "../../context/AuthContext";
import SearchInput from "../SearchInput";
import { useCart } from "../../context/CartContext";
export default function Header() {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: null,
    });
    localStorage.removeItem("token");
  };
  console.log("Sakib Bhai" , auth.user?.role)
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <TiShoppingCart /> Ecommerce App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
            <SearchInput/>
              <li className="nav-item ">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>
              {auth.token ? (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink 
                        className="dropdown-item"
                         to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                         >
                          Dashboard
                        </NavLink>
                      </li>
                      <li className="dropdown-item">
                        <NavLink
                          to="/login"
                          className="nav-link"
                          onClick={handleLogout}
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              )}

              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  Cart{cart?.length > 0 ? `(${cart.length})` : ""}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
