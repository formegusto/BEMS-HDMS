import styled from "styled-components";

function InputGroup({ children }: React.PropsWithChildren<any>) {
  return <Group className="inputgroup">{children}</Group>;
}

const Group = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;

  & > * {
    flex: 1;
  }

  & > *:not(:last-child) {
    margin: 0 5px 0 0;
  }
`;

export default InputGroup;
