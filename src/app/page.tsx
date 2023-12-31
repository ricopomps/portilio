import placeholderImage from "@/assets/placeholderImage.png";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-5">
      <div className="flex items-center gap-4">
        <Image
          src={placeholderImage}
          alt="Portilio logo"
          width={100}
          height={100}
        />
        <span className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Portilio
        </span>
      </div>
      <p className="max-w-prose text-center">Navigate though portfolios</p>
      <Link passHref href={"/projects"} className="w-full">
        <button className="btn btn-primary btn-block">View projects</button>
      </Link>
    </main>
  );
}
