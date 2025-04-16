const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

// next.config.js는 webpack, babel, typescript로 해석이 되지 않는다.
// next 12.1.0ver 이후부터는 async도 가능

// 더 많은 next.config.js 기능 https://nextjs-ko.org/docs/app/api-reference/next-config-js
module.exports = async (phase, { defultConfig }) => {
  // phase : 설정이 세팅되는 환경 (개발환경,배포환경 나눌 수 있음)
  // 해당 phase 와 PHASE_DEVELOPMENT_SERVER는 터미널에서 확인 가능
  // phase-development-server
  // 개발환경

  const API_KEY = "a9d36e8de716b2445367dc38aba22d5a";

  //   개발,배포 환경 두군데 다 적용시킬 공간
  const nextConfig = {
    transpilePackages: ["three"], // 트랜스파일
    // 번들 사이즈 줄이기 위해 three.js 포함 (용량 큰 라이브러리)
    reactStrictMode: true, // React.strictMode와 동일
    // 2번씩 렌더링 되는 현상 발견
    // 의도적으로 2번씩 렌더링
    // 부작용 탐지로 인한 두번의 렌더링, 배포에서는 정상적으로 한번씩 렌더링
    swcMinify: true, // Terser와 비슷한 역할 : 필요없는 공백이나 주석을 삭제하여 용량 줄이고 스크립트를 해석할 수 없도록 암호화(Minification)
    // Minification : 스크립트 파일과 웹 페이지에 대한 코드를 최소화, 웹 로딩 시간 줄이고 속도와 접근성을 향상시키면서 UX를 향상
    // swcMinify : https://swc.rs/docs/configuration/minification#jscminifycompress
    // assetPrefix: "cdn주소", // 정적 자산을 커스텀 CDN, 특정경로에서 불러올때 사용하는 설정
    // // 정적파일 (이미지,CSS,JS)은 기본적으로 /public 폴더나 빌드된 경로에서 제공되지만 특정 경로나 CDN을 사용해야할 때 assetPrefix를 설정하면 다른 경로에서 불러올 수 있음
    // basePath: "/docs", // 애플리케이션에 대한 경로 접두사
    // a tag에 /myapp으로 가도록 설정했다면 => /docs/myapp으로 이동
    compress: true, // 서버 압축
    // next.js는 gzip을 사용하는데 커스텀 서버를 통해 압축이 이미 구성된 경우 false로 사용하지 않을 수 있음
    // 서버 압축이 구성되지 않은 경우 사용할 것을 권장
  };

  nextConfig.redirects = {
    // Redirect기능
    async redirects() {
      return [
        {
          source: "/aa", // 사용자가 방문한 페이지
          //   /blog/:path, /blog/:path*
          destination: "/", // 리다이렉트 시킬 페이지
          //   /new_blog/:path /new_blog/:path*
          //   => /blog/... => /new_blog/... 으로 이동
          permanent: true, // HTTP 응답코드 308(true),307(false) 선택
          // 307 : 임시적으로 해당페이지가 바뀌었으므로 브라우저에서 캐싱하지 않는다.
          // 308 : 영구적으로 해당 페이지가 바뀌었으므로 브라우저에서 캐싱이 가능하다.
          // 전통적으로 영구적 주소 변경은 301,302를 사용하나 HTTP 요청 메서드가 GET으로 변환되어 버리는 문제로 인해 307,308 사용
        },
      ];
    },
  };

  nextConfig.rewrites = {
    // Rewrites
    // 요청경로를 다른 목적지 경로로 매핑할 수 있게 해줌
    // URL 프록시처럼 동작 => proxy(대리) => 직접적인 연결을 대신 수행하는 역할
    async rewrites() {
      return [
        {
          source: "/api/movies", // 사용자가 접속한 페이지 , 사용자한테 보이는 URL 주소
          destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`, // 실제 접속하면 리다이렉트 되는 페이지
          //   .env에 저장 후 KEY값을 불러오게 되면 소스코드 상에서도 해당 API키를 확인할 수 없음
        },
      ];
    },
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    // 개발환경
  } else {
    // 배포환경
  }

  return nextConfig;
};
