import Assets from "src/assets";
import InformationContainer from "src/containers/information";
import BasicTemplate from "src/templates/BasicTemplate";

function InformationPage() {
  return (
    <BasicTemplate
      title="data information"
      description={`BEMS 공공데이터 구축/공유 서비스 제공 일환으로, 다양한 규모, 용도, 형태, 지역 등의 건물 특성에 맞는 HUMAN(거주자) 정보를 수집하였습니다.
      
적용된 건물의 기본정보(위치, 규모)와 건물내 설치된 센서정보를 확인할 수 있습니다. 데이터 (예비)사용자들은 수집/저장된 HUMAN 데이터들의 특성을 실시간으로 확인가능합니다.`}
      titleImage={Assets.Banner.SubBanner1}
    >
      <InformationContainer />
    </BasicTemplate>
  );
}

export default InformationPage;
