import { Text } from "monday-ui-react-core";
import styled from "styled-components";
import { COLORS } from "./colors";
import { cssSpacing } from "./globalValues";

export const flexRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const flexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AppWrapper = styled(flexColumn)`
  justify-content: center;
  align-items: center;
  gap: ${cssSpacing.s24};
`;

export const StyledSubtext = styled(Text)`
  color: ${COLORS.Secondary.S1};
`;
