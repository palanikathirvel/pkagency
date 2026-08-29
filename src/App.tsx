import { Component, lazy, Suspense, useEffect, type ReactNode } from "react";
import { HashRouter, Route, Routes, useLocation, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

const Home = lazy(() => import("./pages/Home"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const WorkPage = lazy(() => import("./pages/WorkPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div
      className="flex min-h-[70vh] items-center justify-center"
      role="status"
      aria-label="Loading page"
    >
      <span className="relative flex h-14 w-14 items-center justify-center">
        <span className="absolute inset-0 rounded-full border-2 border-mist/10" />
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-royal motion-reduce:animate-none" />
        <span className="font-display text-sm font-extrabold text-royal">PK</span>
      </span>
    </div>
  );
}

/** Catches runtime errors so a broken page never renders as a blank screen. */
class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-[70vh] items-center justify-center px-5">
          <div className="max-w-md rounded-3xl border border-flare/30 bg-ink-850 p-8 text-center shadow-2xl">
            <p className="font-mono text-[11px] tracking-[0.24em] text-flare uppercase">
              Something went wrong
            </p>
            <h1 className="font-display mt-3 text-2xl font-bold text-mist">
              This page hit an unexpected error.
            </h1>
            <p className="mt-3 font-mono text-xs leading-relaxed break-words text-fog">
              {this.state.error.message}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-primary mt-6"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center pt-[72px] text-center">
      <p className="font-mono text-xs tracking-[0.3em] text-royal uppercase">
        Error 404
      </p>
      <h1 className="font-display mt-4 text-5xl font-extrabold tracking-tight text-mist sm:text-7xl">
        Page <span className="grad-text">Lost.</span>
      </h1>
      <p className="mt-4 max-w-sm text-fog">
        The page you're looking for doesn't exist — but your next project
        could.
      </p>
      <Link to="/" className="btn-primary mt-8">
        Back to Home
      </Link>
    </main>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="relative flex min-h-screen flex-col bg-ink-950 text-mist">
        <Navbar />
        <div className="flex-1">
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/work" element={<WorkPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </div>
        <Footer />
        <WhatsAppFloat />
      </div>
    </HashRouter>
  );
}
