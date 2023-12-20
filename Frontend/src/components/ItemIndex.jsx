import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import FilterBy from "../cmps/FilterBy";

export function ItemIndex() {
  const [filterBy, setFilterBy] = useState({ city: "" });
  const debouncedFilterBy = useDebounce(filterBy, 3000);

  function onChangeFilter(filterBy) {
    setFilterBy(filterBy);
  }

  useEffect(() => {
    console.log("Sent Debounce Request with:", debouncedFilterBy);
  }, [debouncedFilterBy]);

  return (
    <section className="item-index">
      <FilterBy filterBy={filterBy} onChangeFilter={onChangeFilter} />
    </section>
  );
}
