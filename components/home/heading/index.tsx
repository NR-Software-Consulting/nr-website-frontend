import { CustomContainer } from "@/components/layout";
import { Box, Typography } from "@mui/material";
import React from "react";
interface Props {
  title: any;
}
const Heading = ({ title }: Props) => {
  return (
    <Box sx={{ margin: "30px" }}>
      <CustomContainer>
        <Typography sx={{ fontSize: 20, fontWeight: 500 }}>{title}</Typography>
      </CustomContainer>
    </Box>
  );
};

export default Heading;
