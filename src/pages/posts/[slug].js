import { Helmet } from 'react-helmet';
import { ArticleJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';
import Layout from 'components/Layout';
import Container from 'components/Container';
import styles from 'styles/pages/Post.module.scss';
import { getPostBySlug, getRelatedPosts } from 'lib/posts';
import { categoryPathBySlug } from 'lib/categories';

export default function Post({ post }) {
  const {
    title,
    metaTitle,
    description,
    featuredImage,
  } = post;

  const { metadata: siteMetadata = {} } = useSite();

  if (!post.og) {
    post.og = {};
  }

  post.og.imageUrl = featuredImage.sourceUrl;
  post.og.imageSecureUrl = post.og.imageUrl;
  post.og.imageWidth = 2000;
  post.og.imageHeight = 1000;

  const { metadata } = usePageMetadata({
    metadata: {
      ...post,
      title: metaTitle,
      description: description || post.og?.description || `Read more about ${title}`,
    },
  });

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = title;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  return (
    <Layout>
      <Helmet {...helmetSettings} />

      <ArticleJsonLd post={post} siteTitle={siteMetadata.title} />

      <div className={styles.postContainer}>
        <Container>
          <h1
            className={styles.title}
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />

          <p style={{ fontFamily: 'sans-serif' }}>You are being redirected to the post, please wait 1-2 seconds...</p>
        </Container>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const params = context?.params;
  const { post } = await getPostBySlug(params?.slug);

  if (!post) {
    return {
      props: {},
      notFound: true,
    };
  }

  // Always perform a redirect
  const targetURL = `${process.env.WORDPRESS_REDIRECT_DOMAIN}/${encodeURIComponent(context.params.slug)}/`;
  context.res.writeHead(307, { Location: targetURL });
  context.res.end();

  // This code will never be reached, but you can keep it if needed
  const { categories, databaseId: postId } = post;
  const { category: relatedCategory, posts: relatedPosts } = (await getRelatedPosts(categories, postId)) || {};
  const hasRelated = relatedCategory && Array.isArray(relatedPosts) && relatedPosts.length;

  const props = {
    post,
  };

  if (hasRelated) {
    props.related = {
      posts: relatedPosts,
      title: {
        name: relatedCategory.name || null,
        link: categoryPathBySlug(relatedCategory.slug),
      },
    };
  }

  return {
    props,
  };
}
