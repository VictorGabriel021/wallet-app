import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/session";

export async function DELETE() {
  deleteSession();
  return NextResponse.json({ success: true });
}
