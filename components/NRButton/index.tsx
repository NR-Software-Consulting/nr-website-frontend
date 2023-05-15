import React from "react";
import { styles } from "./styles";
import { Typography, Button } from "@mui/material";
interface Props {
  title: any;
}
const NRButton = ({ title }: Props) => {
  return (
    <Button>
      <Typography fontSize={"16px"} fontWeight={500}>
        {title}
      </Typography>
    </Button>
  );
};

export default NRButton;

export const SearchButton = ({ title }: Props) => {
  return (
    <Button sx={styles.SearchButton}>
      <Typography fontSize={"16px"} fontWeight={500}>
        {title}
      </Typography>
    </Button>
  );
};
