import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  console.log(session)
  if (session && session.user) {
    redirect("/app");
  } else {
    redirect("/auth/login");
  }
}
