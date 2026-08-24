import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SmartRent",
    template: "%s | SmartRent",
  },
  description: "Discover, book, and manage short- and long-term rentals.",
};

export default function RootLayout({children}: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
