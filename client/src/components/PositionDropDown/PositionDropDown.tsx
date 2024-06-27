import { Dropdown, Text } from "monday-ui-react-core";
import { useParsedData } from "../../contexts/dataContext";
import { IDropDownTypes } from "../../types/dropDownType";
import { IPosition } from "../../types/parsedDataType";
import { TitleContainer } from "./styles";
import { StyledErrorText } from "../NewItem/styles";

const PositionDropDown = () => {
  const { handleFieldChange, groups, parsedData } = useParsedData();

  const handleGroupChange = (option: IDropDownTypes) => {
    const position: IPosition = {
      groupId: option.value,
      groupTitle: option.label,
    };
    handleFieldChange("position", position);
  };

  return (
    <div>
      <TitleContainer>
        <Text>Position</Text>
        <Text style={{ color: "red" }}>*</Text>
      </TitleContainer>
      <Dropdown
        searchable={false}
        options={groups.map((group) => ({
          value: group.id,
          label: group.title,
        }))}
        onChange={(option: IDropDownTypes) => handleGroupChange(option)}
        className="custom-text-field-input"
        size={Dropdown.sizes.MEDIUM}
      />
      {!parsedData?.position && (
        <StyledErrorText type={Text.types.TEXT3} style={{ marginTop: "4px" }}>
          * Position is required
        </StyledErrorText>
      )}
    </div>
  );
};

export default PositionDropDown;
