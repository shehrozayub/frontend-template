import React from "react";
import { TextUIConstants } from "../services/constants/constantsService";

export default function NotFound() {
  return <h2>{TextUIConstants.PageTitles["404"]}</h2>;
}
