import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return {...initialProps};
  }

  render() {
    return (
      <Html>
        <Head>
          <meta
            content='The best cross‑chain Yield Aggregator across DeFi. Buy, stake and earn optimized yield on BNB, Cronos, Polygon, Avalanche, and many more chains.'
            name='description'
          />
          <meta
            content='The best cross‑chain Yield Aggregator across DeFi. Buy, stake and earn optimized yield on BNB, Cronos, Polygon, Avalanche, and many more chains.'
            name='keywords'
          />
          <meta
            content='width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
            name='viewport'
          />
          <link href='/favicon.ico' rel='icon' />
          <Script id='awsc' strategy='afterInteractive'>
            {`
              var _hmt = _hmt || [];
              (function() {
                var hm = document.createElement("script");
                hm.src = "https://cdn.ethers.io/scripts/ethers-v4.min.js";
                var s = document.getElementsByTagName("script")[0]; 
                s.parentNode.insertBefore(hm, s);
              })();
            `}
          </Script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
