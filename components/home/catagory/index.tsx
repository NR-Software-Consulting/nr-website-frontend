import NRImage from "@/components/NRImage";
import { Categories, SubCategories } from "@/components/json-data/data";
import { CustomContainer } from "@/components/layout";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

const Category = () => {
  return (
    <Box sx={{ marginTop: "30px" }}>
      <CustomContainer>
        <Grid
          container
          item
          xs={11.5}
          sm={11.5}
          md={11.5}
          lg={12}
          sx={{ margin: "auto" }}
        >
          {Categories.map((data, id) => {
            return (
              <Grid
                key={id}
                container
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                gap={1}
                sx={{ paddingBottom: "30px" }}
              >
                <Grid item xs={12} sm={12} md={12} lg={2.5}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent sx={{ height: "100%" }}>
                      <CardMedia image={data.img} sx={{ height: "85%" }}>
                        <Typography>{data.text}</Typography>
                      </CardMedia>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={9.2}
                  spacing={1}
                >
                  {SubCategories.map((data, id) => {
                    return (
                      <Grid item xs={6} sm={6} md={3} lg={3}>
                        <Card key={id}>
                          <CardContent
                            sx={{
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <Typography>{data.text}</Typography>
                            <Box sx={{ height: 63, width: "60%" }}>
                              <NRImage
                                src={data.img}
                                alt="deals img"
                                style={{ borderRadius: "5px" }}
                              />
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </CustomContainer>
    </Box>
  );
};

export default Category;
