import React, { useState } from "react";
import { Loader, Card, FormField } from "../components";

import usePosts from "../hooks/usePosts";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => {
      return <Card key={post._id} {...post} />;
    });
  }
  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const { loading, allPosts } = usePosts();

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    const { value } = e.target;
    setSearchText(value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter((post) => {
          return (
            post.name.toLowerCase().includes(searchText.toLowerCase()) ||
            post.prompt.toLowerCase().includes(searchText.toLowerCase())
          );
        });
        setSearchResults(searchResults);
      }, 500)
    );
  };
  return (
    <section className="max-w-7x1 mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          The Community Showcase
        </h1>
        <p className="mt=2 text-[#666e75] text-[16px] max-w[500px]">
          Browse through a collection of imaginative and visually stunning
          images generated by DALL-E AI
        </p>
      </div>
      <div className="mt-16">
        <FormField
          label="Search Post"
          type="text"
          name="text"
          placeholder="Search posts"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing results{" "}
                <span className="text-[#222328]"> {searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchResults}
                  title="No search results found"
                />
              ) : (
                <RenderCards data={allPosts} title="No posts found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
