import {
    convexAuthNextjsMiddleware,
    createRouteMatcher,
    isAuthenticatedNextjs,
    nextjsMiddlewareRedirect,
  } from "@convex-dev/auth/nextjs/server";
  
  const isPublicPage = createRouteMatcher("/auth");
  
  export default convexAuthNextjsMiddleware(async (request) => {
    const isPublic = isPublicPage(request);
    const isAuthenticated = await isAuthenticatedNextjs(); // Assuming it returns a Promise
    
    // Redirect unauthenticated users trying to access non-public pages
    if (!isPublic && !isAuthenticated) {
      return nextjsMiddlewareRedirect(request, "/auth");
    }
  
    // Redirect authenticated users trying to access public pages (login/signup)
    if (isPublic && isAuthenticated) {
      return nextjsMiddlewareRedirect(request, "/");
    }
  
    // Allow request to proceed
    return;
  });
  
  export const config = {
    // Matcher to apply middleware to all routes except static assets and Next.js internals
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  };
  