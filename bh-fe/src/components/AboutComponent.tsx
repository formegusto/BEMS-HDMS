import Assets from "src/assets";
import { ContainerWidth1240 } from "src/styles/Container";
import styled from "styled-components";

function AboutComponent() {
  return (
    <Wrap>
      <ContainerWidth1240>
        <img src={Assets.Etc.ResearchSummary} alt="연구 개요" />
      </ContainerWidth1240>
    </Wrap>
  );
}

const Wrap = styled.div`
  & > div {
    margin: 64px auto 0;
  }

  & img {
    width: 100%;
  }
`;

export default AboutComponent;
