import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Avatar } from "primereact/avatar";

export default function IssueTeamList({
  teams,
  placeholder,
  onSelected,
  name,
  width,
  defaultValue,
}) {
  const data = teams.map((data) => data.user);
  const [selecteduser, setSelecteduser] = useState(defaultValue[0]);
  const selectedUserTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <Avatar
            image={option.profile}
            className="mr-2"
            size="medium"
            shape="circle"
          />
          <div>{option.fullName}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const UserOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <Avatar
          image={option.profile}
          className="mr-2"
          size="large"
          shape="circle"
        />
        <div>{option.fullName}</div>
      </div>
    );
  };

  return (
    <>
      <Dropdown
        value={selecteduser}
        onChange={(e) => {
          setSelecteduser(e.value);
          onSelected(name, e.value.id);
        }}
        options={data}
        optionLabel="name"
        placeholder={placeholder}
        valueTemplate={selectedUserTemplate}
        itemTemplate={UserOptionTemplate}
        className={"w-15rem"}
      />
    </>
  );
}
