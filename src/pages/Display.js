import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GET_PROFILES } from "../api/profile/get-profiles";
import { GET_PROFILES_URL } from "../api/post/get-publication";
import DisplayPosts from "../components/display/DisplayPosts";
function Display() {
  return (
    <div>
      <FontAwesomeIcon icon="check-square" />

      <DisplayPosts />
    </div>
  );
}

export default Display;
