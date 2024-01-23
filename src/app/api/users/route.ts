import { searchUserSchema } from "@/lib/validation/project";
import { clerkClient } from "@clerk/nextjs/server";
import url from "url";

export async function GET(req: Request) {
  try {
    const parsedUrl = url.parse(req.url, true);
    const parseResult = searchUserSchema.safeParse(parsedUrl.query);
    if (!parseResult.success) {
      console.error("Invalid input", parseResult.error);

      return Response.json({ error: `Invalid input` }, { status: 400 });
    }

    const { username } = parseResult.data;

    const searchedUsers = await clerkClient.users.getUserList({
      query: username,
    });

    return Response.json(searchedUsers, { status: 200 });
  } catch (error) {
    console.error("Error  searching users:", error);

    return Response.json({ error: `Error searching users` }, { status: 500 });
  }
}
