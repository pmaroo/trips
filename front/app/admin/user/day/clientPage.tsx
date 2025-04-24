"use client";

import Components, { ChartConfig } from "@app/components/ui/shadcn";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

export default function ClientPage() {
  const {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } = Components;

  const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
    { month: "June", desktop: 214 },
  ];
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <>
      <article
        className="
          flex
          flex-col
          items-center
          justify-center
          w-[100%]
          h-[80%]
        "
      >
        <div
          className="
            w-[100%]
            h-[100%]
          "
        >
          <Card
            className="
              box-border
              size-full
            "
          >
            <CardHeader>
              <CardTitle>방문자통계</CardTitle>
              <CardDescription>
                2025년 1월 10일 ~ 2025년 1월 17일
              </CardDescription>
            </CardHeader>
            <CardFooter
              className="
                flex
                flex-col
                items-start
                justify-center
              "
            >
              <p
                className="
                  text-[15px]
                  text-[var(--muted-foreground)]
                "
              >
                오늘의 방문자
              </p>
              <h2
                className="
                  text-[#000]
                  font-[900]
                  text-[30px]
                "
              >
                +2350
              </h2>
            </CardFooter>
            <CardContent
              style={{
                height: `auto`,
                padding: 0,
              }}
            >
              <ChartContainer config={chartConfig}>
                <BarChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    top: 20,
                  }}
                  style={{
                    height: `70%`,
                    width: `100%`,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                    wrapperStyle={{
                      background: `#fff`,
                      borderRadius: `10px`,
                    }}
                  />
                  <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                    <LabelList
                      position="top"
                      offset={12}
                      className="
                        fill-foreground
                      "
                      fontSize={12}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </article>
    </>
  );
}
