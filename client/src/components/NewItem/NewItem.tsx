import { Button, Dropdown, Text } from "monday-ui-react-core";
import { StyledSubtext } from "../../styles/globalDivs";
import { NewItemContainer } from "./styles";
import { useParsedData } from "../../contexts/dataContext";
import { useEffect, useState } from "react";
import { getGroups } from "../../hooks/useGetGroups";
import { createItem } from "../../hooks/useCreateItem";
import { IDropDownTypes } from "../../types/dropDownType";
import { IGroupTypes } from "../../types/mondayViewsTypes";

interface NewItemProps {
  existingItems?: boolean;
}

const NewItem = ({ existingItems = false }: NewItemProps) => {
  const { parsedData } = useParsedData();
  const [groups, setGroups] = useState<IDropDownTypes[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<IDropDownTypes | null>(
    null
  );

  useEffect(() => {
    const fetchGroups = async () => {
      const groupsData = await getGroups(6888206890);
      const groupOptions = groupsData.map((group: IGroupTypes) => ({
        label: group.title,
        value: group.id,
      }));
      setGroups(groupOptions);
      console.log("Groups:", groupOptions);

      if (groupOptions.length > 0) {
        setSelectedGroup(groupOptions[0]);
      }
    };
    fetchGroups();
  }, []);

  const handleGroupChange = (selectedOption: IDropDownTypes) => {
    setSelectedGroup(selectedOption);
  };

  const handleCreateItem = async () => {
    if (!parsedData || !selectedGroup) {
      return;
    }

    try {
      const newItem = await createItem(
        6888206890,
        selectedGroup.value,
        selectedGroup.label,
        parsedData.Name,
        parsedData.Email,
        parsedData.Phone
      );
      console.log("Created new item:", newItem);
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <NewItemContainer>
      {existingItems && <StyledSubtext>Not the same candidate?</StyledSubtext>}
      <Text>Position</Text>
      <Dropdown
        options={groups}
        placeholder="Select a group"
        onChange={handleGroupChange}
        value={selectedGroup}
      />
      <Button onClick={handleCreateItem}>Create an Item</Button>
    </NewItemContainer>
  );
};

export default NewItem;
