import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";

export default function DropdownTemplate({
  data,
  placeholder,
  optionLabel,
  onSelected,
  name,
}) {
  const [selecteduser, setSelecteduser] = useState(null);
  const selecteduserTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <img
            alt={option.name}
            src={option.icon}
            className={`mr-2 flag}`}
            style={{ width: "18px" }}
          />
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const userOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <img
          alt={option.name}
          src={option.icon}
          className={`mr-2 flag}`}
          style={{ width: "18px" }}
        />
        <div>{option.name}</div>
      </div>
    );
  };

  return (
    <Dropdown
      value={selecteduser}
      onChange={(e) => {
        setSelecteduser(e.value);
        onSelected(name, e.value.id);
      }}
      options={data}
      optionLabel={optionLabel}
      placeholder={placeholder}
      valueTemplate={selecteduserTemplate}
      itemTemplate={userOptionTemplate}
      className="w-7"
    />
  );
}
