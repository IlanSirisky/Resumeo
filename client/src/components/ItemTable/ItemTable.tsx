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

  return (
    <TableContainer>
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}
      {data?.duplicates?.length > 0 ? (
        <>
          <div>
            <Heading type={Heading.types.H3}>Duplicates Found:</Heading>
            {data.duplicates.map((duplicate: any) => (
              <p key={duplicate.id}>
                {duplicate.name} ({duplicate.email})
              </p>
            ))}
          </div>
          <NewItem existingItems={true} />
        </>
      ) : (
        <>
          {!isLoading && (
            <Text type={Text.types.TEXT1}>No duplicates found</Text>
          )}
        </>
      )}
      <NewItem />
    </TableContainer>
  );
};

export default ItemTable;
