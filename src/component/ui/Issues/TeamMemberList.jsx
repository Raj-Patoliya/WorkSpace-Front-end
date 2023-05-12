import { Avatar, AvatarGroup, Tooltip } from "@mui/material";
import React from "react";

const TeamMemberList = ({
  teams,
  profileFilter,
  setAddTeamMember,
  activeStates,
}) => {
  return (
    <AvatarGroup max={10} spacing="medium">
      {teams.map((data, index) => (
        <Tooltip key={data.user[0].id} title={data.user[0].fullName}>
          <img
            key={data.user[0].id}
            alt={data.user[0].profile}
            src={data.user[0].profile}
            onClick={() => profileFilter(index, data.user[0].id)}
            style={{ height: "45px", width: "45px" }}
            className={
              activeStates[index] ? "avatar-active" : "avatar-inactive"
            }
          />
        </Tooltip>
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
