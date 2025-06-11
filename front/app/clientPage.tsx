"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Components from "@components/shadcn";
import Main from "@components/ui/main";
import Step1 from "@components/ui/main/step1";
import { useStepStore } from "@store/frontStore";
import Step2 from "@components/ui/main/step2";
import Step3 from "@components/ui/main/step3";
import Step4 from "@components/ui/main/step4";
import Step5 from "@components/ui/main/step5";
import Step6 from "@components/ui/main/step6";
import useDeviceSize from "@hooks/useDeviceSize";
import { useMeState } from "@store/commonStore";
import { useKakaoStore } from "@store/loginStore";
import { ChevronLeft } from "lucide-react";
import { CategoryDTO } from "@/types/category";
import Step7 from "@components/ui/main/step7";
import { usePlanStore } from "@store/planStore";
import { useCreatePlan } from "@hooks/reactQuery/usePlan";

export default function ClientPage({
  categoryData,
}: {
  categoryData: CategoryDTO[];
}) {
  const { Progress } = Components;
  //////////////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////////////
  const hasRun = useRef(false); // 배포할땐 제거

  const [isStart, setIsStart] = useState<boolean>(false);

  //////////////////////////////////////////////////////////////
  // HOOK
  //////////////////////////////////////////////////////////////
  const { isDesktop, isTablet, isMobile } = useDeviceSize();

  //////////////////////////////////////////////////////////////
  // STORE
  //////////////////////////////////////////////////////////////

  const stepStore = useStepStore();

  //////////////////////////////////////////////////////////////
  // FORM
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  // USEEFFECT
  //////////////////////////////////////////////////////////////

  const createPlan = useCreatePlan(() => {});

  //////////////////////////////////////////////////////////////
  // TOGGLE
  //////////////////////////////////////////////////////////////

  const startToggle = () => {
    setIsStart(!isStart);
  };

  //////////////////////////////////////////////////////////////
  // HANDLER
  //////////////////////////////////////////////////////////////

  const backHandler = () => {
    if (stepStore.step - 1 >= 0) {
      stepStore.setStep(stepStore.step - 1);
    }
  };

  //////////////////////////////////////////////////////////////
  //  TABLE
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////

  const regionList = [
    {
      name: "서울특별시",
      cities: [
        { name: "강남구", lat: 37.5172, lng: 127.0473, radius: 19777 },
        { name: "강동구", lat: 37.5301, lng: 127.1238, radius: 12290 },
        { name: "강북구", lat: 37.6396, lng: 127.0257, radius: 11800 },
        { name: "강서구", lat: 37.5509, lng: 126.8495, radius: 20720 },
        { name: "관악구", lat: 37.4781, lng: 126.9516, radius: 14785 },
        { name: "광진구", lat: 37.5384, lng: 127.0823, radius: 8530 },
        { name: "구로구", lat: 37.4955, lng: 126.8878, radius: 10055 },
        { name: "금천구", lat: 37.4569, lng: 126.8958, radius: 6510 },
        { name: "노원구", lat: 37.6543, lng: 127.0568, radius: 17600 },
        { name: "도봉구", lat: 37.6688, lng: 127.0471, radius: 10400 },
        { name: "동대문구", lat: 37.5744, lng: 127.0396, radius: 7110 },
        { name: "동작구", lat: 37.5124, lng: 126.9398, radius: 8175 },
        { name: "마포구", lat: 37.5638, lng: 126.9084, radius: 11935 },
        { name: "서대문구", lat: 37.5791, lng: 126.9368, radius: 8815 },
        { name: "서초구", lat: 37.4836, lng: 127.0326, radius: 23500 },
        { name: "성동구", lat: 37.5633, lng: 127.0364, radius: 8470 },
        { name: "성북구", lat: 37.5894, lng: 127.0167, radius: 12285 },
        { name: "송파구", lat: 37.5145, lng: 127.1059, radius: 16945 },
        { name: "양천구", lat: 37.5169, lng: 126.8664, radius: 8705 },
        { name: "영등포구", lat: 37.5264, lng: 126.8963, radius: 12285 },
        { name: "용산구", lat: 37.5326, lng: 126.9903, radius: 10935 },
        { name: "은평구", lat: 37.6176, lng: 126.9227, radius: 14850 },
        { name: "종로구", lat: 37.5735, lng: 126.979, radius: 11982 },
        { name: "중구", lat: 37.5636, lng: 126.997, radius: 4980 },
        { name: "중랑구", lat: 37.6063, lng: 127.0927, radius: 9250 },
      ],
    },
    {
      name: "부산광역시",
      cities: [
        { name: "강서구", lat: 35.2123, lng: 128.9805, radius: 102910 },
        { name: "금정구", lat: 35.2428, lng: 129.0926, radius: 110140 },
        { name: "기장군", lat: 35.2442, lng: 129.222, radius: 165505 },
        { name: "남구", lat: 35.1365, lng: 129.0846, radius: 6990 },
        { name: "동구", lat: 35.1294, lng: 129.0457, radius: 5300 },
        { name: "동래구", lat: 35.2058, lng: 129.0834, radius: 11500 },
        { name: "부산진구", lat: 35.1624, lng: 129.053, radius: 4885 },
        { name: "북구", lat: 35.197, lng: 129.0346, radius: 9950 },
        { name: "사상구", lat: 35.1535, lng: 128.9901, radius: 8140 },
        { name: "사하구", lat: 35.104, lng: 128.9742, radius: 8180 },
        { name: "서구", lat: 35.097, lng: 129.0247, radius: 4100 },
        { name: "수영구", lat: 35.1459, lng: 129.1135, radius: 5425 },
        { name: "연제구", lat: 35.1766, lng: 129.0797, radius: 6900 },
        { name: "영도구", lat: 35.0911, lng: 129.0685, radius: 7075 },
        { name: "중구", lat: 35.1065, lng: 129.0323, radius: 1400 },
        { name: "해운대구", lat: 35.1631, lng: 129.1635, radius: 36095 },
      ],
    },
    {
      name: "대구광역시",
      cities: [
        { name: "남구", lat: 35.8416, lng: 128.6062, radius: 9570 },
        { name: "달서구", lat: 35.8291, lng: 128.5328, radius: 126505 },
        { name: "달성군", lat: 35.7743, lng: 128.4311, radius: 853350 },
        { name: "동구", lat: 35.8866, lng: 128.6305, radius: 364300 },
        { name: "북구", lat: 35.8854, lng: 128.5825, radius: 46990 },
        { name: "서구", lat: 35.8703, lng: 128.556, radius: 8665 },
        { name: "수성구", lat: 35.858, lng: 128.63, radius: 38230 },
        { name: "중구", lat: 35.8694, lng: 128.606, radius: 3540 },
      ],
    },
    {
      name: "인천광역시",
      cities: [
        { name: "강화군", lat: 37.74777, lng: 126.48503, radius: 9800 },
        { name: "계양구", lat: 37.53249, lng: 126.73642, radius: 3800 },
        { name: "남동구", lat: 37.44081, lng: 126.72691, radius: 4900 },
        { name: "동구", lat: 37.47442, lng: 126.62151, radius: 1500 },
        { name: "미추홀구", lat: 37.45699, lng: 126.66836, radius: 3000 },
        { name: "부평구", lat: 37.48939, lng: 126.72189, radius: 4100 },
        { name: "서구", lat: 37.55281, lng: 126.65534, radius: 4000 },
        { name: "연수구", lat: 37.40879, lng: 126.70378, radius: 3900 },
        { name: "옹진군", lat: 37.22622, lng: 126.37083, radius: 9800 },
        { name: "중구", lat: 37.47615, lng: 126.62191, radius: 1800 },
      ],
    },
    {
      name: "광주광역시",
      cities: [
        { name: "광산구", lat: 35.18561, lng: 126.78412, radius: 9400 },
        { name: "남구", lat: 35.12645, lng: 126.88882, radius: 3900 },
        { name: "동구", lat: 35.14539, lng: 126.92276, radius: 3000 },
        { name: "북구", lat: 35.18671, lng: 126.91162, radius: 4900 },
        { name: "서구", lat: 35.14223, lng: 126.87636, radius: 5400 },
      ],
    },
    {
      name: "대전광역시",
      cities: [
        { name: "대덕구", lat: 36.35088, lng: 127.45488, radius: 6600 },
        { name: "동구", lat: 36.32082, lng: 127.45546, radius: 4100 },
        { name: "서구", lat: 36.33839, lng: 127.39245, radius: 4200 },
        { name: "유성구", lat: 36.36316, lng: 127.33897, radius: 7600 },
        { name: "중구", lat: 36.32112, lng: 127.38157, radius: 4000 },
      ],
    },
    {
      name: "울산광역시",
      cities: [
        { name: "남구", lat: 35.53931, lng: 129.33223, radius: 4800 },
        { name: "동구", lat: 35.55706, lng: 129.42374, radius: 3400 },
        { name: "북구", lat: 35.57401, lng: 129.36091, radius: 4300 },
        { name: "울주군", lat: 35.52664, lng: 129.23939, radius: 17400 },
        { name: "중구", lat: 35.56593, lng: 129.31621, radius: 3300 },
      ],
    },
    {
      name: "세종특별자치시",
      cities: [
        { name: "세종시", lat: 36.48006, lng: 127.28958, radius: 12200 },
      ],
    },
    {
      name: "경기도",
      cities: [
        { name: "가평군", lat: 37.8315, lng: 127.51, radius: 16400 },
        { name: "고양시", lat: 37.6584, lng: 126.832, radius: 9500 },
        { name: "과천시", lat: 37.4292, lng: 126.989, radius: 3300 },
        { name: "광명시", lat: 37.4784, lng: 126.866, radius: 3400 },
        { name: "광주시", lat: 37.4293, lng: 127.255, radius: 11700 },
        { name: "구리시", lat: 37.5943, lng: 127.129, radius: 3300 },
        { name: "군포시", lat: 37.3615, lng: 126.935, radius: 3300 },
        { name: "김포시", lat: 37.6152, lng: 126.715, radius: 9400 },
        { name: "남양주시", lat: 37.6365, lng: 127.2165, radius: 12100 },
        { name: "동두천시", lat: 37.9034, lng: 127.0601, radius: 5500 },
        { name: "부천시", lat: 37.5034, lng: 126.766, radius: 4100 },
        { name: "성남시", lat: 37.4202, lng: 127.1268, radius: 6700 },
        { name: "수원시", lat: 37.2636, lng: 127.0286, radius: 6200 },
        { name: "시흥시", lat: 37.3804, lng: 126.805, radius: 6500 },
        { name: "안산시", lat: 37.3219, lng: 126.8309, radius: 6900 },
        { name: "안성시", lat: 37.0106, lng: 127.2697, radius: 14900 },
        { name: "안양시", lat: 37.3943, lng: 126.9568, radius: 4300 },
        { name: "양주시", lat: 37.7854, lng: 127.045, radius: 9700 },
        { name: "양평군", lat: 37.4917, lng: 127.4871, radius: 16700 },
        { name: "여주시", lat: 37.2952, lng: 127.6371, radius: 14600 },
        { name: "연천군", lat: 38.098, lng: 127.075, radius: 15300 },
        { name: "오산시", lat: 37.1452, lng: 127.0662, radius: 4100 },
        { name: "용인시", lat: 37.2411, lng: 127.1776, radius: 13700 },
        { name: "의왕시", lat: 37.3451, lng: 126.978, radius: 4400 },
        { name: "의정부시", lat: 37.7381, lng: 127.0335, radius: 5100 },
        { name: "이천시", lat: 37.2726, lng: 127.4345, radius: 13700 },
        { name: "파주시", lat: 37.7599, lng: 126.7802, radius: 10500 },
        { name: "평택시", lat: 36.9946, lng: 127.0885, radius: 11400 },
        { name: "포천시", lat: 37.8947, lng: 127.2005, radius: 13200 },
        { name: "하남시", lat: 37.5393, lng: 127.2145, radius: 4700 },
        { name: "화성시", lat: 37.1995, lng: 126.8311, radius: 13500 },
      ],
    },
    {
      name: "강원도",
      cities: [
        { name: "강릉시", lat: 37.7519, lng: 128.8761, radius: 5000 },
        { name: "고성군", lat: 38.3808, lng: 128.467, radius: 9800 },
        { name: "동해시", lat: 37.5248, lng: 129.1144, radius: 5100 },
        { name: "삼척시", lat: 37.4499, lng: 129.1653, radius: 5100 },
        { name: "속초시", lat: 38.2044, lng: 128.5912, radius: 5100 },
        { name: "양구군", lat: 38.105, lng: 127.9892, radius: 11600 },
        { name: "양양군", lat: 38.0755, lng: 128.6202, radius: 8700 },
        { name: "영월군", lat: 37.1836, lng: 128.4617, radius: 12500 },
        { name: "원주시", lat: 37.3422, lng: 127.9201, radius: 6400 },
        { name: "인제군", lat: 38.0698, lng: 128.1705, radius: 11600 },
        { name: "정선군", lat: 37.3804, lng: 128.6606, radius: 11300 },
        { name: "철원군", lat: 38.146, lng: 127.313, radius: 9700 },
        { name: "춘천시", lat: 37.8813, lng: 127.7298, radius: 5400 },
        { name: "태백시", lat: 37.164, lng: 128.9856, radius: 5100 },
        { name: "평창군", lat: 37.3704, lng: 128.3891, radius: 12400 },
        { name: "홍천군", lat: 37.691, lng: 127.888, radius: 14300 },
        { name: "화천군", lat: 38.105, lng: 127.708, radius: 8500 },
        { name: "횡성군", lat: 37.4916, lng: 127.984, radius: 8300 },
      ],
    },
    {
      name: "충청북도",
      cities: [
        { name: "괴산군", lat: 36.813, lng: 127.792, radius: 9800 },
        { name: "단양군", lat: 36.984, lng: 128.365, radius: 8500 },
        { name: "보은군", lat: 36.489, lng: 127.729, radius: 8200 },
        { name: "영동군", lat: 36.175, lng: 127.775, radius: 7900 },
        { name: "옥천군", lat: 36.306, lng: 127.571, radius: 8000 },
        { name: "음성군", lat: 36.94, lng: 127.69, radius: 8600 },
        { name: "제천시", lat: 37.132, lng: 128.19, radius: 5100 },
        { name: "증평군", lat: 36.785, lng: 127.584, radius: 5600 },
        { name: "진천군", lat: 36.855, lng: 127.435, radius: 5600 },
        { name: "청주시", lat: 36.6424, lng: 127.489, radius: 5800 },
        { name: "충주시", lat: 37.01, lng: 127.929, radius: 7100 },
      ],
    },
    {
      name: "충청남도",
      cities: [
        { name: "계룡시", lat: 36.274, lng: 127.248, radius: 4500 },
        { name: "공주시", lat: 36.446, lng: 127.119, radius: 13400 },
        { name: "금산군", lat: 36.108, lng: 127.488, radius: 13000 },
        { name: "논산시", lat: 36.187, lng: 127.098, radius: 7700 },
        { name: "당진시", lat: 36.893, lng: 126.629, radius: 10100 },
        { name: "보령시", lat: 36.349, lng: 126.597, radius: 14300 },
        { name: "부여군", lat: 36.273, lng: 126.909, radius: 15400 },
        { name: "서산시", lat: 36.784, lng: 126.45, radius: 9400 },
        { name: "서천군", lat: 36.078, lng: 126.691, radius: 14100 },
        { name: "아산시", lat: 36.792, lng: 127.003, radius: 12700 },
        { name: "예산군", lat: 36.682, lng: 126.848, radius: 13400 },
        { name: "천안시", lat: 36.815, lng: 127.113, radius: 11300 },
        { name: "청양군", lat: 36.454, lng: 126.804, radius: 11200 },
        { name: "태안군", lat: 36.745, lng: 126.297, radius: 18900 },
        { name: "홍성군", lat: 36.601, lng: 126.66, radius: 15700 },
      ],
    },
    {
      name: "전라북도",
      cities: [
        { name: "고창군", lat: 35.435, lng: 126.701, radius: 13880 },
        { name: "군산시", lat: 35.967, lng: 126.736, radius: 11200 },
        { name: "김제시", lat: 35.803, lng: 126.888, radius: 13170 },
        { name: "남원시", lat: 35.416, lng: 127.385, radius: 15490 },
        { name: "무주군", lat: 36.006, lng: 127.661, radius: 14180 },
        { name: "부안군", lat: 35.728, lng: 126.733, radius: 12530 },
        { name: "순창군", lat: 35.374, lng: 127.137, radius: 12560 },
        { name: "완주군", lat: 35.936, lng: 127.166, radius: 16090 },
        { name: "익산시", lat: 35.948, lng: 126.957, radius: 12700 },
        { name: "임실군", lat: 35.613, lng: 127.289, radius: 13780 },
        { name: "장수군", lat: 35.647, lng: 127.521, radius: 13030 },
        { name: "전주시", lat: 35.824, lng: 127.148, radius: 8090 },
        { name: "정읍시", lat: 35.569, lng: 126.855, radius: 14850 },
        { name: "진안군", lat: 35.791, lng: 127.424, radius: 15850 },
      ],
    },
    {
      name: "전라남도",
      cities: [
        { name: "강진군", lat: 34.642, lng: 126.765, radius: 12980 },
        { name: "고흥군", lat: 34.607, lng: 127.284, radius: 14000 },
        { name: "곡성군", lat: 35.281, lng: 127.29, radius: 12110 },
        { name: "광양시", lat: 34.94, lng: 127.695, radius: 10330 },
        { name: "구례군", lat: 35.203, lng: 127.462, radius: 12130 },
        { name: "나주시", lat: 35.015, lng: 126.712, radius: 15110 },
        { name: "담양군", lat: 35.321, lng: 126.987, radius: 11940 },
        { name: "목포시", lat: 34.811, lng: 126.392, radius: 9790 },
        { name: "무안군", lat: 34.99, lng: 126.476, radius: 12100 },
        { name: "보성군", lat: 34.774, lng: 127.08, radius: 11480 },
        { name: "순천시", lat: 34.95, lng: 127.487, radius: 12990 },
        { name: "신안군", lat: 34.829, lng: 126.108, radius: 18770 },
        { name: "여수시", lat: 34.76, lng: 127.662, radius: 10180 },
        { name: "영광군", lat: 35.277, lng: 126.509, radius: 12710 },
        { name: "영암군", lat: 34.799, lng: 126.698, radius: 11090 },
        { name: "완도군", lat: 34.311, lng: 126.755, radius: 11320 },
        { name: "장성군", lat: 35.301, lng: 126.785, radius: 12470 },
        { name: "장흥군", lat: 34.682, lng: 126.907, radius: 11060 },
        { name: "진도군", lat: 34.485, lng: 126.263, radius: 11020 },
        { name: "함평군", lat: 35.065, lng: 126.519, radius: 11040 },
        { name: "해남군", lat: 34.573, lng: 126.598, radius: 11030 },
        { name: "화순군", lat: 35.063, lng: 127.006, radius: 12060 },
      ],
    },
    {
      name: "경상북도",
      cities: [
        { name: "경산시", lat: 35.825, lng: 128.741, radius: 10970 },
        { name: "경주시", lat: 35.856, lng: 129.224, radius: 19600 },
        { name: "고령군", lat: 35.727, lng: 128.265, radius: 12150 },
        { name: "구미시", lat: 36.119, lng: 128.3448, radius: 15620 },
        { name: "김천시", lat: 36.1398, lng: 128.1136, radius: 13100 },
        { name: "문경시", lat: 36.5865, lng: 128.1874, radius: 17420 },
        { name: "봉화군", lat: 36.8933, lng: 128.7328, radius: 13570 },
        { name: "상주시", lat: 36.41, lng: 128.1595, radius: 19100 },
        { name: "성주군", lat: 35.9194, lng: 128.2822, radius: 12070 },
        { name: "안동시", lat: 36.5684, lng: 128.7294, radius: 14590 },
        { name: "영덕군", lat: 36.415, lng: 129.365, radius: 14450 },
        { name: "영양군", lat: 36.6644, lng: 129.105, radius: 13640 },
        { name: "영주시", lat: 36.8057, lng: 128.6246, radius: 15710 },
        { name: "영천시", lat: 35.9733, lng: 128.9402, radius: 10960 },
        { name: "예천군", lat: 36.655, lng: 128.4525, radius: 13600 },
        { name: "울릉군", lat: 37.4847, lng: 130.905, radius: 10280 },
        { name: "울진군", lat: 36.9933, lng: 129.4, radius: 13220 },
        { name: "의성군", lat: 36.3522, lng: 128.6975, radius: 14080 },
        { name: "청도군", lat: 35.6475, lng: 128.7361, radius: 11130 },
        { name: "청송군", lat: 36.435, lng: 129.0572, radius: 13260 },
        { name: "칠곡군", lat: 35.995, lng: 128.4011, radius: 11320 },
      ],
    },
    {
      name: "경상남도",
      cities: [
        { name: "창원시", lat: 35.2271, lng: 128.6811, radius: 14990 },
        { name: "진주시", lat: 35.1803, lng: 128.1076, radius: 15990 },
        { name: "통영시", lat: 34.8544, lng: 128.4331, radius: 10200 },
        { name: "사천시", lat: 35.0031, lng: 128.0647, radius: 11030 },
        { name: "김해시", lat: 35.2281, lng: 128.8894, radius: 12920 },
        { name: "밀양시", lat: 35.5031, lng: 128.7486, radius: 12160 },
        { name: "거제시", lat: 34.8806, lng: 128.6217, radius: 13860 },
        { name: "양산시", lat: 35.335, lng: 129.0372, radius: 9420 },
        { name: "의령군", lat: 35.3192, lng: 128.2614, radius: 9490 },
        { name: "함안군", lat: 35.2722, lng: 128.4061, radius: 11510 },
        { name: "창녕군", lat: 35.5439, lng: 128.4958, radius: 14310 },
        { name: "고성군", lat: 34.9736, lng: 128.3225, radius: 11080 },
        { name: "남해군", lat: 34.8375, lng: 127.8947, radius: 9610 },
        { name: "하동군", lat: 35.0675, lng: 127.7511, radius: 14280 },
        { name: "산청군", lat: 35.415, lng: 127.8739, radius: 10420 },
        { name: "함양군", lat: 35.5206, lng: 127.725, radius: 12620 },
        { name: "거창군", lat: 35.6861, lng: 127.9092, radius: 13920 },
        { name: "합천군", lat: 35.5667, lng: 128.1656, radius: 13240 },
      ],
    },
    {
      name: "제주특별자치도",
      cities: [
        { name: "제주시", lat: 33.4996, lng: 126.5312, radius: 18920 },
        { name: "서귀포시", lat: 33.253, lng: 126.5618, radius: 16670 },
      ],
    },
  ];

  return (
    <>
      {/* 시작화면 */}
      <Main isStart={isStart} startToggle={startToggle} />

      <article
        className="flex flex-col items-center justify-center w-screen h-screen "
      >
        <div
          className="
            w-full
            fixed
            top-0
            left-0
            p-[10px]
            z-[9]
          "
        >
          <Progress
            value={stepStore.step * (100 / 6)}
            className="
              mb-[10px]
            "
          />

          <ul
            className="flex flex-row items-center justify-start "
          >
            <motion.li
              initial={{ x: 0 }}
              whileHover={{
                x: 10,
                transition: {
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
              className="cursor-pointer "
              onClick={backHandler}
            >
              <ChevronLeft />
            </motion.li>
          </ul>
        </div>
        <ul
          className="
            flex
            flex-row
            items-center
            justify-center
            relative
            size-full
            bg-[hsl(var(--background))]
          "
        >
          <motion.li
            className="
              flex
              flex-col
              items-center
              justify-center
              w-full
              h-full
              p-[20px]
              sm:w-[1000px]
              sm:p-[100px]
            "
          >
            {stepStore.step === 0 && <Step1 regionList={regionList} />}
            {stepStore.step === 1 && <Step7 />}
            {stepStore.step === 2 && <Step2 categorys={categoryData} />}
            {stepStore.step === 3 && <Step3 />}
            {stepStore.step === 4 && <Step4 />}
            {stepStore.step === 5 && <Step5 />}
            {stepStore.step === 6 && <Step6 />}
          </motion.li>
        </ul>
      </article>
    </>
  );
}
