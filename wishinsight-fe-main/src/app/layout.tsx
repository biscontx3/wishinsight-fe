import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./styles/globals.scss";
import { AppProvider } from "./store/AppContext";
import Header from "./components/Header";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import SignUpModal from "./components/SignUpModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StyledEngineProvider } from "@mui/material/styles";
import LoginModal from "./components/LoginModal/LoginModal";
import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "WishInsight | Where opportunities come to light ",
  description: "WishInsight",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const loggedIn: RequestCookie | undefined = cookieStore?.get("demand-token");
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <AppProvider>
          <StyledEngineProvider injectFirst>
            <Header loggedIn={loggedIn} />
            <ToastContainer />
            <AppRouterCacheProvider>{children}</AppRouterCacheProvider>

            <SignUpModal />
            <LoginModal />
          </StyledEngineProvider>
        </AppProvider>
      </body>
    </html>
  );
}
