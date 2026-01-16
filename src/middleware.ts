import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { type NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. DYNAMIC BYPASS LOGIC
  // EXCLUDE ALL Payload API and Admin routes from i18n
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") || // This is good, catches all /api
    pathname.includes("_next") ||
    pathname === "/favicon.ico"
  ) {
    // ✅ ADD LOGGING HERE TO CONFIRM IT'S WORKING
    console.log(`[Middleware] Bypassing i18n for path: ${pathname}`);
    return NextResponse.next();
  }

  // 2. I18N LOGIC
  return intlMiddleware(request);
}

// 2. TIGHTEN THE MATCHER
export const config = {
  // We want to make sure the middleware doesn't even ATTEMPT
  // to run on file uploads or API calls
  matcher: [
    "/((?!api|admin|_next/static|_next/image|assets|favicon.ico|sw.js).*)",
  ],
};
