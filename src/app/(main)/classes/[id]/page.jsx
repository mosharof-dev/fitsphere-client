import { getClassesId } from "@/lib/api/classes";
import React from "react";
import Link from "next/link";
import ClassHeader from "@/components/classes/ClassHeader";
import ClassContent from "@/components/classes/ClassContent";
import ClassSidebar from "@/components/classes/ClassSidebar";

const ClassDetailsPage = async ({ params }) => {
  const { id } = await params;
  const singleClass = await getClassesId(id);

  if (!singleClass) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <div className="bg-[#0f172a] border border-white/10 p-8 rounded-2xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Class not found
          </h2>
          <Link
            href="/classes"
            className="inline-block px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all"
          >
            Back to Classes
          </Link>
        </div>
      </div>
    );
  }

  // Dummy data for a more "pro" feel
  const whatYouWillLearn = [
    "Master correct form and technique to prevent injuries",
    "Build significant cardiovascular endurance and stamina",
    "Increase overall muscle tone and core strength",
    "Learn scalable exercises you can do anywhere",
  ];

  const requirements = [
    "Comfortable workout clothes and clean indoor shoes",
    "Water bottle and a small sweat towel",
    "No prior experience required – scalable for all levels",
  ];

  return (
    <div className=" bg-[#020617] text-white relative overflow-hidden pb-20">
      {/* Background glow effects matching home page */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#06B6D4] opacity-10 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#3B82F6] opacity-10 blur-[150px] rounded-full mix-blend-screen"></div>
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 py-10 relative z-10 ">
        <ClassHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <ClassContent
            singleClass={singleClass}
            whatYouWillLearn={whatYouWillLearn}
            requirements={requirements}
          />

          <ClassSidebar singleClass={singleClass} />
        </div>
      </div>
    </div>
  );
};

export default ClassDetailsPage;
