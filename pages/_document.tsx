import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="cs">
      <Head>
        {/* Google Search Console */}
        <meta name="google-site-verification" content="rwB6eu8CzPNSuerN0fPLhk23OsHCFLnO1yWeikj4De8" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
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
        
        {/* CookieHub */}
        <Script
          src="https://cdn.cookiehub.eu/c2/29a4b0cf.js"
          strategy="afterInteractive"
        />
        <Script
          id="cookiehub-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener("DOMContentLoaded", function(event) {
                var cpm = {};
                window.cookiehub.load(cpm);
              });
            `,
          }}
        />
      </body>
    </Html>
  )
}

