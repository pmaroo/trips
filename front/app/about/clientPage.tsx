"use client";

import { Suspense, useContext, useState } from "react";
import { Theme } from "../../components/theme";

export default function ClientPage({ user }) {
  const [stat, setStat] = useState(user);

  const ThemeContext = useContext(Theme);

  return (
    <Suspense fallback={<p>로딩중</p>}>
      <h1 className="text-[13px] text-[13px] text-[13px] text-[13px] text-[13px]">
        {stat.name}
      </h1>
    </Suspense>
  );
}
// 서버 컴포넌트의 장점을 살리면서 클라이언트 컴포넌트를 사용하는 방법

// 1. "use client" 컴포넌트 통째로 명시 => 구조가 복잡해질 가능성
// 2. props로 넘겨주기 => 서버 컴포넌트와 클아이언트 컴포넌트의 경계가 모호해질 가능성
// 3. next/dynamic 사용 => 렌더링 및 최적화에 적합, 초기로딩이 지연될 수 있으나 React Suspense로 해결가능
