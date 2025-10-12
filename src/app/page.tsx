"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa6";
import { HiTrendingUp } from "react-icons/hi";
import { HiChevronDown } from "react-icons/hi";
import { FiCheckCircle } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative w-full overflow-hidden py-20 md:py-28 lg:py-32 flex justify-center items-center">

      {/* <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80 z-0" />       */}
      {/* <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:20px_20px] z-0" /> */}

      <div
        className="absolute top-20 left-[15%] w-16 h-16 rounded-lg 
          bg-neutral-200/20  
          border border-neutral-300/20 dark:border-neutral-600/30 
          shadow-sm rotate-12 animate-float-slow opacity-70 hidden md:block"/>
      <div
        className="absolute bottom-32 right-[15%] w-20 h-20 rounded-lg 
          bg-neutral-800/20 
          border border-neutral-900/10 dark:border-neutral-700/30  */}
          shadow-sm -rotate-6 animate-float opacity-70 hidden md:block"
          />
          
      <div className="absolute top-40 right-[20%] w-12 h-12 rounded-full bg-neutral-200/20 flex items-center justify-center animate-float-slow hidden md:block ">
        <FiCheckCircle className="w-6 h-6 text-gray-300" />
      </div>
      <div className="absolute bottom-40 left-[20%] w-12 h-12 rounded-full bg-neutral-200/20 flex items-center justify-center animate-float hidden md:block">
        <FaRegClock className="w-6 h-6 text-gray-300" />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <div className="flex flex-wrap justify-center gap-2">
            <div className="px-4 flex flex-row items-center text-sm bg-gray-300 rounded-lg text-black py-1">
              <FaRegStar className="mr-1 h-3.5 w-3.5" />
              <span>Intuitive Design</span>
            </div>
            <div className="px-4 flex flex-row items-center bg-gray-300 rounded-lg text-black py-1 text-sm">
              <HiTrendingUp className="mr-1 h-3.5 w-3.5" />
              <span>Boost Productivity</span>
            </div>
          </div>

          <div
            className={`space-y-4 max-w-3xl transition-all duration-1000 ease-out 
              // ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`
          }
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                Manage tasks
              </span>{" "}
              with clarity and ease
            </h1>
            <p className="text-xl text-muted-foreground md:text-2xl mx-auto max-w-2xl">
              Streamline your workflow, boost productivity, and never miss a
              deadline again with our intuitive task management solution.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 py-6">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-primary">98%</span>
              <span className="text-sm text-muted-foreground">
                Task Completion
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-primary">10k+</span>
              <span className="text-sm text-muted-foreground">
                Active Users
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-primary">30%</span>
              <span className="text-sm text-muted-foreground">Time Saved</span>
            </div>
          </div>

          <div
            className={`flex flex-col gap-3 min-[400px]:flex-row pt-4 transition-all duration-1000 delay-300 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            
              <div className="flex items-center gap-4">
            
            <Link
              href="/login"
              className="px-8 py-2.5 rounded-full font-semibold
                bg-gradient-to-r from-white via-gray-100 to-gray-200
                text-gray-900 shadow-md
                hover:from-gray-200 hover:to-white hover:shadow-lg
                transition-all duration-300 ease-out"
            >
              Get Started Free
            </Link>

            <Link
              href="/login"
              className="px-8 py-2.5 rounded-full font-semibold
                border border-gray-300 text-gray-200
                hover:bg-gradient-to-r hover:from-gray-900 hover:to-gray-800
                hover:text-white
                transition-all duration-300 ease-out"
            >
              Login
            </Link>
          </div>


          </div>

          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:flex flex-col items-center">
            <span className="text-sm text-gray-400 mb-1">
              Scroll to explore
            </span>
            <HiChevronDown className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
