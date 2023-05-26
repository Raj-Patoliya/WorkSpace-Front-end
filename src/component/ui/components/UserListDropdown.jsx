import React, { useEffect, useState } from "react";
import { AutoComplete } from "primereact/autocomplete";

export default function UserList({
  userList,
  placeholder,
  onSelected,
  name,
  width,
  haserror,
}) {
  const [user, setuser] = useState([]);
  const [selecteduser, setselecteduser] = useState(null);
  const [filteredUser, setFilteredUser] = useState(null);
  useEffect(() => {
    if (userList.length > 0) {
      const item = userList.map((userList) => ({
        label: `${userList.user.fullName}`,
        value: userList.user.id,
        profile: userList.user.profile,
        id: userList.user.id,
      }));
      console.log({ item: item });
      setuser(item);
    }
  }, [userList]);
  const searchItems = (event) => {
    let query = event.query;
    let _filteredUser = [];

    console.log(query);
    for (let i = 0; i < user.length; i++) {
      let item = user[i];
      if (item.label.toLowerCase().includes(query.toLowerCase())) {
        _filteredUser.push(item);
      }
    }

    setFilteredUser(_filteredUser);
  };

  return (
    <>
      <AutoComplete
        className={haserror}
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
      />
    </>
  );
}
