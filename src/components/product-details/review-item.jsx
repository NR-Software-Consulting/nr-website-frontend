import { Grid, Typography } from "@mui/material";
import React from "react";
import Rating from "@mui/material/Rating";

const ReviewItem = ({ review }) => {
  return (
    <Grid
      container
      item
      md={12}
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {review.map((item, index) => {
        return (
          <Grid item md={5.8} key={`${item.id}-${index}`}>
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
            {item?.link ? (
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                }}
              >
                <img
                  src="/right-sign.png"
                  alt="pointer"
                  style={{ height: "25px", width: "25px" }}
                />
                <a href={item?.link} target="blank">
                  <Typography style={{ color: "var(--tp-theme-primary)" }}>
                    Click here to watch Customer Review
                  </Typography>
                </a>
              </Grid>
            ) : null}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ReviewItem;
