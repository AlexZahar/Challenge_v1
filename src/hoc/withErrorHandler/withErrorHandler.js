import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Aux from "../Aux";
import { Link } from "react-router-dom";
import classes from "./withErrorHandler.module.css";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    setInterceptors = () => {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    };

    componentWillUnmount() {
      console.log("will_unmount", this.reqInterceptor, this.resInterceptor);
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }
    onRefreshTable = () => {
      this.props.onFetchCandidates();
      // this.setState({ undefinedDataRefreshBtn: false });
    };
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      this.setInterceptors();
      return (
        <Aux>
          <div show={this.state.error} className={classes.Error__wrapper}>
            {this.state.error ? (
              <div>
                <h3>
                  {this.state.error.message} <br /> The requested page has not
                  been found
                </h3>
                <Link to="/">
                  {" "}
                  <Button variant="contained" color="primary">
                    {" "}
                    Refresh Table
                  </Button>
                </Link>
              </div>
            ) : null}
          </div>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
