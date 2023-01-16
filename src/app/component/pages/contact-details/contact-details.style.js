export const headerTab = (selected, firstElement) => ({
  padding: "6px 16px",
  paddingLeft: firstElement ? "0px" :"16px",
  paddingRight: firstElement ? "40px" :"16px",
  //background: selected ? "#E7E7E7": "",
  boxShadow: selected ? "rgb(221 221 221) 0px -1px 3px 1px" : "",
  display: "flex",
  alignItems: "center",
});

export const avatar = {
  borderRadius: "200px",
  padding: "7px",
  fontSize: "13px",
  background: "rgb(13, 110, 253)",
  color: "white",
  marginRight: "5px",
  alignItems: "center",
  justifyContent: "center",
};
export const fullName = {
  margin: "0px",
};
export const mainContainer = {
  display: "flex",
};
export const interactionWindowContainer = (showWindow) => ({
  visibility: showWindow ? "visible" : "hidden",
  marginTop: "30px",
  width: showWindow ? "70%" : "0px",
  height: showWindow ? "100%" : "0px",
  padding: showWindow ? "16px" : "0px",
  boxShadow: "#E7E7E7 -1px 0px 24px 8px"
});