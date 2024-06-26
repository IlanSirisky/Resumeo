import styled from "styled-components";
import { flexColumn } from "../../styles/globalDivs";
import { cssSpacing } from "../../styles/globalValues";
import { CSSProperties } from "react";

export const TableContainer = styled(flexColumn)`
  gap: ${cssSpacing.s24};
  padding-bottom: ${cssSpacing.s24};
  align-items: center;
`;

export const DupsFoundContainer = styled(flexColumn)`
  gap: ${cssSpacing.s12};
`;

export const dialogContainerStyles : CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: cssSpacing.s4,
  justifyContent:"center",
};
