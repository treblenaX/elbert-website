import { graphql } from "@octokit/graphql";
import { PinnedRepo } from "../../../models/PinnedRepo";

export async function getMyPinnedRepos() {
  const response: any = await graphql(
  `
    {
      user(login:"treblenaX") {
        pinnedItems(first: 6, types: [REPOSITORY, GIST]) {
          totalCount
          edges {
            node {
              ... on Repository {
                name,
                url,
                stargazerCount,
                updatedAt,
                createdAt,
                description,         
                languages(first: 100, orderBy: {field: SIZE, direction: DESC}) {
                  totalCount
                  edges {
                    size
                    node {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
  {
    headers: {
      authorization: `token ${process.env.GITHUB_AUTH}`,
      affiliation: 'collaborator'
    }
  })

  const result = response.user.pinnedItems.edges.map((r) => {
    return {
      name: r.node.name,
      description: r.node.description,
      url: r.node.url,
      stargazerCount: r.node.stargazerCount,
      updatedAt: new Date(r.node.updatedAt),
      createdAt: new Date(r.node.createdAt),
      languages: r.node.languages.edges.map((l) => {
        return {
          name: l.node.name,
          size: l.size
        }
      })
    }
  })

  console.log(result)


  return result;
}