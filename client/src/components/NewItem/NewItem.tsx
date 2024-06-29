import { Button } from "monday-ui-react-core";
import { StyledSubtext } from "../../styles/globalDivs";
import { NewItemContainer } from "./styles";
import { useParsedData } from "../../contexts/dataContext";
import { createItem } from "../../hooks/useCreateItem";
import { institutionOptions } from "../../constants/institutionOptions";
import { showNotification } from "../../configs/mondaySdk";

interface NewItemProps {
  existingItems?: boolean;
}

const NewItem = ({ existingItems = false }: NewItemProps) => {
  const { parsedData, boardId, columns } = useParsedData();

  const handleCreateItem = async () => {
    if (!parsedData || !boardId || !parsedData.position) {
      if (!parsedData?.position || !!parsedData?.Name || !!parsedData?.Email) {
        showNotification("Name, Email, and Position are required", "error");
      }
      return;
    }

    const institute = institutionOptions.includes(parsedData.University)
      ? parsedData.University
      : "Other";

    try {
      await createItem(
        boardId,
        columns,
        parsedData.position?.groupId,
        parsedData.position?.groupTitle,
        parsedData.Name,
        parsedData.Email,
        parsedData.Phone,
        institute
      );
      showNotification("Item created successfully", "success");
    } catch (error) {
      showNotification("Failed to create item", "error");
    }
  };

  return (
    <NewItemContainer>
      {existingItems && <StyledSubtext>Not the same candidate?</StyledSubtext>}
      <Button onClick={handleCreateItem} size={Button.sizes.MEDIUM}>
        Create an Item
      </Button>
    </NewItemContainer>
  );
};

export default NewItem;
