import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://cvb-office.de'),
  title: 'CVB-Office: Dein digitales Vermiet-Office | Caravan-Vermieter-Bund',
  description:
    'Anfrage, Buchung, Vertrag und Übergabe an einem Ort. Entwickelt für Wohnmobil- und Caravan-Vermieter im Caravan-Vermieter-Bund.',
  alternates: {
    canonical: 'https://cvb-office.de/',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    url: 'https://cvb-office.de/',
    title: 'CVB-Office: Dein digitales Vermiet-Office',
    description:
      'Anfrage, Buchung, Vertrag und Übergabe an einem Ort. Ein Angebot des Caravan-Vermieter-Bund.',
    images: [
      {
        url: '/favicon.svg',
      },
    ],
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CVB-Office: Dein digitales Vermiet-Office',
    description:
      'Anfrage, Buchung, Vertrag und Übergabe an einem Ort. Ein Angebot des Caravan-Vermieter-Bund.',
    images: ['/favicon.svg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://cvb-office.de/#organization',
      name: 'Caravan-Vermieter-Bund',
      url: 'https://caravan-vermieter-bund.de',
      logo: 'https://cvb-office.de/favicon.svg',
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'info@caravan-vermieter-bund.de',
        contactType: 'customer service',
        areaServed: 'DE',
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://cvb-office.de/#software',
      name: 'CVB-Office',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web browser',
      offers: {
        '@type': 'Offer',
        price: '8.33',
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '8.33',
          priceCurrency: 'EUR',
          unitText: 'Fahrzeug / Monat netto',
        },
      },
      provider: {
        '@id': 'https://cvb-office.de/#organization',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de-DE">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#FFFFFF] text-[#384808] antialiased selection:bg-[#A09048] selection:text-white">
        {children}
      </body>
    </html>
  );
}

