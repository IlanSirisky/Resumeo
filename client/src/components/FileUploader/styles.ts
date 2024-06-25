import styled from "styled-components";
import { flexColumn, flexRow } from "../../styles/globalDivs";
import { COLORS } from "../../styles/colors";
import { Text } from "monday-ui-react-core";
import { cssSpacing } from "../../styles/globalValues";

export const FileUploaderWrapper = styled(flexColumn)`
  align-items: center;
  gap: ${cssSpacing.s24};
`;

export const DropZone = styled(flexColumn)`
  border: 2px dashed ${COLORS.Primary.P1};
  border-radius: ${cssSpacing.s16};
  padding: ${cssSpacing.s20};
  align-items: center;
  gap: ${cssSpacing.s16};
  width: 40%;
  min-height: 120px;
  justify-content: center;
`;

export const StyledSubtext = styled(Text)`
  color: ${COLORS.Secondary.S1};
`;

export const FileInfo = styled(flexRow)`
  gap: ${cssSpacing.s8};
  align-items: center;
`;

export const RemoveFileButton = styled.button`
  background: none;
  border: none;
  color: ${COLORS.Secondary.S1};
  cursor: pointer;
  font-size: 18px;
`;
