export const styles = {
  mainBox: {
    paddingTop: { xs: "80px", lg: "150px" },
    paddingBottom: "50px",
    backgroundColor: "black",
    color: "white",
  },
  mainGrid: {
    margin: "auto",
    display: "flex",
    justifyContent: "space-around",
    textAlign: "center",
  },
  footerHeadings: {
    textDecoration: "underline",
    textDecorationColor: "red",
    "&:hover": {
      fontStyle: "italic",
      fontSize: "26px",
    },
  },
  SocialIcon: {
    height: 30,
    width: 30,
    cursor: "pointer",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
};
