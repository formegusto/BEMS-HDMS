import { Link } from "react-router-dom";
import Assets from "src/assets";
import { ContainerWidth1240 } from "src/styles/Container";
import { ACHROMATIC } from "src/styles/Palette";
import styled from "styled-components";

function MainInformation() {
  return (
    <Wrap>
      <ContainerWidth1240>
        <Information.Block>
          <Information.Item to="/information">
            <Information.Image
              src={Assets.Banner.SubBanner1Darker}
              alt="information 1"
            />
            <Information.DescriptionBlock>
              <Information.Title>
                설치정보 제공 서비스(위치/센서/모니터링 등)
              </Information.Title>
              <Information.Desc>
                BEMS 공공데이터 구축/공유 서비스 제공 일환으로, 다양한 규모,
                용도, 형태, 지역 등의 건물 특성에 맞는 HUMAN(거주자) 정보를
                수집하였습니다. 적용된 건물의 기본정보(위치, 규모)와 건물내
                설치된 센서정보를 확인할 수 있습니다. 데이터 (예비)사용자들은
                수집/저장된 HUMAN 데이터들의 특성을 실시간으로 확인가능합니다.
              </Information.Desc>
            </Information.DescriptionBlock>
          </Information.Item>
          <Information.Item to="/sharing">
            <Information.Image
              src={Assets.Banner.SubBanner2Darker}
              alt="information 2"
            />
            <Information.DescriptionBlock>
              <Information.Title>
                데이터 공유 서비스(외부사용자 활용)
              </Information.Title>
              <Information.Desc>
                BEMS 공공데이터 구축/공유 서비스 제공 일환으로, 데이터
                (예비)사용자들은 수집/저장된 HUMAN 데이터들을 활용하기 위해
                데이터 공유서비스를 신청할 수 있습니다. 안전한 데이터 관리를
                위해 암호화 된 데이터를 제공받아 사전에 설계된 암호화 프로세스를
                적용하여 데이터를 안전하게 활용할 수 있습니다.
              </Information.Desc>
            </Information.DescriptionBlock>
          </Information.Item>
          <Information.Item to="/about">
            <Information.Image
              src={Assets.Banner.SubBanner3Darker}
              alt="information 3"
            />
            <Information.DescriptionBlock>
              <Information.Title>사업개요 및 이용방법</Information.Title>
              <Information.Desc>
                건물내 온도, 습도, 조도, 레이더 센서, IR 어레이 센서 설치를
                통해, 건물내 거주자들의 온/습/조도, 재실, 분포, 인원수, 피부온도
                등의 물리적인 정보를 수집하고, 스마트기기 앱을 이용하여 건물내
                거주자들의 거주 공간환경에 대한 만족도 정보를 동시에 수집/저장
                할 예정입니다. BEMS 공공데이터 구축/공유 서비스 제공 일환으로,
                (예비)사용자들에게 수집된 건물내 HUMAN(거주자) 정보 데이터의
                원활한 공유서비스를 원활하게 제공하는 플랫폼을 운영/관리를
                최종목표로 하고 있습니다.
              </Information.Desc>
            </Information.DescriptionBlock>
          </Information.Item>
        </Information.Block>
      </ContainerWidth1240>
    </Wrap>
  );
}

const Wrap = styled.div`
  padding: 48px 0;
  background-color: ${ACHROMATIC[15]};
`;

const Information = {
  Block: styled.section`
    display: flex;
    justify-content: space-between;
  `,

  Item: styled(Link)`
    width: calc(100% / 3 - 48px);
    border: 1px solid ${ACHROMATIC[14]};

    cursor: pointer;
    transition: 0.7s;

    &:hover {
      transform: translate(-3px, -3px);
      box-shadow: 4px 4px rgb(238, 238, 238, 0.3);
    }
  `,
  Image: styled.img`
    width: 100%;
    height: 225px;

    object-fit: cover;
  `,
  DescriptionBlock: styled.div`
    padding: 20px;
  `,
  Title: styled.h1`
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;

    color: ${ACHROMATIC[4]};

    margin: 0 0 8px;
  `,
  Desc: styled.h3`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;

    color: ${ACHROMATIC[7]};
    height: 40px;

    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
};

export default MainInformation;
