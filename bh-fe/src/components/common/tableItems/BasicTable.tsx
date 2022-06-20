import React from "react";
import styled from "styled-components";

function BasicTable({ children }: React.PropsWithChildren<any>) {
  return <Table className="table basictable">{children}</Table>;
}

const Table = styled.div``;

export default BasicTable;
