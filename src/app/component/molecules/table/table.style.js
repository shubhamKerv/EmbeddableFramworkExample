export const backgroundColor = {
  even: "#F4F3F3",
  odd: "#ffffff",
  sortedEven: "#E7E7E7",
  sortedOdd: "#F4F3F3",
};
export const backgroundImages = {
  both: 'https://cdn.datatables.net/1.11.5/images/sort_both.png',
  sortAcs: 'https://cdn.datatables.net/1.11.5/images/sort_asc.png',
  sortDesc: 'https://cdn.datatables.net/1.11.5/images/sort_desc.png'
};
export const headerCell = ( backgroundImageUrl, width ) => ({
  textAlign: "left",
  padding: "10px 18px", 
  borderBottom: "1px solid #111", 
  width: width, 
  backgroundImage: `url(${backgroundImageUrl})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center right"
});
export const dataRow = ( rowIndex ) => ({
  textAlign: "left", 
  backgroundColor: (rowIndex%2) ? backgroundColor.even: backgroundColor.odd,
});
export const dataCell = ( rowIndex, rowLength, sortedColumnIndex, cellIndex ) => ({
  padding: "10px 18px", 
  borderBottom: (rowIndex == rowLength-1) ? "1px solid #111" : "",
  backgroundColor: (sortedColumnIndex == cellIndex+1) 
    ? (rowIndex%2)
      ?	backgroundColor.sortedEven
      : backgroundColor.sortedOdd
    :	(rowIndex%2)
      ?	backgroundColor.even
      : backgroundColor.odd
});