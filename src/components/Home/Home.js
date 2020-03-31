import React from "react";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const home = () => (
  <div className={classes.Home__wrapper}>
    <h3>Welcome to Personio candidate table</h3>
    <Link to="/candidates">
      <Button variant="contained" color="primary">
        Display the table
      </Button>
    </Link>
  </div>
);

export default home;
