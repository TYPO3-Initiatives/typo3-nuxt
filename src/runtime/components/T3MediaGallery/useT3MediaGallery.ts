import { computed } from 'vue'
import type { T3Gallery } from '../../../module'

export const useT3MediaGallery = (gallery: T3Gallery) => {
  const galleryClassList = computed<Array<string | Record<string, boolean | undefined>>>(() => {
    return [
      `t3-ce-gallery--horizontal-${gallery.position.horizontal}`,
      `t3-ce-gallery--vertical-${gallery.position.vertical}`,
      { 't3-ce-gallery--no-wrap': gallery.position.noWrap },
      { 't3-ce-gallery--border': gallery.border.enabled }
    ]
  })

  return {
    galleryClassList
  }
}
