import { Grid, Typography } from "@mui/material";
import React from "react";
import Rating from "@mui/material/Rating";

const ReviewItem = ({ review }) => {
  return (
    <div>
      {review.map((item, index) => {
        return (
          <Grid containerkey={`${item.id}-${index}`} sx={{ display: "flex",flexDirection:"column" }}>
            <Grid item xs={12}>
              <Typography
                fontSize={"18px"}
                fontWeight={700}
                sx={{ color: "black" }}
              >
                {item?.user}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Rating value={item?.rating} readOnly />
            </Grid>
            <Grid item xs={12}>
              <p>{item?.comment}</p>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
};

export default ReviewItem;
