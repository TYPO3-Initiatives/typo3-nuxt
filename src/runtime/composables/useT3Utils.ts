import { cleanDoubleSlashes, hasProtocol } from 'ufo'
import { navigateTo, useNuxtApp } from '#app'
import type { T3RedirectData } from '../../module'
import { useT3i18nState } from './useT3i18n'
import { useT3Options } from './useT3Options'
import layouts from '#build/layouts'

export const useT3Utils = () => {
  const nuxtApp = useNuxtApp()
  const currentLocale = useT3i18nState()
  const { currentSiteOptions } = useT3Options()

  /**
   * Handle TYPO3 Redirect
   * @param {T3RedirectData} redirectData
   * @returns
   */
  const redirect = async (redirectData: T3RedirectData) => {
    await nuxtApp.callHook('t3:redirect', redirectData)
    const { redirectUrl, statusCode } = redirectData
    const isExternal = hasProtocol(redirectUrl, { acceptRelative: true })

    return await nuxtApp.runWithContext(() => navigateTo(redirectUrl, {
      redirectCode: statusCode,
      external: isExternal,
      replace: true
    }))
  }

  /**
   * Get path with current locale code
   * @param path
   * @returns
   */
  const localePath = (path?: string) => {
    const { i18n } = currentSiteOptions.value
    const code = i18n.default === currentLocale.value ? '' : currentLocale.value
    return cleanDoubleSlashes(`/${code}${path ? `/${path}` : ''}`)
  }

  return {
    redirect,
    localePath
  }
}

export const hasLayout = (name = 'default') => {
  return name in layouts
}
