export const dynamic = "force-dynamic";
import Image from "next/image";
import { onBoardUser } from "@/modules/auth/actions/index"
import { Navbar } from "@/components/ui/resizable-navbar";
import { NavbarHome } from "@/modules/home/components/Navbar";
import { Highlighter } from "@/components/ui/highlighter";
import { Button } from "@/components/ui/button";
import { ChevronRight, Code2, Play, Trophy, Users, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { navigate } from "next/dist/client/components/segment-cache/navigation";
import Link from "next/link";

export default async function Home() {

  const features = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Interactive Coding",
      description:
        "Practice with real-world coding challenges and get instant feedback on your solutions.",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Track Progress",
      description:
        "Monitor your improvement with detailed analytics and achievement systems.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Global Community",
      description:
        "Learn from thousands of developers worldwide and share your knowledge.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Feedback",
      description:
        "Get instant feedback on your solutions with detailed explanations.",
    },
  ];

  const stats = [
    { number: "50+", label: "Problems Solved" },
    { number: "5+", label: "Programming Languages" },
    { number: "99%", label: "Success Rate" },
  ];

  await onBoardUser();

  return (
    <div className="mt-160">
      <div className=" flex flex-col justify-center items-center mt-20 ">
        <div className="text-2xl text-center md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white ">
          <h1 className="text-center ">
            Master {" "}
            <Highlighter action="underline" color="#1d73e5"><span className="dark:text-white text-gray-900">Problem</span></Highlighter>
            {" "} Solving <br />
          </h1>
        </div>
        <span className="text-2xl text-center md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-tight mb-8 mt-3 ">

          With{" "}

          <Highlighter action="highlight" color="#1d73e5"><span className="text-white">Code</span></Highlighter>

        </span>

        <p className="font-normal text-center md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          Challenge yourself with thousands of coding problems, compete with
          developers worldwide, and accelerate your programming journey with
          real-time feedback and expert solutions.
        </p>


        <div className="gap-4 mb-15">
          <Button variant={"default"} color="#1d73e5" className="mr-4 w-[250px] bg-[#1d73e5] text-neutral-200 " > <Play className="mb-0.5" /> <span className="mb-1">Start Coding Now</span> <ChevronRight className="mb-0.5" /> </Button>

          <Link href="/problems">
            <Button variant={"secondary"} color="#1d73e5" className="hover:border-2 border-[#1d73e5] transition-all duration-100 " >Browse Problems</Button>
          </Link>
        </div>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>


        <div className="mt-20 mb-20 " >
          <h1
            className="text-5xl font-bold mb-6"
          >Everything you need to <span className="text-[#1d73e5]">excel</span> </h1>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our platform provides comprehensive tools and resources to help
            you become a better programmer
          </p>

        </div>

        <div className="grid max-w-5xl md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-200 border-gray-200 dark:border-gray-700"
            >
              <CardHeader>
                <div
                  className={`w-12 h-12 ${index % 2 === 0
                      ? "bg-amber-100 dark:bg-amber-900"
                      : "bg-indigo-100 dark:bg-indigo-900"
                    } rounded-xl flex items-center justify-center ${index % 2 === 0
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-indigo-600 dark:text-indigo-400"
                    } mb-4`}
                >
                  {feature.icon}
                </div>
                <CardTitle className="text-gray-900 dark:text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}
