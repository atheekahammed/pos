import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from "@/lib/theme";
import { Roboto } from 'next/font/google';
import { MailLayout } from '@/layouts/MainLayouts';
import "./globals.css";



const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <AppRouterCacheProvider
          options={{ key: 'css' }}>
          <ThemeProvider theme={theme}>
            <MailLayout>
              {children}
            </MailLayout>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
