import styled from "styled-components";
import { flexColumn } from "../../styles/globalDivs";
import { cssSpacing } from "../../styles/globalValues";

export const TableContainer = styled(flexColumn)`
  gap: ${cssSpacing.s12};
  padding-bottom: ${cssSpacing.s24};
`;
