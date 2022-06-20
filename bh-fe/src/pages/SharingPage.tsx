import { Outlet } from "react-router-dom";
import Assets from "src/assets";
import { ContainerWidth1240 } from "src/styles/Container";
import { ACHROMATIC } from "src/styles/Palette";
import BasicTemplate from "src/templates/BasicTemplate";
import styled from "styled-components";

function SharingPage() {
  return (
    <BasicTemplate
      title="data sharing"
      description={`BEMS 공공데이터 구축/공유 서비스 제공 일환으로, 데이터 (예비)사용자들은 수집/저장된 HUMAN 데이터들을 활용하기 위해 데이터 공유서비스를 신청할 수 있습니다.
      
안전한 데이터 관리를 위해 암호화 된 데이터를 제공받아 사전에 설계된 암호화 프로세스를 적용하여 데이터를 안전하게 활용할 수 있습니다.`}
      titleImage={Assets.Banner.SubBanner2}
    >
      <Wrap>
        <ContainerWidth1240>
          <Outlet />
        </ContainerWidth1240>
      </Wrap>
    </BasicTemplate>
  );
}

const Wrap = styled.div`
  margin: 32px 0 0;

  color: ${ACHROMATIC[3]};

  & > div .subtitle {
    font-weight: bold;
    font-size: 32px;
    line-height: 40px;

    margin: 0 0 4px;
  }

  & > div .subdescription {
    width: 70%;

    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    margin: 0 0 32px;

    word-break: keep-all;
  }
`;

export default SharingPage;
