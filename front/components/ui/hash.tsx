export default function HashTag(data: { title: string; type: number }) {
  // type
  // 1 : 카테고리
  // 2 : 태그
  return (
    <div
      className={`
        w-auto
        h-[20px]
        min-w-[60px]
        ${data.type === 1 ? "bg-[--mainPoint]" : "bg-[--main]"}

        ${data.type === 1 ? "text-[--black]" : "text-[--white]"}
        flex
        flex-col
        items-center
        justify-center
        text-center
        px-[5px]
        font-[700]
        text-[10px]
        rounded-[5px]
        mr-[5px]
        mb-[5px]
    `}
    >
      {data.title}
    </div>
  );
}
