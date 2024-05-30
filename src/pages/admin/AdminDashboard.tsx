import React from "react";
import { TextUIConstants } from "../../services/constants/constantsService";

export default function AdminDashboard() {
  return (
    <div className="box-column center-align container">
      <p>{TextUIConstants.PageTitles.AdminDashboard}</p>
    </div>
  );
}
