import { Button } from "monday-ui-react-core";
import styled from "styled-components";
import { cssSpacing } from "../../styles/globalValues";
import { flexColumn, flexRow } from "../../styles/globalDivs";
import { COLORS } from "../../styles/colors";

export const DrawerWrapper = styled(flexColumn)<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 30%;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
`;

export const Backdrop = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const DrawerContent = styled(flexColumn)`
  flex: 1;
  padding: ${cssSpacing.s16};
  gap: ${cssSpacing.s8};
  overflow-y: auto;
`;

export const DrawerHeader = styled(flexColumn)`
  position: sticky;
  z-index: 1001;
  border-bottom: 1px solid ${COLORS.Secondary.S1};
  gap: ${cssSpacing.s8};
  padding-bottom: ${cssSpacing.s8};
`;

export const CloseIconButton = styled(Button)`
  z-index: 1001;
`;

export const TextAreaContainer = styled(flexColumn)`
  gap: ${cssSpacing.s8};
  margin-bottom: ${cssSpacing.s16};
`;

export const CommentsContainer = styled(flexColumn)`
  gap: ${cssSpacing.s16};
`;

export const CommentContainer = styled(flexColumn)`
  border: 1px solid ${COLORS.Secondary.S1};
  padding: ${cssSpacing.s8};
  border-radius: ${cssSpacing.s8};
  height: fit-content;
`;

export const CommentHeader = styled(flexRow)`
  justify-content: space-between;
`;

export const NoCommentsContainer = styled(flexColumn)`
  gap: ${cssSpacing.s8};
  align-items: center;
`;
