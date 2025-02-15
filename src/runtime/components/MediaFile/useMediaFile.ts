import { computed, resolveComponent } from 'vue'
import type { T3File } from '../../../module'

export const useMediaFile = (file: T3File) => {
  const mediaTypeComponent = computed(() => {
    switch (file.properties.type) {
      case 'video': {
        if (file.properties.mimeType.includes('youtube')) {
          return resolveComponent('MediaYoutube')
        }
        if (file.properties.mimeType.includes('vimeo')) {
          return resolveComponent('MediaVimeo')
        }
        return resolveComponent('MediaVideo')
      }
      case 'audio':
        return resolveComponent('MediaAudio')
      default:
        return resolveComponent('MediaImage')
    }
  })

  const hasLink = computed(() => !!file.properties.link)

  return {
    mediaTypeComponent,
    hasLink
  }
}
