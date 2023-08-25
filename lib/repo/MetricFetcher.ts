import { graphql } from "@octokit/graphql";

const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

export async function getProfileCommitCount() {
  try {
    const response = await fetch(`https://api.github.com/search/commits?q=author:treblenaX`, {
      method: 'GET',
      headers: {
        authorization: `token ${token}`,
        accept: 'application/vnd.github.cloak-preview',
        contentType: 'application/json'
        }
      }
    ) 
    return await response.json()
  } catch (error) {
    // TODO: handle error
  }
}

export async function getPinnedRepos() {
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
      authorization: `token ${token}`,
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
          value: l.size
        }
      })
    }
  })
  return result;
}

export function calculateOverallRepoMetrics(pinnedRepos: any) {
  // total languages done
  let overallRepoLines = []
  let tempRepoLinesObject = {}

  pinnedRepos.forEach((repo) => {
    const languages = repo.languages
    
    languages.forEach((langData) => {
      const lang = langData.name
      const lines = langData.value

      // init language
      if (!tempRepoLinesObject[lang]) {
        tempRepoLinesObject[lang] = {
          lines: 0
        }
      }

      // language lines
      tempRepoLinesObject[lang].lines += lines
    })
  })

  for (const lang in tempRepoLinesObject) {
    overallRepoLines.push({
      name: lang,
      value: tempRepoLinesObject[lang].lines
    })
  }
  
  return overallRepoLines
}