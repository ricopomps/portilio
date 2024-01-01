import * as UsersApi from "@/network/api/user";
import { handleError } from "@/utils/utils";
import { User } from "@clerk/nextjs/server";
import { useEffect, useState } from "react";

interface UserSearchProps {
  username: string;
}

export default function UserSearch({ username }: UserSearchProps) {
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    async function loadInitialUsers() {
      setUsers(undefined);

      try {
        const usersResponse = await UsersApi.searchUsers(username);
        setUsers(usersResponse);
      } catch (error) {
        handleError(error);
      }
    }
    loadInitialUsers();
  }, [username]);

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {users &&
          users.map((user) => (
            <div key={user.id}>USERNAME = {user.username}</div>
          ))}
      </div>
    </div>
  );
}
