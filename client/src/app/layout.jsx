"use client"
import { Open_Sans } from "next/font/google";
export const openSans = Open_Sans({
  subsets: ["latin"]
}); // THEME PROVIDER

import ThemeProvider from "theme/theme-provider"; // PRODUCT CART PROVIDER

import CartProvider from "contexts/CartContext"; // SITE SETTINGS PROVIDER

import SettingsProvider from "contexts/SettingContext"; // GLOBAL CUSTOM COMPONENTS

import RTL from "components/rtl";
import ProgressBar from "components/progress"; // IMPORT i18n SUPPORT FILE

import "i18n";
import { useRouter } from "next/navigation";
import ShopLayout3 from "components/layouts/shop-layout-3/shop-layout-3";
export default function RootLayout({
  children
}) {
  // const router = useRouter()
  // router.push('/home')
  return <html lang="en" suppressHydrationWarning>
      <body className={openSans.className}>
        <CartProvider>
          <SettingsProvider>
            <ThemeProvider>
              <ProgressBar />
              <RTL>{children}</RTL>
              {/* <ShopLayout3>{children}</ShopLayout3> */}
            </ThemeProvider>
          </SettingsProvider>
        </CartProvider>
      </body>
    </html>;
}