import { ACHROMATIC, BLUE } from "src/styles/Palette";
import styled, { StyledComponentProps } from "styled-components";
import { MdAdsClick } from "react-icons/md";
import { BuildingItem } from "src/store/testDatas/BuildingItems";
import { Building } from "src/store/information/types";

function BuildingItemView({
  name,
  image,
  ...htmlProps
}: StyledComponentProps<"div", {}, any, any> & BuildingItem) {
  return (
    <BuildingItemStyle.Block {...htmlProps}>
      {image ? (
        <BuildingItemStyle.Background
          src={"http://localhost:8080" + image}
          alt={name}
        />
      ) : (
        <></>
      )}
      <BuildingItemStyle.Shadow />
      <BuildingItemStyle.Title>{name}</BuildingItemStyle.Title>
    </BuildingItemStyle.Block>
  );
}

const BuildingItemStyle = {
  Block: styled.div`
    position: relative;
    width: 295px;
    height: 295px;

    border-radius: 16px 16px 0 0;
    overflow: hidden;

    cursor: pointer;

    &:not(.select) {
      &:hover {
        & > h1 {
          height: 100%;
          background: rgba(38, 68, 109, 0.9);
        }
      }
    }

    &.select {
      & > h1 {
        height: 100%;
        background: rgb(38, 68, 109);
      }
    }
  `,
  Background: styled.img`
    width: 100%;
    height: 100%;

    object-fit: cover;
    object-position: 50% 50%;
  `,
  Shadow: styled.div`
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background: rgba(51, 51, 51, 0.2);
  `,
  Title: styled.h1`
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 30px;

    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;

    color: ${ACHROMATIC[15]};
    background: rgba(38, 68, 109, 0.7);

    transition: 0.5s;
  `,
};

const BuildingItemWrap = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;

  flex-wrap: wrap;

  & > div {
    margin-bottom: 32px;
  }

  & > div:not(:nth-child(4n + 0)) {
    margin-right: 20px;
  }
`;

type Props = {
  selBuilding: number | null;
  changeSelBuilding: (id: number) => void;
  buildings: Building[];
};

function Buildings({ selBuilding, changeSelBuilding, buildings }: Props) {
  return (
    <Wrap>
      <Title.Block>
        <Title.Text>Buildings</Title.Text>
        <MdAdsClick size={32} color={BLUE[1]} />
      </Title.Block>
      <BuildingItemWrap>
        {buildings.map((_) => (
          <BuildingItemView
            {..._}
            key={_.id}
            className={`${
              selBuilding && selBuilding === _.id ? "select" : ""
            } `}
            onClick={() => changeSelBuilding(_.id)}
          />
        ))}
      </BuildingItemWrap>
    </Wrap>
  );
}

const Wrap = styled.div`
  margin: 8px 0 0;
`;

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

export default Buildings;
