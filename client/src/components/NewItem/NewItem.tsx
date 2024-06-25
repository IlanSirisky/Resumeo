import { Button } from "monday-ui-react-core";
import { StyledSubtext } from "../../styles/globalDivs";
import { NewItemContainer } from "./styles";

interface NewItemProps {
  existingItems?: boolean;
}
const NewItem = ({ existingItems = false }: NewItemProps) => {
  return (
    <NewItemContainer>
      {existingItems && <StyledSubtext>Not the same candidate?</StyledSubtext>}
      <Button>Create an Item</Button>
    </NewItemContainer>
  );
};

export default NewItem;
