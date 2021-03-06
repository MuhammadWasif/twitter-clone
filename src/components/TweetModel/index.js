import React, { useState, useEffect } from "react";
import { postReply } from "../../helpers/api-tweet";
import { Loader } from "../../components";
import notify from "../Notify";
import "./style.scss";

function TweetModel(props) {
  // Component State
  let [visible, setVisibilty] = useState(props.visible);
  let [text, setText] = useState("");
  let [loading, setLoading] = useState(false);

  // props variables
  let { orgTweetID } = props;

  useEffect(() => {
    setVisibilty(props.visible);
  }, [props.visible]);

  return (
    <div
      className="modal-background"
      style={visible ? { transform: "scale(1)" } : { transform: "scale(0)" }}
    >
      <div
        className="modal-tweet"
        style={visible ? { transform: "scale(1)" } : { transform: "scale(0)" }}
      >
        <div className="modal-tweet-header">
          <button className="modal-tweet-btn-close" onClick={props.onClose}>
            <i className="fa fa-times"></i>
          </button>
        </div>
        <div className="modal-tweet-body">
          <div>
            <div
              className="profile-pic"
              style={{ backgroundImage: `url("${props.image}")` }}
            ></div>
          </div>
          <div className="modal-tweet-input-container">
            <textarea
              rows={10}
              className="modal-tweet-input"
              placeholder="Tweet your reply..."
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <div className="modal-footer">
              <div className="options">
                <div className="group-icons">
                  <button className="btn-icon">
                    <i className="far fa-smile"></i>
                  </button>
                </div>
                <button
                  className="tweet-btn"
                  onClick={() => {
                    setLoading(true);
                    postReply(text, orgTweetID).then((e) => {
                      setLoading(false);
                      setText("");
                      notify("Reply posted successfully..!  ");
                    });
                  }}
                >
                  {loading ? <Loader inverted={true} /> : "Reply"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TweetModel;
