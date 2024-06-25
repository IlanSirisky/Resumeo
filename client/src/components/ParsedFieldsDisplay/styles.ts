import styled from "styled-components";
import { flexColumn } from "../../styles/globalDivs";
import { cssSpacing } from "../../styles/globalValues";
import { TextField } from "monday-ui-react-core";
import { COLORS } from "../../styles/colors";

export const ParsedDataContainer = styled(flexColumn)`
  align-content: center;
  gap: ${cssSpacing.s12};
  width: 400px;
  padding: ${cssSpacing.s20};
`;

export const ParsedDataHeading = styled(flexColumn)`
  align-content: center;
  gap: ${cssSpacing.s8};
`;

export const StyledTextField = styled(TextField)`
  border: none;
  border-radius: 0;
  border-bottom: ${COLORS.Primary.P1};
`;
