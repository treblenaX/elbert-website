export default function                                                                   calculateOverallRepoMetrics(pinnedRepos: any) {
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