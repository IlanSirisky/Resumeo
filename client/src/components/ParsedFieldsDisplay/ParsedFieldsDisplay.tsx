import { ParsedDataType } from "../../types/parsedDataType";

interface ParsedFieldsDisplayProps {
  data: ParsedDataType;
  onFieldChange: (field: string, value: string) => void;
}

const ParsedFieldsDisplay = ({
  data,
  onFieldChange,
}: ParsedFieldsDisplayProps) => {
  return (
    <div>
      <label>
        Name:
        <input
          type="text"
          value={data.name}
          onChange={(e) => onFieldChange("name", e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={data.email}
          onChange={(e) => onFieldChange("email", e.target.value)}
        />
      </label>
      <label>
        Phone:
        <input
          type="text"
          value={data.phone}
          onChange={(e) => onFieldChange("phone", e.target.value)}
        />
      </label>
      <label>
        University:
        <input
          type="text"
          value={data.university}
          onChange={(e) => onFieldChange("university", e.target.value)}
        />
      </label>
    </div>
  );
};

export default ParsedFieldsDisplay;
