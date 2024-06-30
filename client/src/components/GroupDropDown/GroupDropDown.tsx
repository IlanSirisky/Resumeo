import { Dropdown, Text } from "monday-ui-react-core";
import { useParsedData } from "../../contexts/dataContext";
import { IDropDownTypes } from "../../types/dropDownType";
import { TitleContainer } from "./styles";
import { IGroupTypes } from "../../types/mondayViewsTypes";

const GroupDropDown = () => {
  const { handleFieldChange, groups } = useParsedData();

  const handleGroupChange = (option: IDropDownTypes) => {
    const group: IGroupTypes = {
      id: option.value,
      title: option.label,
    };
    handleFieldChange("group", group);
  };

  return (
    <div>
      <TitleContainer>
        <Text>Group</Text>
        <Text style={{ color: "red" }}>*</Text>
      </TitleContainer>
      <Dropdown
        options={groups.map((group) => ({
          value: group.id,
          label: group.title,
        }))}
        onChange={(option: IDropDownTypes) => handleGroupChange(option)}
        className="custom-text-field-input"
        size={Dropdown.sizes.MEDIUM}
      />
    </div>
  );
};

export default GroupDropDown;
