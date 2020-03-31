import React from "react";
import classes from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import personioLogo from "../../assets/personio_logo.svg";

const navigation = () => (
  <div className={classes.Navigation}>
    <NavLink to="/" activeStyle={{ color: "#111", textDecoration: "none" }}>
      <img
        src={personioLogo}
        className={classes.Navigation__logo}
        alt="personio logo"
      ></img>
    </NavLink>
  </div>
);

export default navigation;
