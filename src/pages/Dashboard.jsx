import React from "react";
import Navbar from "../components/common/Navbar";

export default function Dashboard({ Page }) {
  return (
    <>
      <Navbar />
      <Page />
    </>
  );
}
