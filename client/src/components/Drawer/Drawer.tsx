import { Button, Text, TextArea } from "monday-ui-react-core";
import { Heading } from "monday-ui-react-core/next";
import {
  Backdrop,
  DrawerContent,
  DrawerWrapper,
  CloseIconButton,
  CommentContainer,
  CommentHeader,
  CommentsContainer,
  TextAreaContainer,
  DrawerHeader,
  NoCommentsContainer,
} from "./styles";
import { Close } from "monday-ui-react-core/icons";
import { addCommentToItem } from "../../hooks/useCreateUpdate";
import { fetchItemCommentHistory } from "../../hooks/useItemCommentHistory";
import { ICommentHistory } from "../../types/mondayViewsTypes";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { stripHtmlTags } from "../../utils/stripHtmlTags";
import monday from "../../configs/mondaySdk";

interface DrawerProps {
  isOpen: boolean;
  handleDrawerState: () => void;
  itemId: number | null;
  itemName: string;
}

const Drawer = ({
  isOpen,
  handleDrawerState,
  itemId,
  itemName,
}: DrawerProps) => {
  const [comment, setComment] = useState<string>("");
  const [commentHistory, setCommentHistory] = useState<ICommentHistory[]>();

  useEffect(() => {
    if (itemId) {
      fetchItemCommentHistory(itemId)
        .then((res) => {
          setCommentHistory(res);
        })
        .catch((error) => {
          console.error("Error fetching comment history:", error);
        });
    }
  }, [itemId]);

  const toggleDrawer = () => {
    handleDrawerState();
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleAddComment = async () => {
    if (itemId && comment !== "") {
      try {
        await addCommentToItem(itemId, comment);
        const updatedComments = await fetchItemCommentHistory(itemId);
        setCommentHistory(updatedComments);
        setComment("");
        monday.execute("notice", {
          message: "Comment added successfully",
          type: "success",
          timeout: 5000,
        });
      } catch (error) {
        console.error("Error adding comment:", error);
        monday.execute("notice", {
          message: "Failed to add comment",
          type: "error",
          timeout: 5000,
        });
      }
    }
  };

  return (
    <>
      <Backdrop isOpen={isOpen} onClick={toggleDrawer} />
      <DrawerWrapper isOpen={isOpen}>
        <DrawerContent>
          <DrawerHeader>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <CloseIconButton
                kind={Button.kinds.TERTIARY}
                size={Button.sizes.XS}
                onClick={toggleDrawer}>
                <Close size={16} />
              </CloseIconButton>
            </div>
            <Heading type={Heading.types.H3}>{itemName}</Heading>
          </DrawerHeader>
          <TextAreaContainer>
            <Text type={Text.types.TEXT2}>Write an update...</Text>
            <TextArea value={comment} onChange={handleCommentChange} />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={handleAddComment}
                kind={Button.kinds.PRIMARY}
                size={Button.sizes.SMALL}>
                Add Comment
              </Button>
            </div>
          </TextAreaContainer>
          <CommentsContainer>
            {commentHistory?.length !== 0 ? (
              commentHistory?.map((comment) => (
                <CommentContainer key={comment.id}>
                  <CommentHeader>
                    <Text type={Text.types.TEXT2} weight={Text.weights.BOLD}>
                      {comment.creator.name}
                    </Text>
                    <Text type={Text.types.TEXT3}>
                      {formatDate(comment.created_at)}
                    </Text>
                  </CommentHeader>
                  <Text ellipsis={false}>{stripHtmlTags(comment.body)}</Text>
                </CommentContainer>
              ))
            ) : (
              <NoCommentsContainer>
                <Text type={Text.types.TEXT1}>
                  No updates yet for this item
                </Text>
              </NoCommentsContainer>
            )}
          </CommentsContainer>
        </DrawerContent>
      </DrawerWrapper>
    </>
  );
};

export default Drawer;
