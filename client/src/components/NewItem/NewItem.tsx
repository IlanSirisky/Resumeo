import { Button, Text } from "monday-ui-react-core";
import { StyledSubtext } from "../../styles/globalDivs";
import { NewItemContainer, StyledErrorText, StyledSucessText } from "./styles";
import { useParsedData } from "../../contexts/dataContext";
import { useEffect, useState } from "react";
import { getGroups } from "../../hooks/useGetGroups";
import { createItem } from "../../hooks/useCreateItem";
import { institutionOptions } from "../../constants/institutionOptions";

interface NewItemProps {
  existingItems?: boolean;
}

const NewItem = ({ existingItems = false }: NewItemProps) => {
  const { parsedData } = useParsedData();
  const [groups, setGroups] = useState<any[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [selectedGroupTitle, setSelectedGroupTitle] = useState<string | null>(
    null
  );
  const [createSuccess, setCreateSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      const groups = await getGroups(6888206890);
      setGroups(groups);
      if (groups.length > 0) {
        setSelectedGroupId(groups[0].id);
        setSelectedGroupTitle(groups[0].title);
      }
    };
    fetchGroups();
  }, []);

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = e.target.selectedIndex;
    setSelectedGroupId(e.target.value);
    setSelectedGroupTitle(groups[selectedIndex].title);
  };

  const handleCreateItem = async () => {
    if (!parsedData || !selectedGroupId || !selectedGroupTitle) {
      return;
    }
    const institute = institutionOptions.includes(parsedData.University)
      ? parsedData.University
      : "Other";

    try {
      const newItem = await createItem(
        6888206890,
        selectedGroupId,
        selectedGroupTitle,
        parsedData.Name,
        parsedData.Email,
        parsedData.Phone,
        institute
      );
      console.log("Created new item:", newItem);
      setCreateSuccess(true);
    } catch (error) {
      console.error("Error creating item:", error);
      setCreateSuccess(false);
    }
  };

  return (
    <NewItemContainer>
      {existingItems && <StyledSubtext>Not the same candidate?</StyledSubtext>}
      <select onChange={handleGroupChange} value={selectedGroupId || ""}>
        {groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.title}
          </option>
        ))}
      </select>
      <Button onClick={handleCreateItem}>Create an Item</Button>
      {createSuccess && (
        <StyledSucessText type={Text.types.TEXT1}>
          Item created sucessfuly
        </StyledSucessText>
      )}
      {createSuccess === false && (
        <StyledErrorText type={Text.types.TEXT1}>
          Failed to create item
        </StyledErrorText>
      )}
    </NewItemContainer>
  );
};

export default NewItem;
