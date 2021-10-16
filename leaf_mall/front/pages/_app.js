import React from "react";
import Head from "next/head";
import Wrapper from "../store/configureStore";

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <title>LEAF MALL</title>
        {/* BASIC META */}
        <meta name="subject" content="LEAF MALL"></meta>
        <meta name="title" content="LEAF MALL"></meta>
        <meta name="author" content="LEAF MALL"></meta>
        <meta name="keywords" content="LEAF MALL"></meta>
        <meta name="description" content="LEAF MALL"></meta>

        {/* VIEW META */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="LEAF MALL" />
        <meta property="og:site_name" content="LEAF MALL" />
        <meta property="og:url" content="https://leafmall.com" />
        <meta property="og:description" content="LEAF MALL" />
        <meta property="og:keywords" content="LEAF MALL" />
        <meta property="og:image" content="/og_img.png" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="400" />

        {/* og : 누군가에게 url을 보냈을 때 뜨는것*/}
      </Head>

      <Component />
    </>
  );
};

export default Wrapper.withRedux(App);
