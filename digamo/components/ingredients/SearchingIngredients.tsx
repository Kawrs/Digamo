"use client";

import { main } from "framer-motion/client";
import { SetStateAction, useState } from "react";
// import SearchIcon from "@mui/icons-material/Search";\

type SearchingIngredientsProps = {
  onChoose: (value: string) => void;
};

export default function SearchingIngredients({
  onChoose,
}: SearchingIngredientsProps) {
  const [query, setQuery] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setQuery(event.target.value);
  };

  const handleCheckboxChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="flex gap-4 flex-col w-full">
      {/* searchbar ni dri */}
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        className="px-9 py-3 border-gold w-full rounded-lg dark:text-white border-2 focus:outline-none text-gray-90"
      />

      {/* ang ubos kay sa lista with title and checkbox */}
      <h1>Label &#40;0/1&#41; </h1>
      <div className="py-3 px-9 bg-white dark:bg-black border-2 border-gold rounded-sm dark:text-gray-900 flex flex-row gap-4 justify-between items-center">
        <div className="flex-row flex gap-4 items-center">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="cursor-pointer"
          />
          {/* name of ingredient */}
          <div className="flex flex-col gap-2 dark:text-white">
            <label className="flex flex-row gap-2 ">itemName</label>
            {/* quantity */}
            <p>quantity</p>
          </div>
        </div>

        {/* expiration date */}
        <p className="dark:text-white">Expiration date</p>
        {/* status, mausab pani ang colors each stats */}
        <div className="px-2 py-1 bg-red/60 text-red rounded-full">Status</div>
      </div>

      {/* buttons ang ubos for confirm and cancel */}
      <div className="right-0 px-9 flex flex-row gap-4 justify-end">
        <button
          className="text-orange border-2 border-gold px-3 rounded-sm cursor-pointer hover:text-orange/80"
          onClick={() => onChoose("cancel")}
        >
          Cancel
        </button>
        <button className=" bg-gold px-3 rounded-sm text-white cursor-pointer hover:bg-gold/80">
          Confirm
        </button>
      </div>
    </div>
  );
}
