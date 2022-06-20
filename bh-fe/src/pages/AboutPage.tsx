import Assets from "src/assets";
import AboutComponent from "src/components/AboutComponent";
import BasicTemplate from "src/templates/BasicTemplate";

function AboutPage() {
  return (
    <BasicTemplate
      title="about us"
      description={`건물내 온도, 습도, 조도, 레이더 센서, IR 어레이 센서 설치를 통해, 건물내 거주자들의 온/습/조도, 재실, 분포, 인원수, 피부온도 등의 물리적인 정보를 수집하고, 스마트기기 앱을 이용하여 건물내 거주자들의 거주 공간환경에 대한 만족도 정보를 동시에 수집/저장 할 예정입니다.

BEMS 공공데이터 구축/공유 서비스 제공 일환으로, (예비)사용자들에게 수집된 건물내 HUMAN(거주자) 정보 데이터의 원활한 공유서비스를 원활하게 제공하는 플랫폼을 운영/관리를 최종목표로 하고 있습니다.`}
      titleImage={Assets.Banner.SubBanner3}
    >
      <AboutComponent />
    </BasicTemplate>
  );
}

export default AboutPage;
