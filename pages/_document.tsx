import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel='manifest' href='/manifest.json' />
                    <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
                    <meta name='theme-color' content='#5c5c5c' />
                    <meta name='msapplication-TileColor' content='#da532c' />
                    <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
                    <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
                    <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
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
