import { Dropdown, Text } from "monday-ui-react-core";
import { useParsedData } from "../../contexts/dataContext";
import { IDropDownTypes } from "../../types/dropDownType";
import { TitleContainer } from "../GroupDropDown/styles";
import { positionOptions } from "../../constants/positionOptions";

const PositionDropDown = () => {
  const { handleFieldChange } = useParsedData();

  const handlePositionChange = (option: IDropDownTypes) => {
    const position = option.label;
    handleFieldChange("position", position);
  };

  return (
    <div>
      <TitleContainer>
        <Text>Position</Text>
      </TitleContainer>
      <Dropdown
        options={positionOptions.map((group) => ({
          value: group.id,
          label: group.title,
        }))}
        onChange={(option: IDropDownTypes) => handlePositionChange(option)}
        className="custom-text-field-input"
        size={Dropdown.sizes.MEDIUM}
      />
    </div>
  );
};

export default PositionDropDown;
