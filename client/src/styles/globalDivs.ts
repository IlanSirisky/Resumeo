import styled from "styled-components";

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
`;
