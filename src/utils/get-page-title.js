import defaultSettings from '@/settings'

const title  =defaultSettings.title || '教育管理平台'

export default function getPageTitle(pageTitle) {
    if (pageTitle) {
       return   `${pageTitle} - ${pageTitle}`
    }
    return title
}
