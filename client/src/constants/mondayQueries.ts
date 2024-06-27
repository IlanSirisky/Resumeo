export const getBoardInfoQuery = `
query ($boardId: [ID!]!) {
  boards(ids: $boardId) {
    groups {
      id
      title
    }
    columns {
      id
      title
      type
    }
  }
}
`;
