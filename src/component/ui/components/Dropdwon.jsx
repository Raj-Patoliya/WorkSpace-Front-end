import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";

export default function DropdownTemplate({
  data,
  placeholder,
  optionLabel,
  onSelected,
  name,
  defaultValue,
}) {
  const [selecteduser, setSelecteduser] = useState(defaultValue);
  const selecteduserTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <img
            alt={option.name}
            src={option.icon}
            className={`mr-2 flax `}
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
          className={`text-xs mr-2 flax`}
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
        console.log(e.value);
        setSelecteduser(e.value);
        onSelected(name, e.value.id);
      }}
      options={data}
      optionLabel={optionLabel}
      valueTemplate={selecteduserTemplate}
      itemTemplate={userOptionTemplate}
      placeholder={placeholder}
      className="text-xs"
    />
  );
}
