import { Dropdown, Text } from "monday-ui-react-core";
import { useParsedData } from "../../contexts/dataContext";
import { IDropDownTypes } from "../../types/dropDownType";
import { TitleContainer } from "../GroupDropDown/styles";
import { useEffect, useState } from "react";
import { parseSettingsStrToOptions } from "../../utils/parseColumnSettings";

const PositionDropDown = () => {
  const { handleFieldChange, columns } = useParsedData();
  const [positionOptions, setPositionOptions] = useState<IDropDownTypes[]>([]);

  useEffect(() => {
    const positionColSettings = columns.find(
      (col) => col.title === "Position"
    )?.settings_str;

    if (positionColSettings) {
      const options = parseSettingsStrToOptions(positionColSettings);
      setPositionOptions(options);
    }
  }, [columns]);

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
        options={positionOptions}
        onChange={(option: IDropDownTypes) => handlePositionChange(option)}
        className="custom-text-field-input"
        size={Dropdown.sizes.MEDIUM}
      />
    </div>
  );
};

export default PositionDropDown;
