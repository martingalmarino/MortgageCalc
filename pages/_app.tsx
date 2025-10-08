import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ 
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
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
      
      <div className={`${inter.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </>
  )
}

