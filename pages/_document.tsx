import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="cs">
      <Head>
        {/* Google Search Console */}
        <meta name="google-site-verification" content="rwB6eu8CzPNSuerN0fPLhk23OsHCFLnO1yWeikj4De8" />
        
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#047857" />
      </Head>
      <body className="antialiased bg-background">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

