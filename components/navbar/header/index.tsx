import React from "react";
import { styles } from "./styles";
import {
  Box,
  useTheme,
  Toolbar,
  AppBar,
  Typography,
  useMediaQuery,
  TextField,
} from "@mui/material";
import NRImage from "@/components/NRImage";
import NRLogo from "../../../public/NRlogo.jpg";
import { HeaderData } from "@/components/json-data/data";
import ResponsiveHeader from "./responsiveHeader";
import { useRouter } from "next/router";
import { SearchButton } from "@/components/NRButton";

const Header = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <AppBar elevation={0} sx={styles.Appbar}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{ height: 110, width: 200, cursor: "pointer" }}
          onClick={() => {
            router.push("/");
          }}
        >
          <NRImage src={NRLogo} alt="NR Logo" />
        </Box>
        {isMatch ? (
          <>
            <ResponsiveHeader />
          </>
        ) : (
          <>
            <Box sx={{ display: "flex" }}>
              <TextField
                sx={styles.TextField}
                placeholder="Search Your Product Here"
              />
              <SearchButton title={"Search"} />
            </Box>
            <Box sx={styles.headerdata}>
              {HeaderData.map((header) => {
                return (
                  <Typography
                    sx={{ paddingLeft: "20px" }}
                    onClick={() => {
                      router.push(header.link);
                    }}
                  >
                    {header.name}
                  </Typography>
                );
              })}
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
