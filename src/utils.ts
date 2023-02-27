import { toRef, inject, provide, reactive, watchEffect } from 'vue'
import { useBreakpoint, useMemo } from 'vooks'

import { useStore } from 'vuex'

export function useIsMobile () {
  const breakpointRef = useBreakpoint()
  return useMemo(() => {
    return breakpointRef.value === 'xs'
  })
}


// https://stackoverflow.com/a/73468350
export const merge = (object1, object2) => {
  if (Array.isArray(object2)) {
    return [...object1, ...object2]
  } else {
    return Object.entries(object2).reduce((acc, [key, value]) => {
      if (
        Object.keys(acc).includes(key) &&
        typeof value === 'object'
      ) {
        acc[key] = merge(acc[key], value)
      } else {
        acc[key] = value
      }

      return acc
    }, { ...object1 })
  }
}
