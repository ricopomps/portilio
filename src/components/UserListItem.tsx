import companyLogoPlaceholder from "@/assets/placeholderImage.png";
import { User } from "@clerk/nextjs/server";
import Image from "next/image";

interface UserListItemProps {
  user: User;
}

export default function UserListItem({
  user: { username, imageUrl },
}: UserListItemProps) {
  return (
    <article className="flex gap-3 rounded-lg border p-5 hover:bg-primary hover:text-black">
      <Image
        src={imageUrl || companyLogoPlaceholder}
        alt={`${username} profile pic`}
        width={100}
        height={100}
        className="self-center rounded-lg"
      />
      <div className="flex items-center justify-center space-y-3">
        <div>
          <h1 className="text-xl font-medium">{username}</h1>
        </div>
      </div>
    </article>
  );
}
