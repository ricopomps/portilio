import placeholderImage from "@/assets/placeholderImage.png";
import { UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="p-4 shadow">
      <div className="m-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src={placeholderImage}
            alt="Portilio logo"
            width={40}
            height={40}
          />
          <span className="font-bold">Portilio</span>
        </Link>
        <Link href="/projects" className="flex items-center gap-1">
          <span className="font-bold">Projects</span>
        </Link>
        <div className="flex items-center gap-2">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: { avatarBox: { width: "2.5rem", height: "2.5rem" } },
            }}
          />
          <Link passHref href={"/projects/add-project"} className="w-full">
            <button className="btn btn-primary btn-block">
              <Plus size={20} className="mr-2" />
              Add project
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
