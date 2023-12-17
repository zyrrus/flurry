import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import ClientProviders from "~/app/client-providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Flurry",
  description: "Get fluent fast.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const routes = ["Home", "Courses", "Practice", "Profile", "Settings"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans ${inter.variable} px-4`}>
          <TRPCReactProvider cookies={cookies().toString()}>
            <ClientProviders>
              <nav className="mb-8">
                <ul className="flex flex-row flex-wrap items-center gap-x-6 gap-y-1">
                  <li className="">
                    <a className="hover:underline" href="/">
                      Flurry Homepage
                    </a>
                  </li>
                  {routes.map((route) => (
                    <li>
                      <a
                        className="hover:underline"
                        href={`/${route.toLowerCase()}`}
                      >
                        {route}
                      </a>
                    </li>
                  ))}
                  <SignedIn>
                    <li>
                      <UserButton showName />
                    </li>
                  </SignedIn>
                  <SignedOut>
                    <li>
                      <SignInButton />
                    </li>
                    <li>
                      <SignUpButton />
                    </li>
                  </SignedOut>
                </ul>
              </nav>
              {children}
            </ClientProviders>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
