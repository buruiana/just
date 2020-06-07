import { graphql, Link } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMongodbTipsPosts.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />

        <div style={{ margin: "20px 0 40px" }}>
          {posts.map(({ node }) => {
            const title = node.title || node.slug
            return (
              <div key={node.slug}>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={`${node.slug}`}>
                    {title}
                  </Link>
                </h3>
                <small>{node.datetime}</small>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.shortDescription,
                  }}
                />
              </div>
            )
          })}
        </div>
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMongodbTipsPosts {
      edges {
        node {
          id
          title
          shortDescription
          postMetaRobots
          postMetaDescription
          postMetaCharSet
          postMetaKeywords {
            name
          }
          datetime(formatString: "MMMM DD, YYYY")
          slug: postUrl
        }
      }
    }
  }
`
