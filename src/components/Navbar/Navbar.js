import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Button, Typography, Toolbar } from "@material-ui/core";
import useStyles from "./styles";
import decode from "jwt-decode";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import blogsterSVG from "../../images/blogster.svg";
import * as actionType from "../../constants/actionTypes";

function Navbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history.push("/auth");
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={blogsterSVG} img alt="logo"/>
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageURL}>
              {user.result.name.charAt(0).toUpperCase()}
            </Avatar>
            <Typography className={classes.username} variant="h6">
              {user.result.name
                .split(" ")
                .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
                .join(" ")}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
