export const container = {
  marginTop: "30px",
  padding: "16px 16px 1px 16px",
  boxShadow: "#E7E7E7 -1px 0px 24px 8px"
};
export const rowContent = {
  display: "flex",
  marginBottom: "20px",
  paddingBottom: "8px",
  borderBottom: "1px solid grey"
};
export const rowTitle = {
  width: "30%"
};
export const rowValue = (valueStyle) => ({
  ...valueStyle,
  fontWeight: "bold"
});
  