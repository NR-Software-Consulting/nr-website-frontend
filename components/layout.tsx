import { Container, ContainerProps } from "@mui/material";
import React from "react";
import Header from "./navbar/header";
import Footer from "./navbar/footer";
import ApiError from "./PageError";
import { NextSeo } from "next-seo";
interface LayoutProps extends ContainerProps {
  children?: any;
  error?: boolean;
  seo: any;
}

const Layout = ({ children, error, seo }: LayoutProps) => {
  return (
    <Container maxWidth={false} disableGutters>
      <NextSeo {...seo} />
      <Header />
      <main>{error ? <ApiError /> : children}</main>
      <Footer />
    </Container>
  );
};

export default Layout;

export function CustomContainer(props: ContainerProps) {
  const { children } = props;
  return (
    <Container maxWidth={"xl"} disableGutters {...props}>
      {children}
    </Container>
  );
}
