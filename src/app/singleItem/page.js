"use client";

import { Suspense } from "react";
import GettingItem from "../../components/GettingItem";

export default function SingleItem() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GettingItem />
    </Suspense>
  );
}
