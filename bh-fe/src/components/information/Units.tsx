import styled, { StyledComponentProps } from "styled-components";
import { MdAdsClick } from "react-icons/md";
import { ACHROMATIC, BLUE } from "src/styles/Palette";
import React from "react";
import { Unit } from "src/store/information/types";

type Props = {
  name: string;
};

function UnitItemView({
  name,
  ...htmlProps
}: StyledComponentProps<"div", {}, any, any> & Props) {
  return (
    <UnitItemStyle.Block {...htmlProps}>
      <UnitItemStyle.Title>{name}</UnitItemStyle.Title>
    </UnitItemStyle.Block>
  );
}

const UnitItemStyle = {
  Block: styled.div`
    width: 200px;
    height: 100px;

    box-sizing: border-box;
    border: 2px solid ${ACHROMATIC[14]};

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    &:not(.select) {
      &:hover {
        border-color: ${BLUE[0]};
        & > h1 {
          color: ${BLUE[0]};
        }
      }
    }

    &.select {
      border-color: ${BLUE[0]};
      & > h1 {
        color: ${BLUE[0]};
      }
    }

    margin-bottom: 10px;
  `,
  Title: styled.h1`
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    /* identical to box height */

    color: ${ACHROMATIC[3]};
  `,
};

const UnitItemWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  & > div:not(:nth-child(6n + 0)) {
    margin-right: 8px;
  }
`;

type UnitsProps = {
  units: Unit[];
  selUnit: number | null;
  changeSelUnit: (idx: number) => void;
};

function Units({ units, selUnit, changeSelUnit }: UnitsProps) {
  const refWrap = React.useRef<HTMLDivElement>(null);

  return (
    <Wrap id="units-wrap" ref={refWrap}>
      <Title.Block>
        <Title.Text>Units</Title.Text>
        <MdAdsClick size={32} color={BLUE[1]} />
      </Title.Block>
      <UnitItemWrap>
        {units.map((_) => (
          <UnitItemView
            name={_.name}
            key={_.id}
            className={`${selUnit === _.id ? "select" : ""}`}
            onClick={() => changeSelUnit(_.id)}
          />
        ))}
      </UnitItemWrap>
    </Wrap>
  );
}

const Wrap = styled.div``;

const Title = {
  Block: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 54px;
  `,
  Text: styled.h1`
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;

    color: ${ACHROMATIC[3]};
  `,
};

export default Units;
