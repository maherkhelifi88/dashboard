import { type NextRequest, NextResponse } from "next/server";
import { authenticatedUser } from "./utils/amplify-server-utils";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const user = await authenticatedUser({ request, response });

  const isOnDashboard = request.nextUrl.pathname.startsWith("/admin/default");
  const isOnAdminArea =
    request.nextUrl.pathname.startsWith("/admin/default/admins");

  if (isOnDashboard) {
    if (!user)
      return NextResponse.redirect(new URL("/auth/sign-in", request.nextUrl));
    if (isOnAdminArea && !user.isAdmin)
      return NextResponse.redirect(new URL("/admin/default", request.nextUrl));
    return response;
  } else if (user) {
    return NextResponse.redirect(new URL("/admin/default", request.nextUrl));
  }
}

export const config = {
  /*
   * Match all request paths except for the ones starting with
   */
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};