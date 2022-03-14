import React from "react";
import "./loading.scss";

const Loading = () => {
  return (
    <header className="loading-header">
      <div className="logo">
        <div className="background"></div>
      </div>
      <div className="image">
        <div className="background"></div>
      </div>
      <div className="data-user">
        <div className="background">
          <div className="t-name"></div>
          <div className="b-name"></div>
        </div>
      </div>
    </header>
  );
};
export default Loading;
