import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./style.scss";
import Header from "../../../components/Header";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      btnDisabled: false,
      error: "none",
      errorText: "",
    };
    this.postData = this.postData.bind(this);
  }
  postData() {
    this.setState({ btnDisabled: true });
    let username = this.state.username,
      email = this.state.email,
      password = this.state.password;

    if (username.length < 3) {
      this.setState({
        error: "block",
        errorText: "Username is too short",
        btnDisabled: false,
      });
      return;
    } else if (password.length < 6) {
      this.setState({
        error: "block",
        errorText: "Password is too short",
        btnDisabled: false,
      });
      return;
    } else if (!email.includes("@") || !email.includes(".")) {
      this.setState({
        error: "block",
        btnDisabled: false,
        errorText: "Email is badly formatted",
      });
      return;
    }

    let data = {
      username,
      email,
      password,
    };
    axios
      .post("http://localhost:5000/auth/signup", data)
      .then((res) => {
        console.log(res);
        this.setState({
          errorText: res.statusText,
          error: "block",
          btnDisabled: false,
        });
        if (res.statusText == "OK") {
          window.location.pathname = "/auth/setup";
        }
      })
      .catch((e) => {
        console.log(e);
        this.setState({
          errorText: "Error occurred!",
          error: "block",
          btnDisabled: false,
        });
      });
  }
  render() {
    return (
      <div>
        <Header />
        <div className="form-container">
          <h1 className="title">Sign Up</h1>
          <form>
            <label style={{ display: this.state.error }}>
              {this.state.errorText}
            </label>
            <input
              type="text"
              name="username"
              required
              minLength={3}
              maxLength={20}
              value={this.state.username}
              onChange={(e) => {
                this.setState({ username: e.target.value });
              }}
              spellCheck="false"
              className="input-field"
              placeholder="Username"
            />{" "}
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
              spellCheck="false"
              className="input-field"
              placeholder="Email"
              required
            />{" "}
            <input
              type="password"
              name="password"
              required
              minLength={6}
              value={this.state.password}
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
              placeholder="Password"
              className="input-field"
            />{" "}
            <label className="terms">
              <input type="checkbox" required />I agree to{" "}
              <a href="#">terms and services</a>
            </label>
            <button
              type="submit"
              className="submit-btn"
              onClick={this.postData}
              disabled={this.state.btnDisabled}
            >
              {this.state.btnDisabled ? "loading..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUsername: (val) => dispatch({ type: "SET", text: val }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);