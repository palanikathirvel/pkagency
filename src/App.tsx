import { lazy, Suspense, useEffect } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
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
    <div className="flex min-h-[70vh] items-center justify-center" role="status" aria-label="Loading page">
      <span className="relative flex h-14 w-14 items-center justify-center">
        <span className="absolute inset-0 rounded-full border-2 border-mist/10" />
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-royal" />
        <span className="font-display text-sm font-extrabold text-royal">PK</span>
      </span>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="relative flex min-h-screen flex-col bg-ink-950 text-mist">
        <Navbar />
        <div className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
        <WhatsAppFloat />
      </div>
    </HashRouter>
  );
}
