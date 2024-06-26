import React, { useRef } from "react";
import { useParseCV } from "../../hooks/useParseCV";
import { Button } from "monday-ui-react-core";
import { Heading } from "monday-ui-react-core/next";
import {
  DropZone,
  FileInfo,
  FileUploaderWrapper,
  RemoveFileButton,
} from "./styles";
import { COLORS } from "../../styles/colors";
import { StyledSubtext } from "../../styles/globalDivs";

interface FileUploaderProps {
  onParseSuccess: (data: any) => void;
  clearFile: () => void;
  file: File | null;
  setFile: (file: File | null) => void;
}

const FileUploader = ({ onParseSuccess, clearFile, file, setFile }: FileUploaderProps) => {
  const { mutate: parseCV, status, error } = useParseCV();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      parseCV(file, {
        onSuccess: (data) => {
          onParseSuccess(data);
        },
      });
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    clearFile();
  };

  const isLoading = status === "pending";

  return (
    <FileUploaderWrapper>
      {!file ? (
        <DropZone onDragOver={handleDragOver} onDrop={handleDrop}>
          <Heading type={Heading.types.H3}>
            Browse a pdf file or drop it here
          </Heading>
          <StyledSubtext>
            File data is used locally and never leaves your browser
          </StyledSubtext>
          <Button
            onClick={handleClick}
            kind={Button.kinds.SECONDARY}
            style={{ borderColor: `${COLORS.Primary.P1}` }}>
            Browse Files
          </Button>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
        </DropZone>
      ) : (
        <DropZone>
          <FileInfo>
            <Heading type={Heading.types.H3}>
              {file.name} - {(file.size / 1024).toFixed(2)} KB
            </Heading>
            <RemoveFileButton onClick={handleRemoveFile}>✕</RemoveFileButton>
          </FileInfo>
          <StyledSubtext>
            Note: Resumeo works best on single column resume
          </StyledSubtext>
        </DropZone>
      )}
      {file && (
        <Button onClick={handleUpload}>
          {isLoading ? "Uploading..." : "Process CV"}
        </Button>
      )}
      {error && <StyledSubtext>{error.message}</StyledSubtext>}
    </FileUploaderWrapper>
  );
};

export default FileUploader;
