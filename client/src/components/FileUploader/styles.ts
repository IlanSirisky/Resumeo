import styled from "styled-components";

export const FileUploaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DropZone = styled.div`
  border: 2px dashed #d0d0d0;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  width: 400px;
  margin-bottom: 20px;

  &:hover {
    background-color: #f0f0f0;
  }
`;