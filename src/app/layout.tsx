import type { Metadata } from "next";
import { Manrope, Poppins } from "next/font/google";
import "./globals.css";
import { ContactModalProvider } from "@/contexts/ContactModalContext";
import ContactModalWrapper from "@/components/ContactModalWrapper";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Supreme Animation Studio | 2D & 3D Animation Services",
    template: "%s | Supreme Animation Studio",
  },
  description:
    "Professional 2D & 3D animation studio founded in 2016. Specializing in explainer videos, motion graphics, character animation, architectural visualization, and AI-enhanced animation workflows. Serving Insurance, Real Estate, Kids Content, and more.",
  keywords: [
    "animation studio",
    "2D animation",
    "3D animation",
    "explainer videos",
    "motion graphics",
    "character animation",
    "architectural visualization",
    "real estate animation",
    "insurance explainer videos",
    "kids animation",
    "AI animation",
    "video production",
    "Supreme Animation",
  ],
  authors: [{ name: "Supreme Animation Studio" }],
  creator: "Supreme Animation Studio",
  publisher: "Supreme Animation Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://supremeanimation.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Supreme Animation Studio",
    title: "Supreme Animation Studio | 2D & 3D Animation Services",
    description:
      "Professional 2D & 3D animation studio founded in 2016. Specializing in explainer videos, motion graphics, character animation, and AI-enhanced workflows.",
    images: [
      {
        url: "/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Supreme Animation Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Supreme Animation Studio | 2D & 3D Animation Services",
    description:
      "Professional 2D & 3D animation studio. Specializing in explainer videos, motion graphics, character animation, and AI-enhanced workflows.",
    images: ["/thumbnail.png"],
    creator: "@supreme_animation_studio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Animation & Video Production",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Supreme Animation Studio",
  "url": "https://supremeanimation.com",
  "logo": "https://supremeanimation.com/Logo04.png",
  "foundingDate": "2016",
  "description": "Professional 2D & 3D animation studio specializing in explainer videos, motion graphics, character animation, architectural visualization, and AI-enhanced animation workflows.",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "info@supremeanimation.com",
    "contactType": "Customer Service",
    "availableLanguage": "English"
  },
  "sameAs": [
    "https://www.linkedin.com/in/satnam-sidhu/",
    "https://www.artstation.com/supremeanimation",
    "https://www.instagram.com/supreme_animation_studio?igsh=MjRiYXR5NW9ueXA4&utm_source=qr",
    "https://youtube.com/@supremeanimationstudio?si=vXdH8wJXAE3SNhf3",
    "https://www.behance.net/supremeanimation",
    "https://vimeo.com/supremeanimation"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "E-190, Fourth Floor, Phase 8B",
    "addressLocality": "Mohali",
    "addressRegion": "Punjab",
    "postalCode": "160055",
    "addressCountry": "IN"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${poppins.variable}`}>
        <ContactModalProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          />
          {children}
          <ContactModalWrapper />
        </ContactModalProvider>
      </body>
    </html>
  );
}
