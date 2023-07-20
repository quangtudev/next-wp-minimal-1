import { Helmet } from 'react-helmet';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';

import styles from 'styles/pages/404.module.scss';

export default function Custom404() {
  return (
    <Layout>
      <Helmet>
        <title>Create Next App</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Section>
        <Container className={styles.center}>
          <h1>Welcome to my website</h1>
        </Container>
      </Section>
    </Layout>
  );
}

// Next.js method to ensure a static page gets rendered
export async function getStaticProps() {
  return {
    props: {},
  };
}
