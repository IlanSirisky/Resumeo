import styled from "styled-components";
import { flexColumn } from "../../styles/globalDivs";
import { cssSpacing } from "../../styles/globalValues";

export const NewItemContainer = styled(flexColumn)`
align-items: center;
  gap: ${cssSpacing.s8};
  width: 400px;
`;
