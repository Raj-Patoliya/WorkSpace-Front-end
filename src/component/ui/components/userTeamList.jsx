import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Avatar } from "primereact/avatar";
import { AutoComplete } from "primereact/autocomplete";

export default function IssueTeamList({
  teams,
  placeholder,
  onSelected,
  name,
  width,
  defaultValue,
}) {
  const data = teams.map((data) => data.user);
  //   const [user, setuser] = useState([]);
  //   const [selecteduser, setselecteduser] = useState(null);
  //   const [filteredUser, setFilteredUser] = useState(null);
  //   useEffect(() => {
  //     const item = userList.map((userList) => ({
  //       label: `${userList.fullName}`,
  //       email: `${userList.email}`,
  //       value: userList.id,
  //       profile: userList.profile,
  //       id: userList.id,
  //     }));
  //     console.log({ item: item });
  //     setuser(item);
  //   }, [userList]);
  //   const searchItems = (event) => {
  //     let query = event.query;
  //     let _filteredUser = [];

  //     console.log(query);
  //     for (let i = 0; i < user.length; i++) {
  //       let item = user[i];
  //       if (
  //         item.label.toLowerCase().includes(query.toLowerCase()) ||
  //         item.email.toLowerCase().includes(query.toLowerCase())
  //       ) {
  //         _filteredUser.push(item);
  //       }
  //     }

  //     setFilteredUser(_filteredUser);
  //   };
  console.log();
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
      {/* <AutoComplete
        placeholder={placeholder}
        value={selecteduser}
        suggestions={filteredUser}
        completeMethod={searchItems}
        virtualScrollerOptions={{ itemSize: 38 }}
        width={width}
        field="label"
        dropdown
        onChange={(e) => {
          console.log(e.value);
          setselecteduser(e.value);
          onSelected(name, e.value.id);
        }}
      /> */}
    </>
  );
}
