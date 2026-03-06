import { NextResponse } from "next/server";
import { todos } from "@/mock/Todo";

export async function GET() {
  return NextResponse.json(todos);
}