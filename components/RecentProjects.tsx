"use client";

import { FaLocationArrow } from "react-icons/fa6";
import Image from "next/image";
import { projects } from "@/data";
import dynamic from "next/dynamic";
// import { PinContainer } from "./ui/3d-pin";
const PinContainer = dynamic(() => import("./ui/3d-pin"), {
  ssr: false,
  loading: () => <div>Loading 3D pin...</div>, // Optional fallback
});

const RecentProjects = () => {
  return (
    <div className="py-20" id="projects">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-x-24 gap-y-2 mt-10">
        {projects.map(({ id, title, des, img, iconLists, link }) => (
          <div
            className="sm:h-[41rem] h-[32rem] lg:min-h-[32.5rem] flex items-center justify-center sm:w-96 w-[80vw]"
            key={id}
          >
            <PinContainer title={link} href={link}>
              <div className="relative flex items-center justify-center sm:w-96 sm:h-[40vh] w-[80vw] overflow-hidden h-[20vh] mb-10">
                <div className="relative w-full h-full overflow-hidden lg:rounded-3xl bg-dark-blue">
                  <Image
                    src="/bg.png"
                    alt="bgimg"
                    fill
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                </div>
                <Image
                  src={img}
                  alt="cover"
                  className="z-10 absolute bottom-0"
                  width={200}
                  height={200}
                  unoptimized
                />
              </div>

              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                {title}
              </h1>

              <p className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2 text-gray-400 my-2">
                {des}
              </p>

              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center">
                  {iconLists.map((icon, index) => (
                    <div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${5 * index + 2}px)`,
                      }}
                    >
                      <Image
                        src={icon}
                        alt="icon"
                        width={30}
                        height={30}
                        className="p-2"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center">
                  <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                    Check Live Site
                  </p>
                  <FaLocationArrow className="ms-3" color="#CBACF9" />
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
