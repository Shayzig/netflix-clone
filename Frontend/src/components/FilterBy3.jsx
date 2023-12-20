import React from "react";
import { useForm } from "../customHooks/useForm";

export default function FilterBy({ filterBy, onChangeFilter }) {
  const [register] = useForm(filterBy, onChangeFilter);

  return (
    <div className="filter-by-wrapper">
      <input type="text" {...register("city")} />
    </div>
  );
}
