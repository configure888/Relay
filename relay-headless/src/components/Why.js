"use client";
import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGlobalState } from "./GlobalStateContext";
import Image from "next/image";

const Why = () => {
  const { whyContent } = useGlobalState();
  const { isLoading } = useGlobalState();

  let Header, Why1, Why2, WhyDescription1, WhyDescription2, CTA, Image1, Image2;

  if (whyContent) {
    ({
      Header,
      Why1,
      Why2,
      WhyDescription1,
      WhyDescription2,
      CTA,
      Image1,
      Image2,
    } = whyContent);
  }

  // GSAP Animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Define a common parent selector that wraps all your images.
    // Adjust the selector as needed to target your specific layout.
    const section = document.querySelector("#why");

    gsap.utils.toArray(".left, .right").forEach((image) => {
      // Decide the direction based on the class and screen size
      const direction = image.classList.contains("left") ? 1 : -1;

      gsap.to(image, {
        x: () => direction * 50, // Adjust the distance as needed
        ease: "expoScale",
        scrollTrigger: {
          trigger: image.parentElement,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });
    });

    // Clean up the ScrollTriggers when the component unmounts
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoading]);

  return (
    <>
      <div className="relative flex min-h-[30vh] flex-col items-center justify-center overflow-hidden w-full rounded-md z-0">
        <div className="relative z-50 flex  flex-col items-center px-5">
          <h2 className="font-melodrama text-4xl sm:text-5xl lg:text-7xl text-center lg:text-start">
            <span className="bg-gradient-to-br from-neutral-100 from-55% to-neutral-500 bg-clip-text font-medium tracking-tight text-transparent lg:min-h-[50vw] lg:to-neutral-600">
              {/* {Header} */}
              Why Should You Use Our Marketing Funnels?
            </span>
          </h2>
        </div>
      </div>
      <div className="relative overflow-x-hidden" id="why">
        <div className="mx-auto px-6 lg:max-w-7xl lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="mt-2 font-melodrama text-3xl font-medium tracking-tight text-white sm:text-6xl">
                  <span className="bg-gradient-to-b from-neutral-50 from-60% to-neutral-400 bg-clip-text text-transparent lg:to-neutral-600">
                    {/* {Why1} */}
                    Designed to Convert Paid Traffic
                  </span>
                </h2>
                <p className="text-md mt-6 font-light text-neutral-300 md:text-lg">
                  {/* {WhyDescription1} */}
                  We design, develop and deploy custom marketing funnels to help
                  you convert your paid traffic into sales. Our funnels are
                  completely managed by us, so you don&apos;t have to touch a
                  thing.
                </p>
                <a href="/contact">
                  <button className="relative rounded-full text-center transition-all duration-500 transform overflow-hidden z-40   px-6 py-3 text-base bg-blue-500 text-neutral-950 border border-blue-500 button hover:text-neutral-50 group mt-6 text-lg uppercase">
                    <div className="group relative z-10 w-full">
                      {/* {CTA} */}
                      Get Started
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                        className="ml-2 inline-block"
                      >
                        <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path>
                      </svg>
                    </div>
                  </button>
                </a>
              </div>
            </div>

            <div className="relative flex items-start justify-end">
              <img
                src="/img/increase-cr.webp"
                alt="Product screenshot"
                className="hidden sm:block right h-auto w-[24rem] max-w-none rounded-xl shadow-xl sm:w-[36rem] md:-ml-4 lg:-ml-0"
                loading="lazy"
                width="1217"
                height="1227"
                decoding="async"
              />

              <img
                src="/img/increase-cr.webp"
                alt="Product screenshot"
                className="block sm:hidden h-auto w-[24rem] max-w-none rounded-xl shadow-xl sm:w-[36rem]"
                loading="lazy"
                width="1217"
                height="1227"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-hidden py-12 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:ml-auto lg:pl-4 lg:pt-4">
              <div className="lg:max-w-lg">
                <h3 className="mt-2 font-melodrama text-3xl font-medium tracking-tight text-white sm:text-6xl">
                  <span className="bg-gradient-to-b from-neutral-50 from-60% to-neutral-400 bg-clip-text text-transparent lg:to-neutral-600">
                    {/* {Why2} */}
                    Using Our Own Custom Technologies
                  </span>
                </h3>
                <p className="text-md mt-6 font-light text-neutral-300 md:text-lg">
                  {/* {WhyDescription2} */}
                  We&apos;ve architected our own custom marketing framework so
                  that our funnels are up to 10x faster than typical websites
                  and convert 1.5x better than typical Shopify stores. Allowing
                  us to deliver a better user experience and increase your
                  conversion rate.
                </p>
                <a href="/contact">
                  <button className="relative rounded-full text-center transition-all duration-500 transform overflow-hidden z-40   px-6 py-3 text-base bg-blue-500 text-neutral-950 border border-blue-500 button hover:text-neutral-50 group mt-6 uppercase">
                    <div className="group relative z-10 w-full">
                      {/* {CTA} */}
                      Get Started
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                        className="ml-2 inline-block"
                      >
                        <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path>
                      </svg>
                    </div>
                  </button>
                </a>
              </div>
            </div>
            <div className="relative flex items-start justify-end lg:order-first">
              <img
                src="/img/design.webp"
                alt="Product screenshot"
                className="hidden sm:block left h-auto w-[28rem] max-w-none rounded-xl shadow-xl sm:w-[40rem] md:-ml-4 lg:-ml-0"
                loading="lazy"
                width="1365"
                height="832"
                decoding="async"
              />

              <img
                src="/img/design.webp"
                alt="Product screenshot"
                className="block sm:hidden h-auto w-[28rem] max-w-none rounded-xl shadow-xl sm:w-[40rem] -mr-24"
                loading="lazy"
                width="1365"
                height="832"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>

      {/* <div className=" min-h-[200vh]  flex flex-col items-center py-12 md:py-36 justify-start flex-shrink-0 [perspective:800px] transform ">
        <h2
          className="font-melodrama text-4xl sm:text-5xl lg:text-7xl lg:text-start md:mb-20 text-center mx-auto px-5"
          bs="opacity: 1; transform: none;"
        >
          <span className=" items-center text-center bg-gradient-to-br from-neutral-100 from-55% to-neutral-500 bg-clip-text font-medium tracking-tight text-transparent lg:min-h-[50vw] lg:to-neutral-600">
            We Deliver Real Results to Real People
          </span>
        </h2>
        <div className="md:scale-100  scale-[0.35] sm:scale-50">
          <div className="relative [perspective:800px]">
            <div
              bs="transform:perspective(800px) rotateX(-25deg) translateZ(0px);transform-origin:bottom;transform-bs:preserve-3d"
              className="h-[12rem] w-[32rem] bg-[#010101] rounded-2xl p-2 relative"
            >
              <div
                bs="box-shadow:0px 2px 0px 2px var(--neutral-900) inset"
                className="absolute inset-0 bg-[#010101] rounded-lg flex items-center justify-center"
              >
                <span className="text-white">
                  <svg
                    width="66"
                    height="65"
                    viewBox="0 0 66 65"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-white"
                  >
                    <path
                      d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
                      stroke="currentColor"
                      strokeWidth="15"
                      stroke-miterlimit="3.86874"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
            <div
              className="h-96 w-[32rem] absolute inset-0 bg-[#010101] rounded-2xl p-2 shadow-3xl shadow-blue-500 border border-blue-500"
              bs="transform-bs: preserve-3d; transform-origin: center top; transform: translateY(0px) scaleX(1.2) scaleY(0.6) rotateX(-28deg) translateZ(0px);"
            >
              <div className="absolute inset-0 bg-[#272729] rounded-lg"></div>
              <img
                src="/_astro/results.b214213f.webp"
                alt="Macbook"
                width="512"
                height="304"
                className="object-cover object-left-top absolute rounded-lg inset-0 h-full w-full"
              />
            </div>
          </div>
          <div className="h-[22rem] w-[32rem] bg-neutral-800 rounded-2xl overflow-hidden relative -z-10">
            <div className="h-10 w-full relative">
              <div className="absolute inset-x-0 mx-auto w-[80%] h-4 bg-neutral-900"></div>
            </div>
            <div className="flex relative">
              <div className="mx-auto w-[10%] overflow-hidden  h-full">
                <div
                  className="flex px-[0.5px] gap-[2px] mt-2 h-40"
                  bs="background-image:radial-gradient(circle, #08080A 0.5px, transparent 0.5px);background-size:3px 3px"
                ></div>
              </div>
              <div className="mx-auto w-[80%] h-full">
                <div className="h-full rounded-md bg-[#050505] mx-1 p-1">
                  <div className="flex gap-[2px] mb-[2px] w-full flex-shrink-0">
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 bg-[#0A090D] rounded-[3.5px] flex w-10 items-end justify-start pl-[4px] pb-[2px]"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center flex-col items-start text-white">
                          esc
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-[6px] w-[6px]"
                          >
                            <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                            <path d="M12 5l0 .01"></path>
                            <path d="M17 7l0 .01"></path>
                            <path d="M19 12l0 .01"></path>
                            <path d="M17 17l0 .01"></path>
                            <path d="M12 19l0 .01"></path>
                            <path d="M7 17l0 .01"></path>
                            <path d="M5 12l0 .01"></path>
                            <path d="M7 7l0 .01"></path>
                          </svg>
                          <span className="inline-block mt-1">F1</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-[6px] w-[6px]"
                          >
                            <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                            <path d="M12 5l0 -2"></path>
                            <path d="M17 7l1.4 -1.4"></path>
                            <path d="M19 12l2 0"></path>
                            <path d="M17 17l1.4 1.4"></path>
                            <path d="M12 19l0 2"></path>
                            <path d="M7 17l-1.4 1.4"></path>
                            <path d="M6 12l-2 0"></path>
                            <path d="M7 7l-1.4 -1.4"></path>
                          </svg>
                          <span className="inline-block mt-1">F2</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-[6px] w-[6px]"
                          >
                            <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z"></path>
                            <path d="M3 10h18"></path>
                            <path d="M10 3v18"></path>
                          </svg>
                          <span className="inline-block mt-1">F3</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-[6px] w-[6px]"
                          >
                            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                            <path d="M21 21l-6 -6"></path>
                          </svg>
                          <span className="inline-block mt-1">F4</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-[6px] w-[6px]"
                          >
                            <path d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z"></path>
                            <path d="M5 10a7 7 0 0 0 14 0"></path>
                            <path d="M8 21l8 0"></path>
                            <path d="M12 17l0 4"></path>
                          </svg>
                          <span className="inline-block mt-1">F5</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-[6px] w-[6px]"
                          >
                            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
                          </svg>
                          <span className="inline-block mt-1">F6</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-[6px] w-[6px]"
                          >
                            <path d="M21 5v14l-8 -7z"></path>
                            <path d="M10 5v14l-8 -7z"></path>
                          </svg>
                          <span className="inline-block mt-1">F7</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-[6px] w-[6px]"
                          >
                            <path d="M4 5v14l12 -7z"></path>
                            <path d="M20 5l0 14"></path>
                          </svg>
                          <span className="inline-block mt-1">F8</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-[6px] w-[6px]"
                          >
                            <path d="M3 5v14l8 -7z"></path>
                            <path d="M14 5v14l8 -7z"></path>
                          </svg>
                          <span className="inline-block mt-1">F8</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-[6px] w-[6px]"
                          >
                            <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5"></path>
                            <path d="M16 10l4 4m0 -4l-4 4"></path>
                          </svg>
                          <span className="inline-block mt-1">F10</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-[6px] w-[6px]"
                          >
                            <path d="M15 8a5 5 0 0 1 0 8"></path>
                            <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5"></path>
                          </svg>
                          <span className="inline-block mt-1">F11</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-[6px] w-[6px]"
                          >
                            <path d="M15 8a5 5 0 0 1 0 8"></path>
                            <path d="M17.7 5a9 9 0 0 1 0 14"></path>
                            <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5"></path>
                          </svg>
                          <span className="inline-block mt-1">F12</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <div className="h-4 w-4 rounded-full  bg-gradient-to-b from-20% from-neutral-900 via-black via-50% to-neutral-900 to-95% p-px">
                            <div className="bg-black h-full w-full rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[2px] mb-[2px] w-full flex-shrink-0">
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">~</span>
                          <span className="block mt-1">`</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block ">!</span>
                          <span className="block">1</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">@</span>
                          <span className="block">2</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">#</span>
                          <span className="block">3</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">$</span>
                          <span className="block">4</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">%</span>
                          <span className="block">5</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">^</span>
                          <span className="block">6</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">&amp;</span>
                          <span className="block">7</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">*</span>
                          <span className="block">8</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">(</span>
                          <span className="block">9</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">)</span>
                          <span className="block">0</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">—</span>
                          <span className="block">_</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">+</span>
                          <span className="block"> = </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 bg-[#0A090D] rounded-[3.5px] flex w-10 items-end justify-end pr-[4px] pb-[2px]"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center flex-col items-end text-white">
                          delete
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[2px] mb-[2px] w-full flex-shrink-0">
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 bg-[#0A090D] rounded-[3.5px] flex w-10 items-end justify-start pl-[4px] pb-[2px]"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center flex-col items-start text-white">
                          tab
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">Q</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">W</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">E</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">R</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">T</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">Y</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">U</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">I</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">O</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">P</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block"></span>
                          <span className="block">]</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">|</span>
                          <span className="block">\</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[2px] mb-[2px] w-full flex-shrink-0">
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 bg-[#0A090D] rounded-[3.5px] flex w-[2.8rem] items-end justify-start pl-[4px] pb-[2px]"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center flex-col items-start text-white">
                          caps lock
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">A</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">S</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">D</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">F</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">G</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">H</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">J</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">K</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">L</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">:</span>
                          <span className="block">;</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">"</span>
                          <span className="block">'</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 bg-[#0A090D] rounded-[3.5px] flex w-[2.85rem] items-end justify-end pr-[4px] pb-[2px]"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center flex-col items-end text-white">
                          return
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[2px] mb-[2px] w-full flex-shrink-0">
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 bg-[#0A090D] rounded-[3.5px] flex w-[3.65rem] items-end justify-start pl-[4px] pb-[2px]"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center flex-col items-start text-white">
                          shift
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">Z</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">X</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">C</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">V</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">B</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">N</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">M</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">&lt;</span>
                          <span className="block">,</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">&gt;</span>
                          <span className="block">.</span>
                        </div>
                      </div>
                    </div>{" "}
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                          <span className="block">?</span>
                          <span className="block">/</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 bg-[#0A090D] rounded-[3.5px] flex w-[3.65rem] items-end justify-end pr-[4px] pb-[2px]"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center flex-col items-end text-white">
                          shift
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[2px] mb-[2px] w-full flex-shrink-0">
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex items-center flex-col h-full justify-between py-[4px] text-white">
                          <div className="flex justify-end w-full pr-1">
                            <span className="block">fn</span>
                          </div>
                          <div className="flex justify-start w-full pl-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-[6px] w-[6px]"
                            >
                              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                              <path d="M3.6 9h16.8"></path>
                              <path d="M3.6 15h16.8"></path>
                              <path d="M11.5 3a17 17 0 0 0 0 18"></path>
                              <path d="M12.5 3a17 17 0 0 1 0 18"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex items-center flex-col h-full justify-between py-[4px] text-white">
                          <div className="flex justify-end w-full pr-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-[6px] w-[6px]"
                            >
                              <path d="M6 15l6 -6l6 6"></path>
                            </svg>
                          </div>
                          <div className="flex justify-start w-full pl-1">
                            <span className="block">control</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex items-center flex-col h-full justify-between py-[4px] text-white">
                          <div className="flex justify-end w-full pr-1">
                            <svg
                              fill="none"
                              version="1.1"
                              id="icon"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 32 32"
                              className="h-[6px] w-[6px]"
                            >
                              <rect
                                stroke="currentColor"
                                strokeWidth="2"
                                x="18"
                                y="5"
                                width="10"
                                height="2"
                              ></rect>
                              <polygon
                                stroke="currentColor"
                                strokeWidth="2"
                                points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25 "
                              ></polygon>
                              <rect
                                id="_Transparent_Rectangle_"
                                className="st0"
                                width="32"
                                height="32"
                                stroke="none"
                              ></rect>
                            </svg>
                          </div>
                          <div className="flex justify-start w-full pl-1">
                            <span className="block">option</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center w-8"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex items-center flex-col h-full justify-between py-[4px] text-white">
                          <div className="flex justify-end w-full pr-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-[6px] w-[6px]"
                            >
                              <path d="M7 9a2 2 0 1 1 2 -2v10a2 2 0 1 1 -2 -2h10a2 2 0 1 1 -2 2v-10a2 2 0 1 1 2 2h-10"></path>
                            </svg>
                          </div>
                          <div className="flex justify-start w-full pl-1">
                            <span className="block">command</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center w-[8.2rem]"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex justify-center items-center flex-col text-white"></div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center w-8"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex items-center flex-col h-full justify-between py-[4px] text-white">
                          <div className="flex justify-start w-full pl-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-[6px] w-[6px]"
                            >
                              <path d="M7 9a2 2 0 1 1 2 -2v10a2 2 0 1 1 -2 -2h10a2 2 0 1 1 -2 2v-10a2 2 0 1 1 2 2h-10"></path>
                            </svg>
                          </div>
                          <div className="flex justify-start w-full pl-1">
                            <span className="block">command</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                      <div
                        className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center"
                        bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                      >
                        <div className="text-[5px] w-full flex items-center flex-col h-full justify-between py-[4px] text-white">
                          <div className="flex justify-start w-full pl-1">
                            <svg
                              fill="none"
                              version="1.1"
                              id="icon"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 32 32"
                              className="h-[6px] w-[6px]"
                            >
                              <rect
                                stroke="currentColor"
                                strokeWidth="2"
                                x="18"
                                y="5"
                                width="10"
                                height="2"
                              ></rect>
                              <polygon
                                stroke="currentColor"
                                strokeWidth="2"
                                points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25 "
                              ></polygon>
                              <rect
                                id="_Transparent_Rectangle_"
                                className="st0"
                                width="32"
                                height="32"
                                stroke="none"
                              ></rect>
                            </svg>
                          </div>
                          <div className="flex justify-start w-full pl-1">
                            <span className="block">option</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[4.9rem] mt-[2px] h-6 p-[0.5px] rounded-[4px] flex flex-col justify-end items-center">
                      <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                        <div
                          className="bg-[#0A090D] rounded-[3.5px] flex items-center justify-center w-6 h-3"
                          bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                        >
                          <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-[6px] w-[6px]"
                            >
                              <path
                                d="M11.293 7.293a1 1 0 0 1 1.32 -.083l.094 .083l6 6l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059l-.002 .059l-.005 .058l-.009 .06l-.01 .052l-.032 .108l-.027 .067l-.07 .132l-.065 .09l-.073 .081l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002h-12c-.852 0 -1.297 -.986 -.783 -1.623l.076 -.084l6 -6z"
                                fill="currentColor"
                                strokeWidth="0"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                          <div
                            className="bg-[#0A090D] rounded-[3.5px] flex items-center justify-center w-6 h-3"
                            bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                          >
                            <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-[6px] w-[6px]"
                              >
                                <path
                                  d="M13.883 5.007l.058 -.005h.118l.058 .005l.06 .009l.052 .01l.108 .032l.067 .027l.132 .07l.09 .065l.081 .073l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059v12c0 .852 -.986 1.297 -1.623 .783l-.084 -.076l-6 -6a1 1 0 0 1 -.083 -1.32l.083 -.094l6 -6l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01z"
                                  fill="currentColor"
                                  strokeWidth="0"
                                ></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                          <div
                            className="bg-[#0A090D] rounded-[3.5px] flex items-center justify-center w-6 h-3"
                            bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                          >
                            <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-[6px] w-[6px]"
                              >
                                <path
                                  d="M18 9c.852 0 1.297 .986 .783 1.623l-.076 .084l-6 6a1 1 0 0 1 -1.32 .083l-.094 -.083l-6 -6l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057v-.118l.005 -.058l.009 -.06l.01 -.052l.032 -.108l.027 -.067l.07 -.132l.065 -.09l.073 -.081l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01l.057 -.004l12.059 -.002z"
                                  fill="currentColor"
                                  strokeWidth="0"
                                ></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-xl shadow-white">
                          <div
                            className="bg-[#0A090D] rounded-[3.5px] flex items-center justify-center w-6 h-3"
                            bs="box-shadow:0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
                          >
                            <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-[6px] w-[6px]"
                              >
                                <path
                                  d="M9 6c0 -.852 .986 -1.297 1.623 -.783l.084 .076l6 6a1 1 0 0 1 .083 1.32l-.083 .094l-6 6l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002l-.059 -.002l-.058 -.005l-.06 -.009l-.052 -.01l-.108 -.032l-.067 -.027l-.132 -.07l-.09 -.065l-.081 -.073l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057l-.002 -12.059z"
                                  fill="currentColor"
                                  strokeWidth="0"
                                ></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-auto w-[10%] overflow-hidden   h-full">
                <div
                  className="flex px-[0.5px] gap-[2px] mt-2 h-40"
                  bs="background-image:radial-gradient(circle, #08080A 0.5px, transparent 0.5px);background-size:3px 3px"
                ></div>
              </div>
            </div>
            <div
              className="w-[40%] mx-auto h-32  rounded-xl my-1 bg-neutral-800"
              bs="box-shadow:0px 0px 1px 1px #00000020 inset"
            ></div>
            <div className="h-2 w-20 mx-auto inset-x-0 absolute bottom-0 bg-gradient-to-t from-neutral-700 to-neutral-800 rounded-tr-3xl rounded-tl-3xl"></div>
            <div className="absolute bottom-4 left-4">
              <a href="https://peerlist.io/manuarora">
                <p className="sr-only">Relay</p>
                <img
                  src="/_astro/ss-logo-dark.08e32a2d.svg"
                  className="h-16 w-16 -rotate-12 transform rounded-full"
                  alt="Relay Logo"
                />
              </a>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Why;
