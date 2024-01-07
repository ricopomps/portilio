import UserListItem from "@/components/UserListItem";
import * as UsersApi from "@/network/api/user";
import { handleError } from "@/utils/utils";
import { User } from "@clerk/nextjs/server";
import Link from "next/link";
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
      <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 ">
        {users &&
          users.map((user) => (
            <Link key={user.id} href={`/users/${user.username}`}>
              <UserListItem user={user} />
            </Link>
          ))}
      </div>
    </div>
  );
}
