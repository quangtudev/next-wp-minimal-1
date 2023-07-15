import NextApp from 'next/app';

import { SiteContext, useSiteContext } from 'hooks/use-site';
import { SearchProvider } from 'hooks/use-search';

import { getSiteMetadata } from 'lib/site';
import NextNProgress from 'nextjs-progressbar';
import { getAllMenus } from 'lib/menus';

import 'styles/globals.scss';
import variables from 'styles/_variables.module.scss';

function App({ Component, pageProps = {}, metadata, menus }) {
  const site = useSiteContext({
    metadata,
    menus,
  });

  return (
    <SiteContext.Provider value={site}>
      <SearchProvider>
        <NextNProgress height={4} color={variables.progressbarColor} />
        <Component {...pageProps} />
      </SearchProvider>
    </SiteContext.Provider>
  );
}

App.getInitialProps = async function (appContext) {
  const appProps = await NextApp.getInitialProps(appContext);

  const { menus = [] } = await getAllMenus();

  return {
    ...appProps,
    metadata: await getSiteMetadata(),
    menus,
  };
};

export default App;
