import { SelectChangeEvent } from "@mui/material";
import React from "react";
import { ConnectedProps } from "react-redux";
import Api from "src/api";
import UserMgmtComponent from "src/components/user-mgmt";
import UserConnector from "src/store/user/connector";
import { GetUsersResponse, UserRole } from "src/store/user/types";

interface Props extends ConnectedProps<typeof UserConnector> {}

export type UpdateRoleParams = {
  id: number;
  username: string;
  originalValue: string;
};

function UserMgmtContainer({ getUserList, users, addUpdate }: Props) {
  const [resUsers, setResUsers] = React.useState<GetUsersResponse>();

  React.useEffect(() => {
    if (users) {
      setResUsers(users);
    }
  }, [users]);
  React.useEffect(() => {
    getUserList(null);
  }, [getUserList]);

  const updateRole = React.useCallback(
    (e: SelectChangeEvent<UserRole>, updateInfo: UpdateRoleParams) => {
      const newUsers = resUsers!.users.map((user) =>
        user.id === updateInfo.id
          ? {
              ...user,
              role: e.target.value as UserRole,
            }
          : user
      );
      setResUsers(
        resUsers && {
          ...resUsers,
          users: newUsers,
        }
      );

      addUpdate({
        type: "PATCH",
        target: "사용자 역할",
        description: `${updateInfo.username}님의 역할을 ${updateInfo.originalValue} 에서 ${e.target.value}(으)로 수정합니다.`,
        action: {
          requestInfo: {
            id: updateInfo.id,
            body: {
              role: e.target.value,
            },
          },
          api: Api["UserAPI"].patchUsers,
        },
      });
    },
    [addUpdate, resUsers]
  );

  return <UserMgmtComponent resUsers={resUsers} updateRole={updateRole} />;
}

export default UserConnector(UserMgmtContainer);
