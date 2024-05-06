import {
  clerkMiddleware,
  createRouteMatcher
} from '@clerk/nextjs/server';

//protected all routes except homepage
const isProtectedRoute = createRouteMatcher([
  // ["/" ],
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};