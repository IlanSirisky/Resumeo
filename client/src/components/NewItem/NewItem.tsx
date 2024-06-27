import { Button } from "monday-ui-react-core";
import { StyledSubtext } from "../../styles/globalDivs";
import { NewItemContainer } from "./styles";
import { useParsedData } from "../../contexts/dataContext";
import { createItem } from "../../hooks/useCreateItem";
import { institutionOptions } from "../../constants/institutionOptions";
import monday from "../../configs/mondaySdk";

interface NewItemProps {
  existingItems?: boolean;
}

const NewItem = ({ existingItems = false }: NewItemProps) => {
  const { parsedData, boardId } = useParsedData();

  const handleCreateItem = async () => {
    if (!parsedData || !boardId || !parsedData.position) {
      if (!parsedData?.position) {
        monday.execute("notice", {
          message: "Position is required",
          type: "error",
          timeout: 5000,
        });
      }
      return;
    }
    const institute = institutionOptions.includes(parsedData.University)
      ? parsedData.University
      : "Other";

    try {
      await createItem(
        boardId,
        parsedData.position?.groupId,
        parsedData.position?.groupTitle,
        parsedData.Name,
        parsedData.Email,
        parsedData.Phone,
        institute
      );
      monday.execute("notice", {
        message: "Item created successfully",
        type: "success",
        timeout: 5000,
      });
    } catch (error) {
      monday.execute("notice", {
        message: "Failed to create item",
        type: "error",
        timeout: 5000,
      });
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
