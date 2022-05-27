import { NextResponse } from "next/server";

export async function middleware(req, ev) {
  const { pathname } = req.nextUrl;
  console.log(pathname);
  return NextResponse.next();
}
