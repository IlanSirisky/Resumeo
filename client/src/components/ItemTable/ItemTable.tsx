import { useEffect, useState } from "react";
import {
  Text,
  Loader,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
} from "monday-ui-react-core";
import { useCheckDuplicates } from "../../hooks/useCheckDuplicates";
import { DupsFoundContainer, TableContainer } from "./styles";
import { Heading } from "monday-ui-react-core/next";
import NewItem from "../NewItem/NewItem";
import { useParsedData } from "../../contexts/dataContext";
import { getBoardColumns } from "../../hooks/useGetColumns";
import { IColumnTypes, IItemTypes } from "../../types/mondayViewsTypes";
import { ITableColumn } from "monday-ui-react-core/dist/types/components/Table/Table/Table.js";

const ItemTable = () => {
  const { parsedData } = useParsedData();
  const [columns, setColumns] = useState<IColumnTypes[]>([]);
  const { data, error, isLoading } = useCheckDuplicates(
    parsedData?.Email || ""
  );

  const items: IItemTypes[] = data?.items || [];

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const boardColumns: IColumnTypes[] = await getBoardColumns(6888206890);
        setColumns(boardColumns);
      } catch (error) {
        console.error("Error fetching board columns:", error);
      }
    };

    fetchColumns();
  }, []);

  if (!parsedData) {
    return null;
  }

  const tableColumns: ITableColumn[] = [
    ...columns
      .filter((column) => column.title !== "CV")
      .map((column) => ({
        id: column.id,
        title: column.title,
        width: 125,
      })),
  ];

  const tableData = items.map((item: IItemTypes) => {
    const rowData: { [key: string]: string } = { id: item.id, name: item.name };
    columns.forEach((column) => {
      const colValue = item.column_values.find(
        (col: any) => col.id === column.id
      );
      if (column.id === "name") {
        rowData[column.id] = item.name;
        return;
      }
      rowData[column.id] = colValue ? colValue.text : "N/A";
    });
    return rowData;
  });

  return (
    <TableContainer>
      {isLoading && <Loader />}
      {error && <Text type={Text.types.TEXT1}>{error.message}</Text>}
      {items && items.length > 0 ? (
        <>
          <DupsFoundContainer>
            <Heading type={Heading.types.H3}>Duplicates Found:</Heading>
            <Table
              columns={tableColumns}
              emptyState={<Text>No items found</Text>}
              errorState={<Text>Failed to load items</Text>}>
              <TableHeader>
                {tableColumns.map((col) => (
                  <TableHeaderCell key={col.id} title={col.title} />
                ))}
              </TableHeader>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.id}>
                    {tableColumns.map((col) => (
                      <TableCell key={col.id}>{row[col.id]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DupsFoundContainer>
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
