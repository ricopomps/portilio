import Pagination from "@/components/Paginations";
import UserListItem from "@/components/UserListItem";
import * as UsersApi from "@/network/api/user";
import { handleError } from "@/utils/utils";
import { User } from "@clerk/nextjs/server";
import Link from "next/link";
import { useEffect, useState } from "react";

interface UserSearchProps {
  searchParams: {
    search?: string;
    page: number;
  };
}

export default function UserSearch({
  searchParams: { search: username, page },
}: UserSearchProps) {
  const [users, setUsers] = useState<User[]>();
  const userPerPage = 8;

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
      <div className="mb-3 grid gap-3 sm:grid-cols-1 md:grid-cols-2 ">
        {users &&
          users.map((user) => (
            <Link key={user.id} href={`/users/${user.username}`}>
              <UserListItem user={user} />
            </Link>
          ))}
      </div>
      {users && users.length > 0 && (
        <Pagination
          currentPage={page}
          searchParams={
            new URLSearchParams({
              ...(username && { search: username }),
              ...(page && { page: page.toString() }),
            })
          }
          totalPages={Math.ceil(users.length / userPerPage)}
          baseUrl="search"
        />
      )}
    </div>
  );
}
