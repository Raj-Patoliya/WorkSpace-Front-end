import React, { useState } from "react";
import { MultiSelect } from "primereact/multiselect";

export default function MultiSelectDropdown({ data }) {
  const [selectedItems, setSelectedItems] = useState(null);
  const itemTemplate = (option) => {
    return (
      <div className="flex align-items-center h-1rem text-xs">
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

  const panelFooterTemplate = () => {
    const length = selectedItems ? selectedItems.length : 0;

    return (
      <div className="py-2 px-3">
        <b>{length}</b> item{length > 1 ? "s" : ""} selected.
      </div>
    );
  };

  return (
    <div className="flex justify-content-center">
      <MultiSelect
        value={selectedItems}
        options={data}
        onChange={(e) => setSelectedItems(e.value)}
        optionLabel="name"
        placeholder="Type"
        itemTemplate={itemTemplate}
        panelFooterTemplate={panelFooterTemplate}
        className="h-2.1rem text-xs m-1"
        size={"small"}
        display="chip"
      />
    </div>
  );
}
