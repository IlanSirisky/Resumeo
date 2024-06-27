import { Button, Text } from "monday-ui-react-core";
import { StyledSubtext } from "../../styles/globalDivs";
import { NewItemContainer, StyledErrorText, StyledSucessText } from "./styles";
import { useParsedData } from "../../contexts/dataContext";
import { useState } from "react";
import { createItem } from "../../hooks/useCreateItem";
import { institutionOptions } from "../../constants/institutionOptions";
import "../ParsedFieldsDisplay/parsedFieldsStyles.css";

interface NewItemProps {
  existingItems?: boolean;
}

const NewItem = ({ existingItems = false }: NewItemProps) => {
  const { parsedData, boardId } = useParsedData();
  const [createSuccess, setCreateSuccess] = useState<boolean | null>(null);

  const handleCreateItem = async () => {
    if (!parsedData || !boardId || !parsedData.position) {
      return;
    }
    const institute = institutionOptions.includes(parsedData.University)
      ? parsedData.University
      : "Other";
    
    try {
      const newItem = await createItem(
        boardId,
        parsedData.position?.groupId,
        parsedData.position?.groupTitle,
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
      <Button onClick={handleCreateItem} size={Button.sizes.MEDIUM}>
        Create an Item
      </Button>
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
