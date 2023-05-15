import { Box, Grid, Typography } from "@mui/material";

export default function ApiError() {
  return (
    <>
      <Box
        sx={{
          padding: "310px 0",
          textAlign: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Grid sx={{ justifyContent: "center", display: "flex", padding: "25px" }}>
          <Typography sx={{ fontSize: "25px", fontWeight: "200" }}>
            Something Went Wrong. Please Try Again Later.
          </Typography>
        </Grid>
      </Box>
    </>
  );
}
