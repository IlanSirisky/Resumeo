import { Dropdown, Text } from "monday-ui-react-core";
import { useParsedData } from "../../contexts/dataContext";
import { IDropDownTypes } from "../../types/dropDownType";
import { IPosition } from "../../types/parsedDataType";
import { TitleContainer } from "./styles";

const PositionDropDown = () => {
  const { handleFieldChange, groups } = useParsedData();

  const handleGroupChange = (option: IDropDownTypes) => {
    const position: IPosition = {
      groupId: option.value,
      groupTitle: option.label,
    };
    handleFieldChange("position", position);
  };

  return (
    <>
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
    </>
  );
};

export default PositionDropDown;
