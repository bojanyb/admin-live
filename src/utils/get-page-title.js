import defaultSettings from '@/settings'

const title = defaultSettings.title || process.env.ENV_TITLE

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
