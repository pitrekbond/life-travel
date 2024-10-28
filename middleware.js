// import { auth } from "./app/_lib/auth";

// export const middleware = auth;

// export const config = {
//   matcher: ["/map"],
// };

import { NextResponse } from "next/server";
import { auth } from "./app/_lib/auth";

export async function middleware(request) {
  // Run authentication
  const response = await auth(request);

  // Redirect to `/map/cities` if the user accesses `/map`
  if (request.nextUrl.pathname === "/map") {
    return NextResponse.redirect(new URL("/map/cities", request.url));
  }

  // Return the response from auth if no redirect is needed
  return response;
}

export const config = {
  matcher: ["/map", "/map/:path*"], // Ensure it applies to all /map routes
};
