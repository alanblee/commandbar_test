import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import { Home, CreatePost, Facts } from "./pages";
import { logo } from "./assets";
import { handleClick } from "./commandBar";
import useCommandBar from "./commandBar";
const App = () => {
  useCommandBar();
  return (
    <div>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        <button
          type="button"
          onClick={handleClick}
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
        >
          Click!
        </button>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/facts" element={<Facts />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
