import { Suspense } from "react";
import UpdateItemForm from "./updateItems";

export default function UpdateItemPage() {
  return (
    <Suspense fallback={<div className="p-10">Loading item editor...</div>}>
      <UpdateItemForm />
    </Suspense>
  );
}
