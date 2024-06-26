import styled from "styled-components";
import { flexColumn } from "../../styles/globalDivs";
import { cssSpacing } from "../../styles/globalValues";

export const TableContainer = styled(flexColumn)`
  gap: ${cssSpacing.s24};
  padding-bottom: ${cssSpacing.s24};
  align-items: center;
`;

export const DupsFoundContainer = styled(flexColumn)`
  gap: ${cssSpacing.s12};
`;
