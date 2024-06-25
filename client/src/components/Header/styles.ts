import styled from "styled-components";
import { flexRow } from "../../styles/globalDivs";
import { cssSpacing } from "../../styles/globalValues";

export const HeaderContainer = styled(flexRow)`
  justify-content: center;
  padding-top: ${cssSpacing.s24};
  gap: ${cssSpacing.s16};
`;
