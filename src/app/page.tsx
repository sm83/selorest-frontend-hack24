"use client";

import { useEffect } from "react";

const RootPage = () => {
  useEffect(() => {
    window.location.href = "/initial";
  }, []);

  return <></>;
};

export default RootPage;
