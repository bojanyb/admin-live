import defaultSettings from '@/settings'

const title = defaultSettings.title || '喵喵星球管理平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
