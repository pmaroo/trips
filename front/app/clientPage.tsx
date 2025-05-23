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

  const data = {
    CategoryId: 8,
    category: "커플여행",
    destination: {
      name: "부산광역시",
      lat: 35.1631,
      lng: 129.1635,
    },
    start: {
      name: "대전 동구 삼성동 346-3",
      lat: 127,
      lng: 36,
    },
    budget: 100000,
    traffic: "차량",
  };

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    if (createPlan) {
      createPlan.mutate(data);
      console.log("여러번찍히면안됨;");
    }
  }, []);

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
        { name: "강남구", lat: 37.5172, lng: 127.0473 },
        { name: "강동구", lat: 37.5301, lng: 127.1238 },
        { name: "강북구", lat: 37.6396, lng: 127.0257 },
        { name: "강서구", lat: 37.5509, lng: 126.8495 },
        { name: "관악구", lat: 37.4781, lng: 126.9516 },
        { name: "광진구", lat: 37.5384, lng: 127.0823 },
        { name: "구로구", lat: 37.4955, lng: 126.8878 },
        { name: "금천구", lat: 37.4569, lng: 126.8958 },
        { name: "노원구", lat: 37.6543, lng: 127.0568 },
        { name: "도봉구", lat: 37.6688, lng: 127.0471 },
        { name: "동대문구", lat: 37.5744, lng: 127.0396 },
        { name: "동작구", lat: 37.5124, lng: 126.9398 },
        { name: "마포구", lat: 37.5638, lng: 126.9084 },
        { name: "서대문구", lat: 37.5791, lng: 126.9368 },
        { name: "서초구", lat: 37.4836, lng: 127.0326 },
        { name: "성동구", lat: 37.5633, lng: 127.0364 },
        { name: "성북구", lat: 37.5894, lng: 127.0167 },
        { name: "송파구", lat: 37.5145, lng: 127.1059 },
        { name: "양천구", lat: 37.5169, lng: 126.8664 },
        { name: "영등포구", lat: 37.5264, lng: 126.8963 },
        { name: "용산구", lat: 37.5326, lng: 126.9903 },
        { name: "은평구", lat: 37.6176, lng: 126.9227 },
        { name: "종로구", lat: 37.5735, lng: 126.979 },
        { name: "중구", lat: 37.5636, lng: 126.997 },
        { name: "중랑구", lat: 37.6063, lng: 127.0927 },
      ],
    },
    {
      name: "부산광역시",
      cities: [
        { name: "강서구", lat: 35.2123, lng: 128.9805 },
        { name: "금정구", lat: 35.2428, lng: 129.0926 },
        { name: "기장군", lat: 35.2442, lng: 129.222 },
        { name: "남구", lat: 35.1365, lng: 129.0846 },
        { name: "동구", lat: 35.1294, lng: 129.0457 },
        { name: "동래구", lat: 35.2058, lng: 129.0834 },
        { name: "부산진구", lat: 35.1624, lng: 129.053 },
        { name: "북구", lat: 35.197, lng: 129.0346 },
        { name: "사상구", lat: 35.1535, lng: 128.9901 },
        { name: "사하구", lat: 35.104, lng: 128.9742 },
        { name: "서구", lat: 35.097, lng: 129.0247 },
        { name: "수영구", lat: 35.1459, lng: 129.1135 },
        { name: "연제구", lat: 35.1766, lng: 129.0797 },
        { name: "영도구", lat: 35.0911, lng: 129.0685 },
        { name: "중구", lat: 35.1065, lng: 129.0323 },
        { name: "해운대구", lat: 35.1631, lng: 129.1635 },
      ],
    },
    {
      name: "대구광역시",
      cities: [
        { name: "남구", lat: 35.8416, lng: 128.6062 },
        { name: "달서구", lat: 35.8291, lng: 128.5328 },
        { name: "달성군", lat: 35.7743, lng: 128.4311 },
        { name: "동구", lat: 35.8866, lng: 128.6305 },
        { name: "북구", lat: 35.8854, lng: 128.5825 },
        { name: "서구", lat: 35.8703, lng: 128.556 },
        { name: "수성구", lat: 35.858, lng: 128.63 },
        { name: "중구", lat: 35.8694, lng: 128.606 },
      ],
    },
    {
      name: "인천광역시",
      cities: [
        { name: "강화군", lat: 37.7465, lng: 126.487 },
        { name: "계양구", lat: 37.5384, lng: 126.7361 },
        { name: "남동구", lat: 37.447, lng: 126.7316 },
        { name: "동구", lat: 37.4752, lng: 126.6321 },
        { name: "미추홀구", lat: 37.4639, lng: 126.65 },
        { name: "부평구", lat: 37.5083, lng: 126.7218 },
        { name: "서구", lat: 37.5454, lng: 126.676 },
        { name: "연수구", lat: 37.4103, lng: 126.6788 },
        { name: "옹진군", lat: 37.222, lng: 126.527 },
        { name: "중구", lat: 37.4736, lng: 126.621 },
      ],
    },
    {
      name: "광주광역시",
      cities: [
        { name: "광산구", lat: 35.139, lng: 126.793 },
        { name: "남구", lat: 35.133, lng: 126.902 },
        { name: "동구", lat: 35.146, lng: 126.923 },
        { name: "북구", lat: 35.174, lng: 126.911 },
        { name: "서구", lat: 35.154, lng: 126.89 },
      ],
    },
    {
      name: "대전광역시",
      cities: [
        { name: "대덕구", lat: 36.373, lng: 127.434 },
        { name: "동구", lat: 36.328, lng: 127.454 },
        { name: "서구", lat: 36.355, lng: 127.384 },
        { name: "유성구", lat: 36.362, lng: 127.356 },
        { name: "중구", lat: 36.325, lng: 127.427 },
      ],
    },
    {
      name: "울산광역시",
      cities: [
        { name: "남구", lat: 35.538, lng: 129.311 },
        { name: "동구", lat: 35.504, lng: 129.419 },
        { name: "북구", lat: 35.582, lng: 129.36 },
        { name: "울주군", lat: 35.552, lng: 129.216 },
        { name: "중구", lat: 35.566, lng: 129.316 },
      ],
    },
    {
      name: "세종특별자치시",
      cities: [{ name: "세종시", lat: 36.48, lng: 127.289 }],
    },
    {
      name: "경기도",
      cities: [
        { name: "가평군", lat: 37.8315, lng: 127.51 },
        { name: "고양시", lat: 37.6584, lng: 126.832 },
        { name: "과천시", lat: 37.4292, lng: 126.989 },
        { name: "광명시", lat: 37.4784, lng: 126.866 },
        { name: "광주시", lat: 37.4293, lng: 127.255 },
        { name: "구리시", lat: 37.5943, lng: 127.129 },
        { name: "군포시", lat: 37.3615, lng: 126.935 },
        { name: "김포시", lat: 37.6152, lng: 126.715 },
        { name: "남양주시", lat: 37.6365, lng: 127.2165 },
        { name: "동두천시", lat: 37.9034, lng: 127.0601 },
        { name: "부천시", lat: 37.5034, lng: 126.766 },
        { name: "성남시", lat: 37.4202, lng: 127.1268 },
        { name: "수원시", lat: 37.2636, lng: 127.0286 },
        { name: "시흥시", lat: 37.3804, lng: 126.805 },
        { name: "안산시", lat: 37.3219, lng: 126.8309 },
        { name: "안성시", lat: 37.0106, lng: 127.2697 },
        { name: "안양시", lat: 37.3943, lng: 126.9568 },
        { name: "양주시", lat: 37.7854, lng: 127.045 },
        { name: "양평군", lat: 37.4917, lng: 127.4871 },
        { name: "여주시", lat: 37.2952, lng: 127.6371 },
        { name: "연천군", lat: 38.098, lng: 127.075 },
        { name: "오산시", lat: 37.1452, lng: 127.0662 },
        { name: "용인시", lat: 37.2411, lng: 127.1776 },
        { name: "의왕시", lat: 37.3451, lng: 126.978 },
        { name: "의정부시", lat: 37.7381, lng: 127.0335 },
        { name: "이천시", lat: 37.2726, lng: 127.4345 },
        { name: "파주시", lat: 37.7599, lng: 126.7802 },
        { name: "평택시", lat: 36.9946, lng: 127.0885 },
        { name: "포천시", lat: 37.8947, lng: 127.2005 },
        { name: "하남시", lat: 37.5393, lng: 127.2145 },
        { name: "화성시", lat: 37.1995, lng: 126.8311 },
      ],
    },

    {
      name: "강원도",
      cities: [
        { name: "강릉시", lat: 37.7519, lng: 128.8761 },
        { name: "고성군", lat: 38.3808, lng: 128.467 },
        { name: "동해시", lat: 37.5248, lng: 129.1144 },
        { name: "삼척시", lat: 37.4499, lng: 129.1653 },
        { name: "속초시", lat: 38.2044, lng: 128.5912 },
        { name: "양구군", lat: 38.105, lng: 127.9892 },
        { name: "양양군", lat: 38.0755, lng: 128.6202 },
        { name: "영월군", lat: 37.1836, lng: 128.4617 },
        { name: "원주시", lat: 37.3422, lng: 127.9201 },
        { name: "인제군", lat: 38.0698, lng: 128.1705 },
        { name: "정선군", lat: 37.3804, lng: 128.6606 },
        { name: "철원군", lat: 38.146, lng: 127.313 },
        { name: "춘천시", lat: 37.8813, lng: 127.7298 },
        { name: "태백시", lat: 37.164, lng: 128.9856 },
        { name: "평창군", lat: 37.3704, lng: 128.3891 },
        { name: "홍천군", lat: 37.691, lng: 127.888 },
        { name: "화천군", lat: 38.105, lng: 127.708 },
        { name: "횡성군", lat: 37.4916, lng: 127.984 },
      ],
    },
    {
      name: "충청북도",
      cities: [
        { name: "괴산군", lat: 36.813, lng: 127.792 },
        { name: "단양군", lat: 36.984, lng: 128.365 },
        { name: "보은군", lat: 36.489, lng: 127.729 },
        { name: "영동군", lat: 36.175, lng: 127.775 },
        { name: "옥천군", lat: 36.306, lng: 127.571 },
        { name: "음성군", lat: 36.94, lng: 127.69 },
        { name: "제천시", lat: 37.132, lng: 128.19 },
        { name: "증평군", lat: 36.785, lng: 127.584 },
        { name: "진천군", lat: 36.855, lng: 127.435 },
        { name: "청주시", lat: 36.6424, lng: 127.489 },
        { name: "충주시", lat: 36.991, lng: 127.926 },
      ],
    },
    {
      name: "충청남도",
      cities: [
        { name: "계룡시", lat: 36.274, lng: 127.248 },
        { name: "공주시", lat: 36.446, lng: 127.119 },
        { name: "금산군", lat: 36.108, lng: 127.488 },
        { name: "논산시", lat: 36.187, lng: 127.098 },
        { name: "당진시", lat: 36.893, lng: 126.629 },
        { name: "보령시", lat: 36.349, lng: 126.597 },
        { name: "부여군", lat: 36.273, lng: 126.909 },
        { name: "서산시", lat: 36.784, lng: 126.45 },
        { name: "서천군", lat: 36.078, lng: 126.691 },
        { name: "아산시", lat: 36.792, lng: 127.003 },
        { name: "예산군", lat: 36.682, lng: 126.848 },
        { name: "천안시", lat: 36.815, lng: 127.113 },
        { name: "청양군", lat: 36.454, lng: 126.804 },
        { name: "태안군", lat: 36.745, lng: 126.297 },
        { name: "홍성군", lat: 36.601, lng: 126.66 },
      ],
    },
    {
      name: "전라북도",
      cities: [
        { name: "고창군", lat: 35.435, lng: 126.701 },
        { name: "군산시", lat: 35.967, lng: 126.736 },
        { name: "김제시", lat: 35.803, lng: 126.888 },
        { name: "남원시", lat: 35.416, lng: 127.385 },
        { name: "무주군", lat: 36.006, lng: 127.661 },
        { name: "부안군", lat: 35.728, lng: 126.733 },
        { name: "순창군", lat: 35.374, lng: 127.137 },
        { name: "완주군", lat: 35.936, lng: 127.166 },
        { name: "익산시", lat: 35.948, lng: 126.957 },
        { name: "임실군", lat: 35.613, lng: 127.289 },
        { name: "장수군", lat: 35.647, lng: 127.521 },
        { name: "전주시", lat: 35.824, lng: 127.148 },
        { name: "정읍시", lat: 35.569, lng: 126.855 },
        { name: "진안군", lat: 35.791, lng: 127.424 },
      ],
    },
    {
      name: "전라남도",
      cities: [
        { name: "강진군", lat: 34.642, lng: 126.765 },
        { name: "고흥군", lat: 34.607, lng: 127.284 },
        { name: "곡성군", lat: 35.281, lng: 127.29 },
        { name: "광양시", lat: 34.94, lng: 127.695 },
        { name: "구례군", lat: 35.203, lng: 127.462 },
        { name: "나주시", lat: 35.015, lng: 126.712 },
        { name: "담양군", lat: 35.321, lng: 126.987 },
        { name: "목포시", lat: 34.811, lng: 126.392 },
        { name: "무안군", lat: 34.99, lng: 126.476 },
        { name: "보성군", lat: 34.774, lng: 127.08 },
        { name: "순천시", lat: 34.95, lng: 127.487 },
        { name: "신안군", lat: 34.829, lng: 126.108 },
        { name: "여수시", lat: 34.76, lng: 127.662 },
        { name: "영광군", lat: 35.277, lng: 126.509 },
        { name: "영암군", lat: 34.799, lng: 126.698 },
        { name: "완도군", lat: 34.311, lng: 126.755 },
        { name: "장성군", lat: 35.301, lng: 126.785 },
        { name: "장흥군", lat: 34.682, lng: 126.907 },
        { name: "진도군", lat: 34.485, lng: 126.263 },
        { name: "함평군", lat: 35.065, lng: 126.519 },
        { name: "해남군", lat: 34.573, lng: 126.598 },
        { name: "화순군", lat: 35.063, lng: 127.006 },
      ],
    },
    {
      name: "경상북도",
      cities: [
        { name: "경산시", lat: 35.825, lng: 128.741 },
        { name: "경주시", lat: 35.856, lng: 129.224 },
        { name: "고령군", lat: 35.727, lng: 128.265 },
        { name: "구미시", lat: 36.119, lng: 128.3448 },
        { name: "김천시", lat: 36.1398, lng: 128.1136 },
        { name: "문경시", lat: 36.5865, lng: 128.1874 },
        { name: "봉화군", lat: 36.8933, lng: 128.7328 },
        { name: "상주시", lat: 36.41, lng: 128.1595 },
        { name: "성주군", lat: 35.9194, lng: 128.2822 },
        { name: "안동시", lat: 36.5684, lng: 128.7294 },
        { name: "영덕군", lat: 36.415, lng: 129.365 },
        { name: "영양군", lat: 36.6644, lng: 129.105 },
        { name: "영주시", lat: 36.8057, lng: 128.6246 },
        { name: "영천시", lat: 35.9733, lng: 128.9402 },
        { name: "예천군", lat: 36.655, lng: 128.4525 },
        { name: "울릉군", lat: 37.4847, lng: 130.905 },
        { name: "울진군", lat: 36.9933, lng: 129.4 },
        { name: "의성군", lat: 36.3522, lng: 128.6975 },
        { name: "청도군", lat: 35.6475, lng: 128.7361 },
        { name: "청송군", lat: 36.435, lng: 129.0572 },
        { name: "칠곡군", lat: 35.995, lng: 128.4011 },
      ],
    },
    {
      name: "강원특별자치도",
      cities: [
        { name: "강릉시", lat: 37.7519, lng: 128.8761 },
        { name: "고성군", lat: 38.3808, lng: 128.467 },
        { name: "동해시", lat: 37.5248, lng: 129.1144 },
        { name: "삼척시", lat: 37.4499, lng: 129.1653 },
        { name: "속초시", lat: 38.2044, lng: 128.5912 },
        { name: "양구군", lat: 38.105, lng: 127.9892 },
        { name: "양양군", lat: 38.0755, lng: 128.6202 },
        { name: "영월군", lat: 37.1836, lng: 128.4617 },
        { name: "원주시", lat: 37.3422, lng: 127.9201 },
        { name: "인제군", lat: 38.0698, lng: 128.1705 },
        { name: "정선군", lat: 37.3804, lng: 128.6606 },
        { name: "철원군", lat: 38.1462, lng: 127.3137 },
        { name: "춘천시", lat: 37.8813, lng: 127.7298 },
        { name: "태백시", lat: 37.1641, lng: 128.9856 },
        { name: "평창군", lat: 37.3704, lng: 128.3906 },
        { name: "홍천군", lat: 37.691, lng: 127.888 },
        { name: "화천군", lat: 38.1055, lng: 127.7065 },
        { name: "횡성군", lat: 37.4881, lng: 127.9854 },
      ],
    },
    {
      name: "충청북도",
      cities: [
        { name: "괴산군", lat: 36.8138, lng: 127.786 },
        { name: "단양군", lat: 36.9831, lng: 128.3652 },
        { name: "보은군", lat: 36.4895, lng: 127.7294 },
        { name: "영동군", lat: 36.1751, lng: 127.7764 },
        { name: "옥천군", lat: 36.3061, lng: 127.5711 },
        { name: "음성군", lat: 36.9407, lng: 127.6908 },
        { name: "제천시", lat: 37.1326, lng: 128.2022 },
        { name: "진천군", lat: 36.8525, lng: 127.4352 },
        { name: "청주시", lat: 36.6424, lng: 127.489 },
        { name: "충주시", lat: 36.991, lng: 127.925 },
        { name: "증평군", lat: 36.7852, lng: 127.5805 },
      ],
    },
    {
      name: "충청남도",
      cities: [
        { name: "계룡시", lat: 36.2746, lng: 127.2492 },
        { name: "공주시", lat: 36.4555, lng: 127.1246 },
        { name: "금산군", lat: 36.1086, lng: 127.4889 },
        { name: "논산시", lat: 36.1886, lng: 127.0985 },
        { name: "당진시", lat: 36.8941, lng: 126.6292 },
        { name: "보령시", lat: 36.3494, lng: 126.5952 },
        { name: "부여군", lat: 36.2764, lng: 126.9081 },
        { name: "서산시", lat: 36.7811, lng: 126.4504 },
        { name: "서천군", lat: 36.0786, lng: 126.6914 },
        { name: "아산시", lat: 36.7928, lng: 127.0019 },
        { name: "예산군", lat: 36.681, lng: 126.8486 },
        { name: "천안시", lat: 36.8151, lng: 127.1139 },
        { name: "청양군", lat: 36.4535, lng: 126.8041 },
        { name: "태안군", lat: 36.745, lng: 126.2981 },
        { name: "홍성군", lat: 36.6013, lng: 126.66 },
      ],
    },
    {
      name: "전라북도",
      cities: [
        { name: "전주시", lat: 35.8242, lng: 127.1489 },
        { name: "군산시", lat: 35.9672, lng: 126.7118 },
        { name: "익산시", lat: 35.9408, lng: 126.9543 },
        { name: "정읍시", lat: 35.5662, lng: 126.8514 },
        { name: "남원시", lat: 35.4173, lng: 127.3855 },
        { name: "김제시", lat: 35.8031, lng: 126.88 },
        { name: "완주군", lat: 35.9044, lng: 127.1661 },
        { name: "진안군", lat: 35.7917, lng: 127.4247 },
        { name: "무주군", lat: 36.0069, lng: 127.6603 },
        { name: "장수군", lat: 35.6478, lng: 127.5219 },
        { name: "임실군", lat: 35.6131, lng: 127.289 },
        { name: "순창군", lat: 35.3747, lng: 127.1371 },
        { name: "고창군", lat: 35.4358, lng: 126.7013 },
        { name: "부안군", lat: 35.7283, lng: 126.7314 },
      ],
    },
    {
      name: "전라남도",
      cities: [
        { name: "목포시", lat: 34.8118, lng: 126.3922 },
        { name: "여수시", lat: 34.7604, lng: 127.6622 },
        { name: "순천시", lat: 34.95, lng: 127.4875 },
        { name: "나주시", lat: 35.0156, lng: 126.7108 },
        { name: "광양시", lat: 34.94, lng: 127.6956 },
        { name: "담양군", lat: 35.3211, lng: 126.9875 },
        { name: "곡성군", lat: 35.2811, lng: 127.2908 },
        { name: "구례군", lat: 35.2031, lng: 127.4625 },
        { name: "고흥군", lat: 34.6075, lng: 127.2875 },
        { name: "보성군", lat: 34.7714, lng: 127.08 },
        { name: "화순군", lat: 35.0642, lng: 127.0069 },
        { name: "장흥군", lat: 34.685, lng: 126.9072 },
        { name: "강진군", lat: 34.6422, lng: 126.7675 },
        { name: "해남군", lat: 34.5747, lng: 126.5981 },
        { name: "영암군", lat: 34.8, lng: 126.6981 },
        { name: "무안군", lat: 34.9914, lng: 126.4769 },
        { name: "함평군", lat: 35.065, lng: 126.5161 },
        { name: "영광군", lat: 35.2778, lng: 126.5114 },
        { name: "장성군", lat: 35.3, lng: 126.7847 },
        { name: "완도군", lat: 34.3111, lng: 126.7558 },
        { name: "진도군", lat: 34.4844, lng: 126.2636 },
        { name: "신안군", lat: 34.83, lng: 126.1 },
      ],
    },
    {
      name: "경상북도",
      cities: [
        { name: "포항시", lat: 36.019, lng: 129.3435 },
        { name: "경주시", lat: 35.8562, lng: 129.2247 },
        { name: "김천시", lat: 36.1398, lng: 128.1136 },
        { name: "안동시", lat: 36.5684, lng: 128.7294 },
        { name: "구미시", lat: 36.1195, lng: 128.3448 },
        { name: "영주시", lat: 36.8057, lng: 128.6246 },
        { name: "영천시", lat: 35.9733, lng: 128.9402 },
        { name: "상주시", lat: 36.41, lng: 128.1595 },
        { name: "문경시", lat: 36.5865, lng: 128.1874 },
        { name: "경산시", lat: 35.8231, lng: 128.7378 },
        { name: "군위군", lat: 36.2391, lng: 128.5725 },
        { name: "의성군", lat: 36.3522, lng: 128.6975 },
        { name: "청송군", lat: 36.435, lng: 129.0572 },
        { name: "영양군", lat: 36.6644, lng: 129.105 },
        { name: "영덕군", lat: 36.415, lng: 129.365 },
        { name: "청도군", lat: 35.6475, lng: 128.7361 },
        { name: "고령군", lat: 35.7283, lng: 128.2625 },
        { name: "성주군", lat: 35.9194, lng: 128.2822 },
        { name: "칠곡군", lat: 35.995, lng: 128.4011 },
        { name: "예천군", lat: 36.655, lng: 128.4525 },
        { name: "봉화군", lat: 36.8933, lng: 128.7328 },
        { name: "울진군", lat: 36.9933, lng: 129.4 },
        { name: "울릉군", lat: 37.4847, lng: 130.905 },
      ],
    },
    {
      name: "경상남도",
      cities: [
        { name: "창원시", lat: 35.2271, lng: 128.6811 },
        { name: "진주시", lat: 35.1803, lng: 128.1076 },
        { name: "통영시", lat: 34.8544, lng: 128.4331 },
        { name: "사천시", lat: 35.0031, lng: 128.0647 },
        { name: "김해시", lat: 35.2281, lng: 128.8894 },
        { name: "밀양시", lat: 35.5031, lng: 128.7486 },
        { name: "거제시", lat: 34.8806, lng: 128.6217 },
        { name: "양산시", lat: 35.335, lng: 129.0372 },
        { name: "의령군", lat: 35.3192, lng: 128.2614 },
        { name: "함안군", lat: 35.2722, lng: 128.4061 },
        { name: "창녕군", lat: 35.5439, lng: 128.4958 },
        { name: "고성군", lat: 34.9736, lng: 128.3225 },
        { name: "남해군", lat: 34.8375, lng: 127.8947 },
        { name: "하동군", lat: 35.0675, lng: 127.7511 },
        { name: "산청군", lat: 35.415, lng: 127.8739 },
        { name: "함양군", lat: 35.5206, lng: 127.725 },
        { name: "거창군", lat: 35.6861, lng: 127.9092 },
        { name: "합천군", lat: 35.5667, lng: 128.1656 },
      ],
    },
    {
      name: "제주특별자치도",
      cities: [
        { name: "제주시", lat: 33.4996, lng: 126.5312 },
        { name: "서귀포시", lat: 33.253, lng: 126.5618 },
      ],
    },
  ];

  return (
    <>
      {/* 시작화면 */}
      <Main isStart={isStart} startToggle={startToggle} />

      <article
        className="
          flex
          flex-col
          items-center
          justify-center
          w-screen
          h-screen
        "
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
            className="
              flex
              flex-row
              items-center
              justify-start
            "
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
              className="
                cursor-pointer
              "
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
