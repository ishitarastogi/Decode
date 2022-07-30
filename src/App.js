import React, { useState } from "react";
import { Route, Routes, Outlet, useNavigate } from "react-router-dom";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { LensLogin } from "./components/lens/index";
import { LandingPage, ProfilePage, PostPage } from "../src/pages/index";
import { ENV_PROD, ENV_DEV } from "./constants";

function App() {

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<LandingPage  />} />
        <Route path="/profile/:handle" element={<ProfilePage />} />
        <Route path="/post" element={<PostPage  />} />
      </Route>
    </Routes>
  );
}

export default App;

const AppLayout = () => {
  const navagate = useNavigate();
  return (
    <div className="h-screen flex flex-col">
      <header className="flex justify-between p-4 bg-slate-500	">
        <ConnectButton />

        <LensLogin />
        
      </header>
      <main className="flex-grow overflow-y-auto">
        <Outlet />
      </main>
      <footer className="text-center h-20 text-md text-stone-100">
        <div className="flex shadow-lg rounded-lg mx-4 md:mx-auto border-2 max-w-md md:max-w-2xl ">
          <button
            onClick={() => navagate("/")}
            className="w-full border-2 p-1 rounded text-gray-700 uppercase font-semibold text-lg hover:bg-gray-200"
          >
            home
          </button>
          <button
            onClick={() => navagate("/post")}
            className="w-full border-2 p-1 rounded text-gray-700 uppercase font-semibold text-lg hover:bg-gray-200"
          >
            post
          </button>
        </div>
      </footer>
    </div>
  );
};
