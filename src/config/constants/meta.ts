import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'CrossWise',
  description:
    'The most popular AMM on BSC by user count! Earn CAKE through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by PancakeSwap), NFTs, and more, on a platform you can trust.',
  image: 'https://pancakeswap.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${t('Home')} | ${t('CrossWise')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('CrossWise')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('CrossWise')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('CrossWise')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('CrossWise')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('CrossWise')}`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} | ${t('CrossWise')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('CrossWise')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('CrossWise')}`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Task Center')} | ${t('CrossWise')}`,
      }
    case '/profile':
      return {
        title: `${t('Your Profile')} | ${t('CrossWise')}`,
      }
    default:
      return null
  }
}
