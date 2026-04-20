import { Toaster } from "@/components/ui/sonner";
import { Outlet, RouterProvider, createRouter } from "@tanstack/react-router";
import { createRootRoute, createRoute, redirect } from "@tanstack/react-router";
import AdminRoute from "./components/AdminRoute";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";

// Lazy page imports
import { Suspense, lazy } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const VotePage = lazy(() => import("./pages/VotePage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const AdminCandidatesPage = lazy(() => import("./pages/AdminCandidatesPage"));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: () => (
    <Layout>
      <NotFoundPage />
    </Layout>
  ),
});

// Index route — redirects based on auth
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    const raw = localStorage.getItem("ghana_votes_auth");
    if (raw) {
      throw redirect({ to: "/vote" });
    }
    throw redirect({ to: "/login" });
  },
  component: () => null,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <LoginPage />
      </Suspense>
    </Layout>
  ),
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <RegisterPage />
      </Suspense>
    </Layout>
  ),
});

const voteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vote",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute>
          <VotePage />
        </ProtectedRoute>
      </Suspense>
    </Layout>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <AdminRoute>
          <AdminPage />
        </AdminRoute>
      </Suspense>
    </Layout>
  ),
});

const adminCandidatesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/candidates",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <AdminRoute>
          <AdminCandidatesPage />
        </AdminRoute>
      </Suspense>
    </Layout>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  voteRoute,
  adminRoute,
  adminCandidatesRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </>
  );
}
