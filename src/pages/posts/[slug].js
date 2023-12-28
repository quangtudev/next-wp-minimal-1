import { Helmet } from 'react-helmet';
// import { useEffect } from 'react';

import { getPostBySlug, getRelatedPosts } from 'lib/posts';
import { categoryPathBySlug } from 'lib/categories';
import { ArticleJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';

import Layout from 'components/Layout';
import Container from 'components/Container';
// import FeaturedImage from 'components/FeaturedImage';

import styles from 'styles/pages/Post.module.scss';

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

  // useEffect(() => {
  //   if (process.env.MGID_IN_CONTENT_ID != undefined) {
  //     // Insert ads to content
  //     let contentWrapper = document.getElementById('content-wp'),
  //       arr = [],
  //       temp_index = 0;
  //     contentWrapper.childNodes.forEach((el, el_index) => {
  //       if (el.innerHTML != undefined) {
  //         temp_index++;
  //         if (temp_index % 5 == 0) {
  //           arr.push(el_index);
  //         }
  //       }
  //     });

  //     document.querySelectorAll('.adsWrapper').forEach((el) => {
  //       el.remove();
  //     });

  //     arr.forEach((num) => {
  //       let adsWrapper = document.createElement('div'),
  //         ads = document.createElement('div'),
  //         script = document.createElement('script');

  //       adsWrapper.className = 'adsWrapper';
  //       script.src = `https://jsc.mgid.com/n/b/${process.env.MGID_IN_CONTENT_SRC}.js`;
  //       script.async = true;
  //       ads.id = process.env.MGID_IN_CONTENT_ID;
  //       adsWrapper.appendChild(ads);
  //       adsWrapper.appendChild(script);
  //       contentWrapper.insertBefore(adsWrapper, contentWrapper.childNodes[num]);
  //     });
  //   }
  //   if (process.env.MGID_END_CONTENT_ID != undefined) {
  //     // Insert ads to end of content
  //     let adsEndWrapper = document.createElement('div'),
  //       adsEnd = document.createElement('div'),
  //       scriptEnd = document.createElement('script');
  //     adsEndWrapper.className = 'adsEndWrapper';
  //     scriptEnd.src = `https://jsc.mgid.com/n/b/${process.env.MGID_END_CONTENT_SRC}.js`;
  //     scriptEnd.async = true;
  //     adsEnd.id = process.env.MGID_END_CONTENT_ID;
  //     adsEndWrapper.appendChild(adsEnd);
  //     adsEndWrapper.appendChild(scriptEnd);

  //     document.querySelectorAll('.adsEndWrapper').forEach((el) => {
  //       el.remove();
  //     });

  //     document.getElementById('adsEndWrapper').append(adsEndWrapper);
  //   }
  // });

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
         
            <p style={{fontFamily: 'sans-serif'}}>You are being redirected to the post, please wait 1-2 seconds...</p>
        </Container>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // Always perform a redirect
  
  cons
const targetURL = `${process.env.WORDPRESS_REDIRECT_DOMAIN}/${encodeURIComponent(context.params.slug)}/`;
  context.
  cont

 
res.writeHead(307, { Location: targetURL });
  context.
  context

  c
res.end();
}

    const { categories, databaseId: postId } = post;

    props = {
      post,
      // socialImage: `${process.env.OG_IMAGE_DIRECTORY}/${params?.slug}.png`,
    };

    const { category: relatedCategory, posts: relatedPosts } = (await getRelatedPosts(categories, postId)) || {};
    const hasRelated = relatedCategory && Array.isArray(relatedPosts) && relatedPosts.length;

    if (hasRelated) {
      props.related = {
        posts: relatedPosts,
        title: {
          name: relatedCategory.name || null,
          link: categoryPathBySlug(relatedCategory.slug),
        },
      };
    }
  }

  return {
    props,
  };
}
//redeploy

// export async function getStaticPaths() {
//   // Only render the most recent posts to avoid spending unecessary time
//   // querying every single post from WordPress

//   // Tip: this can be customized to use data or analytitcs to determine the
//   // most popular posts and render those instead

//   const { posts } = await getRecentPosts({
//     count: process.env.POSTS_PRERENDER_COUNT, // Update this value in next.config.js!
//     queryIncludes: 'index',
//   });

//   const paths = posts
//     .filter(({ slug }) => typeof slug === 'string')
//     .map(({ slug }) => ({
//       params: {
//         slug,
//       },
//     }));

//   return {
//     paths,
//     fallback: 'blocking',
//   };
// }

// export async function getInitialProps({ res, user }) {
//   console.log(res)
//     const targetURL = 'https://www.youtube.com/watch?v=11KaKhGAa3I' // 🦩
//     if (res) {
//         // On the server, we'll use an HTTP response to
//         // redirect with the status code of our choice.
//         // 307 is for temporary redirects.
//         res.writeHead(307, { Location: targetURL })
//         res.end()
//     } else {
//         // We'll redirect to the external page using
//         // `window.location`.
//         window.location = targetURL
//         // While the page is loading, code execution will
//         // continue, so we'll await a never-resolving
//         // promise to make sure our page never
//         // gets rendered.
//         await new Promise((resolve) => {})
//     }
//     return {}
// }
