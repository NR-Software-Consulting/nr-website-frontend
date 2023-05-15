import { Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { HeaderData } from "@/components/json-data/data";
import { useRouter } from "next/router";

const ResponsiveHeader = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const OpenDrawar = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MenuIcon onClick={OpenDrawar} />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { width: "100%", boxShadow: "none" },
        }}
      >
        {HeaderData.map((header) => {
          return (
            <>
              <MenuItem id="basic-MenuItem" onClick={handleClose}>
                <Typography
                  onClick={() => {
                    router.push(header.link);
                  }}
                >
                  {header.name}
                </Typography>
              </MenuItem>
            </>
          );
        })}
      </Menu>
    </>
  );
};

export default ResponsiveHeader;
