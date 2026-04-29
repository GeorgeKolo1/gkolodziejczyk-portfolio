import "./globals.css";

export const metadata = {
  title: "George M. Kolodziejczyk — PhD student & Research Software Engineer",
  description:
    "PhD student at the University of Surrey & Animal and Plant Health Agency, working on machine learning and research software for pathogen genomics.",
  authors: [{ name: "George M. Kolodziejczyk" }],
  openGraph: {
    title: "George M. Kolodziejczyk",
    description:
      "PhD student & Research Software Engineer — machine learning and research software for pathogen genomics.",
    type: "website",
    locale: "en_GB",
  },
};

export const viewport = {
  themeColor: "#fbfaf6",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
