"use Client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

function Client() {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.creatAI.queryOptions({ text: "abhi" })
  );
  return <div>{JSON.stringify(data)}</div>;
}

export default Client;
