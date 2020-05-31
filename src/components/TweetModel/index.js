import React, { useState, useEffect } from "react";
import "./style.scss";

function TweetModel(props) {
  // Component State
  let [visible, setVisibilty] = useState(props.visible);

  useEffect(() => {
    console.log("props changed");
    setVisibilty(props.visible);
  }, [props.visible]);

  return (
    <div
      className="model"
      style={visible ? { transform: "scale(1)" } : { transform: "scale(0)" }}
    >
      <div className="model-header">
        <button className="model-btn-close" onClick={() => setVisibilty(false)}>
          <i className="far fa-window-close"></i>
        </button>
      </div>
      <div className="model-body">
        <div className="profile-pic"></div>
        <div className="modal-input-container">
          <textarea
            rows={10}
            className="modal-input"
            placeholder="Type here..."
          />
          <div className="model-footer">
            <div className="options">
              <div className="group-icons">
                <button className="btn-icon">
                  <i className="far fa-image"></i>
                </button>
                <button className="btn-icon">
                  <i className="fa fa-poll"></i>
                </button>
                <button className="btn-icon">
                  <i className="far fa-smile"></i>
                </button>
              </div>
              <button className="tweet-btn">Tweet</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TweetModel;
