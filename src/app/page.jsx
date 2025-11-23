import RecentList from "@/components/RecentList";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" bg-zinc-50 font-sans dark:bg-black">
      <RecentList></RecentList>
    </div>
  );
}
