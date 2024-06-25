import React, { useRef, useState } from "react";
import { useParseCV } from "../../hooks/useParseCV";
import { Button } from "monday-ui-react-core";
import { Heading } from "monday-ui-react-core/next";
import { DropZone, FileUploaderWrapper } from "./styles";

interface FileUploaderProps {
  onParseSuccess: (data: any) => void;
}

const FileUploader = ({ onParseSuccess }: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
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

  const isLoading = status === "pending";

  return (
    <FileUploaderWrapper>
      <DropZone
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}>
        <Heading type={Heading.types.H3}>
          Browse a pdf file or drop it here
        </Heading>
        <Button onClick={handleClick}>Browse file</Button>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
      </DropZone>
      <Button onClick={handleUpload} disabled={!file || isLoading}>
        {isLoading ? "Uploading..." : "Upload and Parse"}
      </Button>
      {error && <p>Error: {error.message}</p>}
    </FileUploaderWrapper>
  );
};

export default FileUploader;
