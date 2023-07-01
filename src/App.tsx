import { AppShell, MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";

export default function App() {
  const isLoggedIn = true;

  return (
    <BrowserRouter>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <AppShell>
          <Routes>
            <Route path="/" element={isLoggedIn ? <Home /> : <Auth />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppShell>
      </MantineProvider>
    </BrowserRouter>
  );
}
