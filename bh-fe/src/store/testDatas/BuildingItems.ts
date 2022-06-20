import Assets from "src/assets";

export type BuildingItem = {
  name: string;
  image?: string;
};

const buildingItems: BuildingItem[] = [
  {
    name: "수원시청",
    image: Assets.BuildingImages.SUWON_CITY_HALL,
  },
  {
    name: "수원컨벤션센터",
    image: Assets.BuildingImages.SUWON_CONVENTION,
  },
  {
    name: "수원시청 별관",
    image: Assets.BuildingImages.SUWON_ANOTHER,
  },
  {
    name: "MG빌딩",
    image: Assets.BuildingImages.MG_BUILDING,
  },
  {
    name: "마크원 지식산업센터",
    image: Assets.BuildingImages.MARK_ONE,
  },
  {
    name: "동신대학교 중앙도서관",
    image: Assets.BuildingImages.DU_UNIVERSITY_LIBRARY,
  },
  {
    name: "청라오피스텔",
    image: Assets.BuildingImages.CHUNGRA,
  },
  {
    name: "수원종합운동장",
    image: Assets.BuildingImages.SUWON_RUNNING,
  },
  {
    name: "전라남도 산하 공공건물",
    image: Assets.BuildingImages.JEONRA_PUBLIC,
  },
  {
    name: "수원시 팔달구청",
    image: Assets.BuildingImages.SUWON_PALDAL,
  },
];

export default buildingItems;
