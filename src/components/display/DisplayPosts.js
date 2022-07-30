import React from "react";
import { useQuery } from "@apollo/client";
import { EXPLORE_PUBLICATIONS } from "../../api/explore-publications";
import { Redirect } from "react-router-dom";
import moment from "moment";
import { useHistory } from "react-router";
import "./Display.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from "../ui/Card";
function DisplayPosts() {
  const ADD_REACTION = `
  mutation($request: ReactionRequest!) { 
   addReaction(request: $request)
 }
`;
  const history = useHistory();

  const { data, loading, error } = useQuery(EXPLORE_PUBLICATIONS, {
    variables: {
      request: {
        sortCriteria: "LATEST",
        publicationTypes: ["POST"],
        limit: 10,
        sources: ["Decode"],
      },
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  console.log(data);
  console.log(data.items);
  return (
    <div>
      <h1>Welcome to Decode</h1>
      <div className="mains">
        {data.explorePublications.items.map((data, index) => (
          <Card>
            <div key={index} className="first">
              <div className="second">
                <img
                  onClick={() =>
                    history.push(`/profile/${data.profile.handle}`)
                  }
                  width="80px"
                  height="80px"
                  src={data.metadata?.image}
                ></img>
                -
                <div>
                  <p>@{data.profile?.handle}</p>
                  <p>{data.metadata?.content}</p>
                  {data.metadata?.media[0]?.original.url && (
                    <video
                      controls="controls"
                      src={data.metadata?.media[0]?.original?.url}
                    ></video>
                  )}
                  <img src={data.metadata?.media?.url} alt="dddd"></img>
                </div>
              </div>

              <div>
                <h2>{data.profile?.name}</h2>
                <p>{moment(data.createdAt).fromNow()}</p>
              </div>
              <div className="icon">
                <FontAwesomeIcon icon="fa-solid fa-heart" />
                <FontAwesomeIcon icon="fa-solid fa-comment" />
                <FontAwesomeIcon icon="fa-solid fa-money-bill" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
export default DisplayPosts;
