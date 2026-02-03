"use client";
import React from "react";
import localFont from "next/font/local";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "./ui/tracing-beam";
import { workExperience } from "@/data";

const calsans = localFont({
  src: "../app/fonts/CalSans-SemiBold.woff",
});



export function Society() {
  return (
    <div id="experience">
      <h1 className="heading">
        My <span className="text-purple">Experience</span>
      </h1>
      <TracingBeam className="px-4">
        <div className="max-w-lg mx-auto antialiased pt-4 relative">
          {workExperience.map((item, index) => (
            <div
              key={`content-${index}`}
              className="mb-6 p-4 bg-[#0a0e29] rounded-lg border border-[#1c2a56] shadow-md"
            >
              {item.image && (
                <div className="flex justify-center mb-3">
                  <Image
                    src={item.image}
                    alt="society image"
                    height={128}
                    width={128}
                    className="rounded-md object-cover w-32 h-32"
                  />
                </div>
              )}

              <p className="text-sm text-gray-400 mb-1">{item.duration}</p>
              <p
                className={twMerge(
                  calsans.className,
                  "text-lg font-semibold  mb-2"
                )}
              >
                {item.title}
              </p>

              <div className="text-sm text-gray-300">{item.description}</div>
            </div>
          ))}
        </div>
      </TracingBeam>
    </div>
  );
}
