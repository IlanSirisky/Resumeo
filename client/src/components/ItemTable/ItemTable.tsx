import { useState } from "react";
import {
  Text,
  Loader,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
  Button,
  Dialog,
  DialogContentContainer,
  TextArea,
} from "monday-ui-react-core";
import { useCheckDuplicates } from "../../hooks/useCheckDuplicates";
import {
  DupsFoundContainer,
  TableContainer,
  dialogContainerStyles,
} from "./styles";
import { Heading } from "monday-ui-react-core/next";
import NewItem from "../NewItem/NewItem";
import { useParsedData } from "../../contexts/dataContext";
import { IItemTypes } from "../../types/mondayViewsTypes";
import { ITableColumn } from "monday-ui-react-core/dist/types/components/Table/Table/Table.js";
import { tableColumnTitles } from "../../constants/tableColumns";
import { addCommentToItem } from "../../hooks/useCreateUpdate";
import { Comment } from "monday-ui-react-core/icons";

const ItemTable = () => {
  const { parsedData, columns } = useParsedData();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");

  const { data, error, isLoading } = useCheckDuplicates(
    parsedData?.Email || ""
  );

  const items: IItemTypes[] = data?.items || [];

  if (!parsedData) {
    return null;
  }

  const handleOpenDialog = (itemId: number) => {
    setSelectedItemId(itemId);
  };

  const handleCloseDialog = () => {
    setSelectedItemId(null);
    setComment("");
  };

  const modifiers = [
    {
      name: "preventOverflow",
      options: {
        mainAxis: false,
      },
    },
  ];

  const handleAddComment = async () => {
    if (selectedItemId && comment) {
      try {
        await addCommentToItem(selectedItemId, comment);
        handleCloseDialog();
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const tableColumns: ITableColumn[] = [
    ...columns
      .filter((column) => tableColumnTitles.includes(column.title))
      .map((column) => ({
        id: column.id,
        title: column.title,
        width: 175,
      })),
    {
      id: "add_comment",
      title: "",
      width: 125,
    },
  ];

  const tableData = items.map((item: IItemTypes) => {
    const rowData: { [key: string]: string | JSX.Element } = {
      id: item.id,
      name: item.name,
    };
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
    rowData["add_comment"] = (
      <Dialog
        showTrigger={[Dialog.hideShowTriggers.CLICK]}
        hideTrigger={[Dialog.hideShowTriggers.CLICK]}
        position={Dialog.positions.BOTTOM}
        modifiers={modifiers}
        content={
          <DialogContentContainer
            type={DialogContentContainer.types.MODAL}
            style={dialogContainerStyles}>
            <TextArea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment here..."
              size="large"
            />
            <Button
              onClick={handleAddComment}
              kind={Button.kinds.SECONDARY}
              size={Button.sizes.SMALL}>
              Add Comment
            </Button>
          </DialogContentContainer>
        }>
        <Button
          onClick={() => handleOpenDialog(+item.id)}
          kind={Button.kinds.TERTIARY}>
          <Comment />
        </Button>
      </Dialog>
    );
    return rowData;
  });

  return (
    <TableContainer>
      {isLoading && <Loader size={Loader.sizes.MEDIUM} />}
      {error && <Text type={Text.types.TEXT1}>{error.message}</Text>}
      {items && items.length > 0 ? (
        <>
          <DupsFoundContainer>
            <Heading type={Heading.types.H3}>Duplicates Found:</Heading>
            <Table
              columns={tableColumns}
              emptyState={<Text>No items found</Text>}
              errorState={<Text>Failed to load items</Text>}>
              <TableHeader className="table-header">
                {tableColumns.map((col) => (
                  <TableHeaderCell key={col.id} title={col.title} />
                ))}
              </TableHeader>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.id as string}>
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
