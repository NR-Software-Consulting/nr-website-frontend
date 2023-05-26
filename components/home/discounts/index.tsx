import { CustomContainer } from "@/components/layout";
import { styles } from "./styles";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { ProductImages } from "@/components/json-data/data";
import Countdown from "react-countdown";
import NRImage from "@/components/NRImage";

const DiscountsTag = () => {
  const Completionist = () => <span>Your Time's Up</span>;

  return (
    <Box sx={styles.MainBox}>
      <CustomContainer>
        <Grid
          container
          item
          xs={11.5}
          sm={11.5}
          md={11.5}
          lg={12}
          columnGap={1.2}
          sx={styles.innergrid}
        >
          <Grid item xs={12} sm={11.9} md={12} lg={1.9}>
            <Card sx={styles.dealscard}>
              <CardContent>
                <Typography sx={{ fontSize: 20 }}>Deal of the Day</Typography>
                <Typography sx={{ fontSize: 12 }}>
                  Hot selling Products
                </Typography>
                <Box sx={{paddingTop:"10px"}}>
                  <Countdown date={Date.now() + 2000000000}>
                    <Completionist />
                  </Countdown>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          {ProductImages.slice(0, 5).map((data) => {
            return (
              <Grid item xs={12} sm={5.9} md={3.93} lg={1.9}>
                <Card>
                  <CardContent>
                    <Box sx={{ height: 100, width: "100%" }}>
                      <NRImage src={data.img} alt="deals img" />
                    </Box>
                    <Typography>well meaning and kindly.</Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </CustomContainer>
    </Box>
  );
};

export default DiscountsTag;
