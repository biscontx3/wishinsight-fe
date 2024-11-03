"use client";
import ProfileDashboard from "../../components/Profile/Dashboard";
import ProfileSideBar from "./ProfileSidebar";

const Page = () => {
  return (
    <main className="flex min-h-screen  items-start justify-between mt-20">
      <ProfileSideBar />
      <ProfileDashboard />
    </main>
  );
};

export default Page;
