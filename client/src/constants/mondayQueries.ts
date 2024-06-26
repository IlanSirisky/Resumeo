export const getAllItemsInBoardQuery = `
{
  boards(ids: 6888206890) {
    items_page(limit: 100) {
      cursor
      items {
        id
        name
        column_values {
          column {
            title
            id
          }
          text
          value
        }
      }
    }
  }
}
`;
