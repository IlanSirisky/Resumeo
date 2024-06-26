import { Text } from "monday-ui-react-core";
import { useCheckDuplicates } from "../../hooks/useCheckDuplicates";
import { TableContainer } from "./styles";
import { Heading } from "monday-ui-react-core/next";
import NewItem from "../NewItem/NewItem";

interface ItemTableProps {
  email: string;
}

const ItemTable = ({ email }: ItemTableProps) => {
  const { data, error, isLoading } = useCheckDuplicates(email);
  const { items_page_by_column_values } = data || {};
  const { items } = items_page_by_column_values || {};
  if (data) {
    console.log("In table", data.items_page_by_column_values.items);
  }

  return (
    <TableContainer>
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}
      {items && items?.length > 0 ? (
        <>
        <div>
          <Heading type={Heading.types.H3}>Duplicates Found:</Heading>
          {items.map((duplicate: any) => (
            <div key={duplicate.id} style={{ marginBottom: '1em' }}>
              <p><strong>Name:</strong> {duplicate.name}</p>
              {duplicate.column_values.map((col: any) => (
                <p key={col.id}>
                  <strong>{col.id.replace(/_/g, ' ').toUpperCase()}:</strong> {col.text || 'N/A'}
                </p>
              ))}
            </div>
          ))}
        </div>
        <NewItem existingItems={true} />
      </>
      ) : (
        <>
          {!isLoading && (
            <Text type={Text.types.TEXT1}>No duplicates found</Text>
          )}
          <NewItem />
        </>
      )}
    </TableContainer>
  );
};

export default ItemTable;
