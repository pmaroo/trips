import ClientPage from "./clientPage";
import axios from "@node_modules/axios";
import { CategoryDTO } from "@/types/category";

// posts는 빌드시점에 getStaticProps()에 의해 채워짐
export default async function Page() {
  // const router = useRouter();

  // fallback:true로 해뒀기때문에 router에서 isFallback의 값을 가져올 수 있음
  // if (router.isFallback) {
  //   return <p>정적 페이지 생성중</p>;
  // }

  // cache가 fallback을 대체
  // cache : "no-store" => fallback : true
  // 새로운 경로 요청시 데이터 가져온 후 페이지 렌더링
  // cache : "force-cache" => fallback: "blocking"
  // 캐시된 데이터 우선 사용, 없으면 새로 가져옴
  // 직관적으로 변경
  // const res = await fetch("", { cache: "force-cache" });
  // const post = await res.json();
  const apiClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`, // api 주소
    headers: { "content-Type": "application/json" },
    withCredentials: true, // ✅ 쿠키 포함 요청
  });

  const categoryList = async () => {
    const { data } = await apiClient.post("/category");

    return data;
  };

  const categoryData: CategoryDTO[] = await categoryList();
  return (
    <>
      <ClientPage categoryData={categoryData} />
    </>
  );
}

// 정적생성페이지
// getStaticPaths는 pageRouter에서 사용 가능
// app Router에서는 사용하지 않는다
// export async function getStaticPaths() {
//   // const res = await fetch("");
//   // const posts = await res.json();

//   // const paths = posts.map((post) => {
//   //   params: "";
//   // });

//   // fallback:false 는 이외의 다른경로는 404페이지로 보낸다는 것을 의미
//   // fallback:true 는 정적으로 추가 페이지를 생성할 수 있음
//   // paths의 params id 가 1과 2만 정의되어 있기 때문에 params 3의 값이 들어오면 정적 추가 페이지를 생성한다
//   // fallback: blocking의 경우 true와 비슷하지만 로딩중일때의 화면을 띄워주지 않는다.
//   // 시간이 짧은 로직일 경우 => 로딩화면이 짧아 오히려 UX를 떨어뜨려 blocking이 더 낫다
//   // 시간이 긴 로직일 경우 => 화면 전환이 오래걸려 UX를 떨어뜨리기 때문에 true가 낫다
//   return {
//     paths: [{ params: { id: `1` } }, { params: { id: `2` } }],
//     fallback: true,
//   };
// }

// server side에서 빌드타임에 호출
// client side에서는 호출되지 않으므로 직접 DB쿼리 수행 가능
// 해당 params는 getStaticPaths에서 보낸 params, 즉 paths이다.
// generateStaticParams : app router에서 사용시
// app router에서 paths의 역할 담당
// export const generateStaticParams = async ({ params }) => {
//   const res = await fetch("");
//   const posts = await res.json();

//   // 해당 getStaticProps에서 Redirect도 설정 가능
//   // 해당 부분 page Router에서 사용
//   // if (!posts) {
//   //   // 404페이지 리턴
//   //   return {
//   //     notfound: true,
//   //     redirect: {
//   //       desctination: "/",
//   //       permanent: false,
//   //     },
//   //   };
//   // }

//   // 해당 return된 걸 page에서 받아서 최소한의 랜더링을 해준다.
//   return {
//     props: {
//       posts,
//     },
//     // 요청이 들어올때 최대 10초마다 한번 페이지를 재생성
//     revalidate: 10,
//   };
//   // satisfies : 뒤에오는 타입을 미리 밸리데이팅하라고 강제(prevalidating)
// };

// 주의점
// app은 서버에서 렌더링 되는 서버 컴포넌트이기 때문에
// react hook 사용시 "use client"로 클라이언트 컴포넌트로 명시해야 사용 가능

// pages를 사용하지 않고 app 을 사용하는 이유
// 1. 서버 컴포넌트 기본적용
// 서버 컴포넌트이기 때문에 불필요한 js가 클라이언트에 전달되는걸 방지하고 결과만 클라이언트로 보내기때문에 렌더링 성능이 좋아짐

// getStaticProps
// React : CSR(Client Side Rendering) = 자바스크립트 파일을 브라우저에서 해석해 렌더링하는 방식
// 처음 서버에서부터 파일을 받아오는데 오랜 시간이 걸리지만 한번 받아오면 클라이언트 측에서 렌더링함으로 깜빡임없이 부드러운 UX
// preRendering : SSR(Server Side Rendering)을 구현하는 Next.js의 특징
// 미리 서버에서 HTML파일로 렌더링해 클라이언트로 전송해주는 방식
// 서버와 통신시 만들어둔 HTML 파일을 전달받음으로 CSR보다 렌더링 속도 ⬆
// 그러나 페이지를 옮길때마다 통신해야해서 화면 깜빡임이 많아지는 현상?
// Next.js 해결 => 최소한의 javascript를 이용한 Rendering을 하고 나머지 이후에는 차차 javascript파일들을 받아와
// 클라이언트 측에서 javascript를 해석하는 CSR과 비슷한 방식으로 진행
// Next.js => SSR => CSR

// staticGeneration(정적생성방식)
// 페이지 렌더링에 필요한 데이터는 사용자 request 전에 빌드 시점에서 사용할 수 있다.
// handless CMS에서 데이터를 갖고 온다.
// CMS ➡ Content Management System 콘텐츠 관리 시스템
// getStaticProps는 HTML과 JSON파일을 생성하며, 이 두 파일은 성능을 위해 CDN에 캐싱할 수 있다.
// 항상 서버에서 실행되며 클라이언트에서 실행하지 않는다.
// next build가 실행될때 작동한다.
// 페이지에서만 사용가능 (_app, _document, _erre 파일 불가능)
// next dev로 실행하면 getStaticProps는 매 요청마다 호출
// 데이터는 공개적으로 캐시될 수 있다. 특정 상황에서 미들웨어를 사용하여 경로를 다시 작성함으로써 이 조건을 우회할 수 있다.

// Next.js 파일구조
// app/ : Next.js 13부터 도입된 새로운 구조
// layout.tsx : 공통 레이아웃 지정할 때 사용
// page.tsx : 이전 pages/index.jsx와 같은 구조
// api/ : RESTful API 정의

// lib/ : DB연결파일 및 외부 라이브러리와 관련된 설정
// models/ : MongoDB의 Mongoose 모델을 정의하는 곳
// components/ : 재사용한 React 컴포넌트
// styles/ : CSS파일 , 전역스타일, 모듈화된 스타일
// utils/ : 공통으로 사용되는 유틸리티 함수

// "getStaticProps" is not supported in app/.
