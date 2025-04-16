import { Button } from "@app/components/ui/shadcn/button";

export default function Footer() {
  return (
    <div className="flex items-center justify-center">
      <Button className="p-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
        Footer
      </Button>
    </div>
  );
}
// 주의점
// app은 서버에서 렌더링 되는 서버 컴포넌트이기 때문에
// react hook 사용시 "use client"로 클라이언트 컴포넌트로 명시해야 사용 가능

// pages를 사용하지 않고 app 을 사용하는 이유
// 1. 서버 컴포넌트 기본적용
// 서버 컴포넌트이기 때문에 불필요한 js가 클라이언트에 전달되는걸 방지하고 결과만 클라이언트로 보내기때문에 렌더링 성능이 좋아짐
