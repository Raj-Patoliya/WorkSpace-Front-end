import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";

export default function DropdownTemplate({ data, placeholder, optionLabel }) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const countries = [
    { name: "Australia", code: "AU" },
    { name: "Brazil", code: "BR" },
    { name: "China", code: "CN" },
    { name: "Egypt", code: "EG" },
    { name: "France", code: "FR" },
    { name: "Germany", code: "DE" },
    { name: "India", code: "IN" },
    { name: "Japan", code: "JP" },
    { name: "Spain", code: "ES" },
    { name: "United States", code: "US" },
  ];

  const selectedCountryTemplate = (option, props) => {
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

  const countryOptionTemplate = (option) => {
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
      value={selectedCountry}
      onChange={(e) => setSelectedCountry(e.value)}
      options={data}
      optionLabel={optionLabel}
      placeholder={placeholder}
      valueTemplate={selectedCountryTemplate}
      itemTemplate={countryOptionTemplate}
      className="w-7"
    />
  );
}
