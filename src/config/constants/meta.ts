import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'CrossWise',
  description:
    'Crosswise takes the trading experience on DEX to the next level with tighter security, a friendly interface, cross-chain transactions, gasless swaps, verified listings and the right tools',
  image: 'https://demo2.crosswise.finance/images/hero.png',
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
