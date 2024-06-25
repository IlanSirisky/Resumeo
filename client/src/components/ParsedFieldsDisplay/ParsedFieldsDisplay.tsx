import { TextField } from "monday-ui-react-core";
import { Heading } from "monday-ui-react-core/next";
import { ParsedDataType } from "../../types/parsedDataType";
import { ParsedDataContainer, ParsedDataHeading } from "./styles";
import { StyledSubtext } from "../../styles/globalDivs";
import { Retry } from "monday-ui-react-core/icons";
import { useCheckDuplicates } from "../../hooks/useCheckDuplicates";
import "./parsedFieldsStyles.css";

interface ParsedFieldsDisplayProps {
  data: ParsedDataType;
  onFieldChange: (field: string, value: string) => void;
}

const ParsedFieldsDisplay = ({
  data,
  onFieldChange,
}: ParsedFieldsDisplayProps) => {
  const { refetch } = useCheckDuplicates(data.email);

  const handleCheckDuplicates = () => {
    refetch();
  };

  return (
    <ParsedDataContainer>
      <ParsedDataHeading>
        <Heading type={Heading.types.H3}>Processed Information</Heading>
        <StyledSubtext>
          Please validate the information is correct
        </StyledSubtext>
      </ParsedDataHeading>
      <TextField
        title="Full Name"
        placeholder="Insert Name"
        size={TextField.sizes.MEDIUM}
        value={data.name}
        onChange={(value) => onFieldChange("name", value)}
        requiredAsterisk={true}
        className="custom-text-field-input"
      />
      <TextField
        title="Email"
        type={TextField.types.EMAIL}
        placeholder="Insert Email"
        size={TextField.sizes.MEDIUM}
        value={data.email}
        onChange={(value) => onFieldChange("email", value)}
        requiredAsterisk={true}
        iconName={Retry}
        onIconClick={handleCheckDuplicates}
        className="custom-text-field-input"
      />
      <TextField
        title="Phone Number"
        placeholder="Insert Phone Number"
        type={TextField.types.TEL}
        size={TextField.sizes.MEDIUM}
        value={data.phone}
        onChange={(value) => onFieldChange("phone", value)}
        className="custom-text-field-input"
      />
      <TextField
        title="Education Institution"
        placeholder="Insert Education"
        size={TextField.sizes.MEDIUM}
        value={data.university}
        onChange={(value) => onFieldChange("university", value)}
        className="custom-text-field-input"
      />
    </ParsedDataContainer>
  );
};

export default ParsedFieldsDisplay;
