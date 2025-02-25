import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(["/auth", "/", "/contact", "/about", "/billing", "/explore", "/explore/*", "/api/stripe/webhook"]);

export default convexAuthNextjsMiddleware(async (request) => {
  const isPublic = isPublicPage(request);
  const isAuthenticated = await isAuthenticatedNextjs();

  // Redirect unauthenticated users trying to access non-public pages
  if (!isPublic && !isAuthenticated) {
    return nextjsMiddlewareRedirect(request, "/auth");
  }

  // Redirect authenticated users trying to access public pages (login/signup)
  // if (isPublic && isAuthenticated) {
  //   return nextjsMiddlewareRedirect(request, "/");
  // }

  return;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
