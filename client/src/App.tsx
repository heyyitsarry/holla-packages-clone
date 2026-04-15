import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import HomePage from "./pages/HomePage";
import Home from "./pages/Home";
import PackageDetail from "./pages/PackageDetail";

function Router() {
  return (
    <Switch>
      {/* Home page — hollaamericana.com/ */}
      <Route path={"/"} component={HomePage} />
      {/* Destinations/Packages listing — hollaamericana.com/packages/ */}
      <Route path={"/destinations"} component={Home} />
      {/* Package detail pages */}
      <Route path={"/packages/:slug"} component={PackageDetail} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
