import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PUBLICATIONS } from "../../../src/GraphQl/publications/get-pub";
export function Publications({currentUser}) {

  const { data, loading, error } = useQuery(GET_PUBLICATIONS, {
    variables: {
      request: {
        profileId: currentUser.id,
        publicationTypes: ["POST"],

        limit: 50,
      },
    },
  });
   if (loading) return <div>Loading...</div>;
   if (error) return <div>Error!</div>;
  console.log(data?.publications,currentUser.id);
  return (
    <div>
      <h1 className="text-xl font-bold text-center">20 Latest Publications</h1>
      {data && (
        <>
          {data.publications.items.map((item, index) => (
            <div
              key={index}
              className="flex bg-white shadow-lg rounded-lg mx-4 my-2 md:mx-auto border max-w-md md:max-w-2xl "
            >
              <div className="flex items-start px-4 py-6 w-full">
                {/* <div
                  className="w-16 cursor-pointer"
                  onClick={() => navigate(`/profile/${item.profile.handle}`)}
                >
                  <Avatar profile={item.profile} size={"w-12 h-12"} />
                </div> */}

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

                 
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
