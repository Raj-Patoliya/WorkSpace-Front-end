import { Avatar, AvatarGroup, Tooltip } from "@mui/material";
import React, { useRef } from "react";
import { ContextMenu } from "primereact/contextmenu";
const TeamMemberList = ({
  teams,
  profileFilter,
  setAddTeamMember,
  activeStates,
}) => {
  const cm = useRef(null);
  const items = [
    { label: "View", icon: "pi pi-fw pi-search" },
    { label: "Delete", icon: "pi pi-fw pi-trash" },
  ];
  return (
    <AvatarGroup max={10} spacing="medium">
      {teams.map((data, index) => (
        <div key={data.user.id}>
          <ContextMenu model={items} ref={cm} breakpoint="767px" />
          <Tooltip key={data.user.id} title={data.user.fullName}>
            <img
              key={data.user.id}
              alt={data.user.profile}
              src={data.user.profile}
              onClick={() => profileFilter(index, data.user.id)}
              onContextMenu={(e) => {
                e.preventDefault();
                cm.current.show(e);
              }}
              style={{ height: "45px", width: "45px" }}
              className={
                activeStates[index] ? "avatar-active" : "avatar-inactive"
              }
            />
          </Tooltip>
        </div>
      ))}
      <Tooltip title={"Add New Member"}>
        <Avatar
          src="https://cdn.create.vista.com/api/media/small/237384104/stock-vector-add-user-vector-icon-sign"
          shape="circle"
          size="large"
          onClick={() => setAddTeamMember((prevState) => !prevState)}
        />
      </Tooltip>
    </AvatarGroup>
  );
};

export default TeamMemberList;
