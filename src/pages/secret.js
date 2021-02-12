import React, { useState, useEffect } from "react";
import { Body, Header2, Header3, Header4 } from "../global_styles/typography";

const Secret = () => {
  // fetch juicy user data
  const onMount = async () => {
    console.log("fetching juicy data");
  };

  useEffect(() => {
    onMount();
  }, []);
  return (
    <div style={{ width: "100vh", height: "100vw" }} className="p-4">
      <Header2>Analytics</Header2>
      <Body>Hello</Body>
    </div>
  );
};

export default Secret;
