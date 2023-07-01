import { AppShell, MantineProvider } from "@mantine/core";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATH_HOME, PATH_LOGIN, PATH_REGISTER } from "./constants/paths";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import { RootState } from "./store";

export default function App() {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <BrowserRouter>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <AppShell>
          <Routes>
            <Route
              path={PATH_HOME}
              element={isLoggedIn ? <Home /> : <Auth />}
            />
            <Route path={PATH_REGISTER} element={<Register />} />
            <Route path={PATH_LOGIN} element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppShell>
      </MantineProvider>
    </BrowserRouter>
  );
}
