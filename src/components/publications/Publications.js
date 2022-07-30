import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { EXPLORE_PUBLICATIONS } from "../../../src/GraphQl/explore-publications";

 import {Avatar}  from "../../../src/components/elements/Avatar";

export const Publications = () => {
  let navigate = useNavigate();
  const { data, loading, error } = useQuery(EXPLORE_PUBLICATIONS, {
    variables: {
      request: {
        sortCriteria: "LATEST",
        limit: 50,
      },
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
console.log(data.explorePublications)
  return (
    <div className="p-2 bg-slate-200	 ">
      <div
        className="  max-w-sm mx-auto  inset-x-0 top-10 bg-slate-100   
	 flex p-6 bg-white rounded-lg shadow-xl my-8"
      >
        <div className="flex-shrink-0">
          <img
            src="https://gateway.pinata.cloud/ipfs/Qmcku6T6ScZQBe9GDSR3XVFqpKqGmRbAKsU9Q3HLSf6sUp"
            alt=""
            className="h-25 w-20"
          />
        </div>
        <div class="ml-6 pt-1">
          <h4 class="text-xl text-gray-900">Mind Tales</h4>
          <p class="text-base text-gray-600">
            Welcome to our Blogging Platform
          </p>
        </div>
      </div>{" "}
      {data && (
        <>
          {data.explorePublications.items.map((item, index) => (
            <div
              key={index}
              className="flex border-slate-300 border-4 text-left rounded-sm p-1 my-4 align-top mx-4 my-2 md:mx-auto border max-w-md md:max-w-3xl	"
            >
              <div className="flex items-start px-4 py-6 w-full">
                <div
                  className="w-16 cursor-pointer"
                  onClick={() => navigate(`/profile/${item.profile.handle}`)}
                >
                  {/* <Avatar profile={item.profile} size={"w-12 h-12"} /> */}
                  <img src={item.profile.picture?.original.url}></img>
                </div>

                <div className="w-full px-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 -mt-1">
                      {item.profile.name}
                    </h2>
                    <small className="text-sm text-gray-700">
                      {item.createdAt}
                    </small>
                  </div>
                  <p>@{item.profile.handle}</p>

                  <p className="mt-3 text-gray-700 text-sm">
                    {item.metadata.content}
                  </p>

                  <div className="mt-4 flex items-center">
                    <div className="flex  text-gray-700 text-sm mr-8">
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                        />
                      </svg>
                      <span>{item.stats.totalAmountOfComments}</span>
                    </div>
                    <div className="flex text-gray-700 text-sm mr-3">
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span>{item.stats.totalAmountOfCollects}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
