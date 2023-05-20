import React, { useEffect, useState } from "react";
import { MultiSelect } from "primereact/multiselect";

export default function MultiSelectDropdown({
  data,
  typeSortHandler,
  setTypeSortClear,
}) {
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    if (selectedItems.length > 0) {
      console.log(selectedItems.length);
    }
  }, [setTypeSortClear, selectedItems]);
  const itemTemplate = (option) => {
    return (
      <div className="flex align-items-center text-xs">
        <img
          alt={option.name}
          src={option.icon}
          className={`mr-2 flag flag-${option.icon.toLowerCase()} `}
          style={{ width: "18px" }}
        />
        <div>{option.name}</div>
      </div>
    );
  };

  return (
    <div className="flex justify-content-center">
      <MultiSelect
        value={selectedItems}
        options={data}
        onChange={(e) => {
          setSelectedItems(e.value);
          typeSortHandler(e.value);
          if (e.value.length > 0) {
            setTypeSortClear(true);
          } else {
            setTypeSortClear(false);
          }
        }}
        optionLabel="name"
        placeholder="Type"
        itemTemplate={itemTemplate}
        showHeader={false}
        className="h-2.1rem text-xs m-1"
        size={"small"}
        display="chip"
      />
    </div>
  );
}
