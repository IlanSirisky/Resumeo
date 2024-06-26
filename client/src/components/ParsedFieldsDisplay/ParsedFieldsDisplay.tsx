import { TextField } from "monday-ui-react-core";
import { Heading } from "monday-ui-react-core/next";
import { ParsedDataContainer, ParsedDataHeading } from "./styles";
import { StyledSubtext } from "../../styles/globalDivs";
import { Retry } from "monday-ui-react-core/icons";
import { useCheckDuplicates } from "../../hooks/useCheckDuplicates";
import { useParsedData } from "../../contexts/dataContext";
import "./parsedFieldsStyles.css";

const ParsedFieldsDisplay = () => {
  const { parsedData, handleFieldChange } = useParsedData();
  const { refetch } = useCheckDuplicates(parsedData?.Email || "");

  const handleCheckDuplicates = () => {
    refetch();
  };

  if (!parsedData) {
    return null;
  }

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
        value={parsedData.Name}
        onChange={(value) => handleFieldChange("Name", value)}
        requiredAsterisk={true}
        className="custom-text-field-input"
      />
      <TextField
        title="Email"
        type={TextField.types.EMAIL}
        placeholder="Insert Email"
        size={TextField.sizes.MEDIUM}
        value={parsedData.Email}
        onChange={(value) => handleFieldChange("Email", value)}
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
        value={parsedData.Phone}
        onChange={(value) => handleFieldChange("Phone", value)}
        className="custom-text-field-input"
      />
      <TextField
        title="Education Institution"
        placeholder="Insert Education"
        size={TextField.sizes.MEDIUM}
        value={parsedData.University}
        onChange={(value) => handleFieldChange("University", value)}
        className="custom-text-field-input"
      />
    </ParsedDataContainer>
  );
};

export default ParsedFieldsDisplay;
