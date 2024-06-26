import styled from "styled-components";
import { flexColumn } from "../../styles/globalDivs";
import { cssSpacing } from "../../styles/globalValues";
import { Text } from "monday-ui-react-core";

export const NewItemContainer = styled(flexColumn)`
  align-items: center;
  gap: ${cssSpacing.s8};
  width: 400px;
`;

export const StyledSucessText = styled(Text)`
  color: green;
`;

export const StyledErrorText = styled(Text)`
  color: red;
`;
