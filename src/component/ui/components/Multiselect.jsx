import React, { useState } from "react";
import { MultiSelect } from "primereact/multiselect";

export default function MultiSelectDropdown({ data, typeSortHandler }) {
  const [selectedItems, setSelectedItems] = useState(null);
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
        }}
        optionLabel="name"
        placeholder="Type"
        itemTemplate={itemTemplate}
        showHeader={false}
        // panelFooterTemplate={panelFooterTemplate}
        className="h-2.1rem text-xs m-1"
        size={"small"}
        display="chip"
      />
    </div>
  );
}
