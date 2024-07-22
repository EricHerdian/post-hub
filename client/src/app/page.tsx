import Link from "next/link";

export default function Home() {
  return (
    <main className="pt-14 sm:pt-[75px]">
      <div>Welcome to Post-Hub</div>
      <Link href="/login">Sign In</Link>
    </main>
  );
}
