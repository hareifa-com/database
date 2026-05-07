const theme = {
  logo: <span>منصة اللاعبين الشباب</span>,
  project: {
    link: 'https://github.com/your-org/football-platform',
  },
  docsRepositoryBase: 'https://github.com/your-org/football-platform/tree/main/apps/docs',
  footer: {
    text: 'منصة اللاعبين الشباب © 2024',
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  toc: {
    backToTop: true,
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – منصة اللاعبين الشباب'
    }
  }
}

export default theme
