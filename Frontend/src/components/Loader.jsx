import { CircularProgress } from "@mui/material";
import React from "react";

export default function Loader({ styling }) {
  return (
    <div className={styling}>
      <CircularProgress style={{ color: "red" }} size={20} />
    </div>
  );
}
