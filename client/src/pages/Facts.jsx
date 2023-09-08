import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";

const Facts = () => {
  const location = useLocation();

  const renderFacts = () => {
    if (location.state == null) {
      return (
        <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
          Nothing to see here
        </p>
      );
    }
    return location.state.map(({ fact }, indx) => {
      return (
        <Fragment key={indx}>
          <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">{fact}</p>
        </Fragment>
      );
    });
  };
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Cat Fact</h1>
        {renderFacts()}
      </div>
    </section>
  );
};

export default Facts;
