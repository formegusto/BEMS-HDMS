import Assets from "src/assets";
import { ContainerWidth1240 } from "src/styles/Container";
import { ACHROMATIC } from "src/styles/Palette";
import styled from "styled-components";

function FooterComponent() {
  return (
    <Wrap>
      <OptionBar.Block>
        <ContainerWidth1240 className="footer-container-option">
          <OptionBar.Item>개인정보 취급방침</OptionBar.Item>
          <OptionBar.Item>이메일주소 무단 수집 거부</OptionBar.Item>
        </ContainerWidth1240>
      </OptionBar.Block>
      <OrganizationBar.Block>
        <ContainerWidth1240 className="footer-container-organization">
          <OrganizationBar.ParagraphWrap className="block-paragraph">
            <OrganizationBar.Paragraph14>
              한국전자기술연구원
            </OrganizationBar.Paragraph14>
            <OrganizationBar.Paragraph14>
              원장 : 김영삼 주소 : (13509)경기도 성남시 분당구 새나리로
              25(야탑동) KETI 한국전자기술연구원
            </OrganizationBar.Paragraph14>
            <OrganizationBar.Paragraph12>
              TEL : 031-789-7000 FAX : 031-789-7729
            </OrganizationBar.Paragraph12>
            <OrganizationBar.Paragraph12>
              Copyright ⓒ 2016 KOREA ELECTRONICS TECHNOLOGY INSTITUTE. All
              Rights Reserved.
            </OrganizationBar.Paragraph12>
          </OrganizationBar.ParagraphWrap>
          <OrganizationBar.Logo
            src={Assets.Symbols.KETILogoHorizontalWhite}
            alt="KETI LOGO WHITE"
          />
        </ContainerWidth1240>
      </OrganizationBar.Block>
    </Wrap>
  );
}

const Wrap = styled.div`
  background-color: #5e5e5e;

  margin: 88px 0 0;
`;

const OrganizationBar = {
  Block: styled.div`
    font-style: normal;
    font-weight: bold;

    letter-spacing: -0.025em;

    color: ${ACHROMATIC[12]};

    padding: 32px 0 48px;
    box-sizing: border-box;

    & > .footer-container-organization {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      & > .block-paragraph > p:first-child {
        margin: 0 0 10px;
      }
    }
  `,
  ParagraphWrap: styled.div`
    flex: 1;
  `,
  Paragraph14: styled.p`
    font-size: 14px;
    line-height: 16px;
  `,
  Paragraph12: styled.p`
    font-size: 12px;
    line-height: 14px;

    margin: 4px 0 0;
  `,
  Logo: styled.img`
    width: 181px;
  `,
};

const OptionBar = {
  Block: styled.div`
    background-color: #4d4d4d;

    & > .footer-container-option {
      display: flex;
      height: 32px;

      align-items: center;

      & > span:not(:first-child) {
        padding: 0 12px 0 11px;
      }
    }
  `,
  Item: styled.span`
    display: inline-block;

    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
    /* identical to box height */

    color: ${ACHROMATIC[12]};

    padding: 0 12px 0 0;

    box-sizing: border-box;
    border-right: 1px solid ${ACHROMATIC[12]};
  `,
};

export default FooterComponent;
