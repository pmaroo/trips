"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip, ScrollTrigger } from "gsap/all";

export default function IndexClient() {
  gsap.registerPlugin(useGSAP, ScrollTrigger, Flip);

  const container = useRef<HTMLUListElement | null>(null);
  const twoContainer = useRef<HTMLUListElement | null>(null);

  useGSAP(
    () => {
      gsap.to(".title", {
        x: -80,
        scrollTrigger: {
          start: 0,
          end: 300,
          scrub: true,
        },
      });
      gsap.to(".title2", {
        x: 80,
        scrollTrigger: {
          start: 0,
          end: 300,
          scrub: true,
        },
      });
      gsap.to(".title", {
        opacity: 0,
        ease: "sine.out",
        scrollTrigger: {
          start: 1900,
          end: 2500,
          scrub: true,
        },
      });
      gsap.to(".title2", {
        opacity: 0,
        ease: "sine.out",
        scrollTrigger: {
          start: 1900,
          end: 2500,
          scrub: true,
        },
      });

      gsap.to(".card", {
        y: 0,
        opacity: 1,
        ease: "sine.out",
        stagger: 1,
        scrollTrigger: {
          start: 150,
          end: 2000,
          scrub: true,
        },
      });

      // 카드 그리드 애니메이션
      gsap.set(".card2", {
        xPercent: -50,
        yPercent: -50,
        left: "50%",
        top: "50%",
        position: "absolute",
      });

      // 스크롤 트리거 생성
      const tl = gsap.timeline({
        scrollTrigger: {
          // trigger: ".card-container", // 트리거 요소
          start: 2300, // 트리거 요소가 있을때 top은 트리거 요소의 상단이 뷰포트하단에 도달했을때
          end: 3000,
          scrub: 1,
          toggleActions: "play none none reverse",

          onEnterBack: () => {
            // 스크롤을 다시 위로 올릴 때 모든 카드를 중앙로
            gsap.set(".card2", {
              xPercent: -50,
              yPercent: -50,
              left: "50%",
              top: "50%",
              position: "absolute",
            });
          },
        },
      });

      // 타임라인에 애니메이션 추가
      tl.to(".card2", {
        x: (index) => {
          const row = Math.floor(index / 5);
          const col = index % 5;
          return (col - 2) * 350; // 300을 600으로 변경하여 양쪽으로 더 넓게 퍼지게 함
        },
        y: (index) => {
          const row = Math.floor(index / 5);
          const col = index % 5;
          return (row - 0.5) * 450;
        },
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
      });
    },
    { scope: container },
  );

  useGSAP(
    () => {
      const sets = gsap.utils.toArray<HTMLUListElement>(".text-set");

      let currentIndex = -1;

      sets.forEach((el, index) => {
        const title = el.querySelector(".title");
        const title2 = el.querySelector(".title2");
        const box = el.querySelector(".box");

        // 초기 상태 세팅
        gsap.set(title, { x: 75 });
        gsap.set(title2, { x: -75 });
        gsap.set(box, { opacity: 0 });

        // 텍스트 애니메이션 트리거
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          scrub: true,
          onEnter: () => {
            if (currentIndex !== index) {
              gsap.to(".stickyBox", {
                y: -300 * index,
                duration: 0.8,
                ease: "power2.out",
              });
              currentIndex = index;
            }

            gsap.to(title, { x: 0, duration: 0.8 });
            gsap.to(title2, { x: 0, duration: 0.8 });
            gsap.to(box, { opacity: 1, duration: 0.8 });
          },
          onLeaveBack: () => {
            gsap.to(title, { x: 75, duration: 0.8 });
            gsap.to(title2, { x: -75, duration: 0.8 });
            gsap.to(box, { opacity: 0, duration: 0.8 });

            // 위로 돌아갈 때 stickyBox도 자연스럽게 복귀
            if (currentIndex !== index - 1) {
              gsap.to(".stickyBox", {
                y: -500 * (index - 1),
                duration: 0.8,
                ease: "power2.out",
              });
              currentIndex = index - 1;
            }
          },
        });
      });
    },
    { scope: twoContainer },
  );

  const SLIDES = Array.from(Array(5).keys());
  const emblaRef = useRef<HTMLDivElement | null>(null);
  return (
    <>
      <article
        className="
          flex
          items-start
          justify-start
          h-[4000px]
        "
        ref={container}
      >
        <ul
          className="
            flex
            flex-row
            items-center
            justify-center
            w-full
            sticky
            top-0
            left-0
            h-screen
          "
        >
          <li
            className="
              mr-[30px]
              translate-x-[130px]
              title
            "
          >
            <p
              className="
                text-white
                text-[100px]
              "
            >
              선물의{" "}
              <span
                className="
                  font-[900]
                "
              >
                가치
              </span>
            </p>
          </li>
          <li
            className="
              w-[240px]
              h-[400px]
              relative
              card-container
            "
          >
            <div
              className="
                absolute
                inset-auto
                bg-red-400
                opacity-0
                card
                card2
                translate-y-[200px]
                size-full
              "
            ></div>
            <div
              className="
                absolute
                inset-auto
                bg-orange-500
                opacity-0
                card
                card2
                translate-y-[200px]
                size-full
              "
            ></div>
            <div
              className="
                absolute
                inset-auto
                bg-blue-700
                opacity-0
                card
                card2
                translate-y-[200px]
                size-full
              "
            ></div>
            <div
              className="
                bg-white
                absolute
                inset-auto
                opacity-0
                card
                card2
                translate-y-[200px]
                size-full
              "
            ></div>
            <div
              className="
                bg-white
                absolute
                inset-auto
                opacity-0
                card2
                translate-y-[200px]
                size-full
              "
            ></div>
            <div
              className="
                bg-white
                absolute
                inset-auto
                opacity-0
                card2
                translate-y-[200px]
                size-full
              "
            ></div>
            <div
              className="
                bg-white
                absolute
                inset-auto
                opacity-0
                card2
                translate-y-[200px]
                size-full
              "
            ></div>
            <div
              className="
                bg-white
                absolute
                inset-auto
                opacity-0
                card2
                translate-y-[200px]
                size-full
              "
            ></div>
            <div
              className="
                bg-white
                absolute
                inset-auto
                opacity-0
                card2
                translate-y-[200px]
                size-full
              "
            ></div>
            <div
              className="
                bg-white
                absolute
                inset-auto
                opacity-0
                card2
                translate-y-[200px]
                size-full
              "
            ></div>
          </li>
          <li
            className="
              ml-[30px]
              translate-x-[-130px]
              title2
            "
          >
            <p
              className="
                text-white
                text-[100px]
              "
            >
              깊카와{" "}
              <span
                className="
                  font-[900]
                "
              >
                같이
              </span>
            </p>
          </li>
        </ul>
      </article>
      <article
        ref={twoContainer}
        className="
          flex
          flex-col
          items-center
          justify-start
          w-full
          h-[3000px]
          pb-[400px]
        "
      >
        <div
          className="
            sticky
            top-[0]
            left-[0]
            pt-[400px]
            stickyBox
          "
        >
          <ul
            className="
              flex
              flex-row
              items-center
              justify-center
              w-full
              py-[100px]
              text-set
            "
          >
            <li
              className="
                text-white
                text-[100px]
                font-[900]
                title
              "
            >
              GIFT CARD
            </li>
            <li
              className="
                mx-[50px]
                box
              "
            >
              <div
                className="
                  bg-white
                  size-[100px]
                  rotate-[20deg]
                "
              ></div>
            </li>
            <li
              className="
                text-white
                text-[100px]
                font-[900]
                title2
              "
            >
              깊카
            </li>
          </ul>
          <ul
            className="
              flex
              flex-row
              items-center
              justify-center
              w-full
              py-[100px]
              text-set
            "
          >
            <li
              className="
                text-white
                text-[100px]
                font-[900]
                title
              "
            >
              GIFT CARD
            </li>
            <li
              className="
                mx-[50px]
                box
              "
            >
              <div
                className="
                  bg-white
                  size-[100px]
                  rotate-[20deg]
                "
              ></div>
            </li>
            <li
              className="
                text-white
                text-[100px]
                font-[900]
                title2
              "
            >
              깊카
            </li>
          </ul>

          <ul
            className="
              flex
              flex-row
              items-center
              justify-center
              w-full
              py-[100px]
              text-set
            "
          >
            <li
              className="
                text-white
                text-[100px]
                font-[900]
                title
              "
            >
              GIFT CARD
            </li>
            <li
              className="
                mx-[50px]
                box
              "
            >
              <div
                className="
                  bg-white
                  size-[100px]
                  rotate-[20deg]
                "
              ></div>
            </li>
            <li
              className="
                text-white
                text-[100px]
                font-[900]
                title2
              "
            >
              깊카
            </li>
          </ul>
        </div>
      </article>

      <article>
        <div ref={emblaRef}>
          <div>
            {SLIDES.map((index) => {
              return (
                <div
                  className="
                border
                border-white
              "
                  key={index}
                >
                  {index + 1}
                </div>
              );
            })}
          </div>
        </div>
      </article>
    </>
  );
}
