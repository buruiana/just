import { convertFromRaw } from "draft-js"
import { stateToHTML } from "draft-js-export-html"
import { graphql, Link } from "gatsby"
// import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mongodbTipsPosts
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={post.title} description={post.shortDescription} />
        <h1>{post.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.datetime}
        </p>
        {/* <MDXRenderer>{post.content}</MDXRenderer> */}

        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: stateToHTML(convertFromRaw(JSON.parse(post.content))),
          }}
        />

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={`blog/${previous.slug}`} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`blog${next.slug}`} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    mongodbTipsPosts(postUrl: { eq: $slug }) {
      id
      title
      content
      postMetaRobots
      postMetaDescription
      postMetaCharSet
      postMetaKeywords {
        name
      }
      datetime(formatString: "MMMM DD, YYYY")
      slug: postUrl
      shortDescription
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
