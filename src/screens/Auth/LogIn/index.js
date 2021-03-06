import React from "react";
import "./style.scss";
import { Header, Loader } from "../../../components";
import { isAuthenticated } from "../../../helpers/api-user";
import { SERVER } from "../../../helpers/utils";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      btnDisabled: false,
      error: "none",
      errorText: "",
    };
    this.postData = this.postData.bind(this);
  }
  async postData(e) {
    e.preventDefault();
    this.setState({
      btnDisabled: true,
    });
    const userData = {
      username: this.state.username,
      password: this.state.password,
    };

    let res = await fetch(`${SERVER}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (res.status === 403) {
      this.setState({
        btnDisabled: false,
        error: "block",
        errorText: "Wrong username or password!",
      });
    }
    await res.json().then(async (res) => {
      localStorage.setItem("JWT_TOKEN", JSON.stringify(res));
      localStorage.setItem("username", this.state.username);
      isAuthenticated().then((res) => {
        localStorage.setItem("logged_in_user_id", res._id);
        window.location.pathname = "/";
      });
    });
  }
  render() {
    return (
      <div>
        <Header />
        <div className="form-container">
          <h1 className="title">Login</h1>
          <form>
            <label style={{ display: this.state.error }}>
              {this.state.errorText}
            </label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={(e) => {
                this.setState({ username: e.target.value });
              }}
              spellCheck="false"
              className="input-field"
              placeholder="Username"
            />{" "}
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
              placeholder="Password"
              className="input-field"
            />{" "}
            <button
              type="submit"
              onClick={this.postData}
              className="submit-btn"
            >
              {this.state.btnDisabled ? <Loader inverted={true} /> : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LogIn;
