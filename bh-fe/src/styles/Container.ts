import styled, { css } from "styled-components";
import { FlexOption } from "./types";

export const ContainerWidth1240 = styled.div`
  width: 1240px;
  margin: 0 auto;
`;

export const FlexWrap = styled.div<FlexOption>`
  display: flex;
  flex-wrap: nowrap;

  ${(props) =>
    props.isDirectionColumn &&
    css`
      flex-direction: column;
    `}
`;

export const Wrap = styled.div``;
