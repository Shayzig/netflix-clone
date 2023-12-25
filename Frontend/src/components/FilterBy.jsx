import React, { useRef } from "react";
import { useForm } from "../customHooks/useForm";
import { IoIosSearch } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";

export default function FilterBy({ filterBy, onChangeFilter }) {
  const [register] = useForm(filterBy, onChangeFilter);
  const inputRef = useRef();

  const handleDelete = () => {
    onChangeFilter({ movie: "" });
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffectUpdate(() => {
    if (inputRef.current) {
      inputRef.current.value = filterBy.movie;
    }
  }, [filterBy]);

  return (
    <div className="filter">
      <span className="btn search">
        <IoIosSearch />
      </span>
      <span className="btn delete">
        <TiDeleteOutline onClick={handleDelete} />
      </span>
      <input ref={inputRef} type="text" {...register("movie")} />
    </div>
  );
}
