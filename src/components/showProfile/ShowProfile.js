import React from "react";
import moment from "moment";
import "./showProfile.css";
import Follow from "./Follow";
function showProfile({ currentUser, publication }) {
  return (
    <div className="bg">
      <div className="profile">
        <div className="profile-banner">
          <img
            src={currentUser.coverPicture?.original?.url}
            height="300px"
          ></img>
        </div>
        <div className="profile-picture">
          <div className="follow">
            <Follow currentUser={currentUser} />
          </div>

          <img
            src={currentUser.picture?.original?.url}
            width="100px"
            height="100px"
          ></img>
          <p>{currentUser.name}</p>

          <p>{currentUser.bio}</p>
        </div>

        <div className="profile-content">
          <div className="content-left">
            <ul>
              <li>
                <span className="entypo-lock-open"></span>User Handle:{" "}
                {currentUser.handle}
              </li>
              <li>
                <span className="entypo-compass"></span>Followers:{" "}
                {currentUser.stats.totalFollowers}
              </li>
              <li>
                <span className="entypo-graduation-cap "></span>Following:{" "}
                {currentUser.stats.totalFollowing}{" "}
              </li>
              <li>
                <span className="entypo-suitcase"></span>Posts:{" "}
                {currentUser.stats.totalPosts}
              </li>
            </ul>
          </div>

          <div className="content-middle">
            <div className="content-md-left">
              <img
                src={currentUser.picture?.original?.url}
                width="100px"
                height="100px"
              ></img>{" "}
            </div>

            <div className="content-md-middle">
              <div className="post-title-name">
                <p>{currentUser.name}</p>
                <br />
              </div>

              <div className="post-title-time">
                <p>{moment(publication.createdAt).fromNow()}</p>;
              </div>

              <div className="post-desc">
                {publication.metadata.content}
                <br />
                <a href={publication.metadata.description}>Project link</a>
                <img src={publication.metadata.image}></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default showProfile;
