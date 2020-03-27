import Vue from 'vue'
import VueFunctionApi from '@vue/composition-api'
Vue.use(VueFunctionApi)
import { ref, computed } from '@vue/composition-api'

const throttle = (fn: Function, limit: number) => {
  let inThrottle: boolean
  return () => {
    if (!inThrottle) {
      fn()
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

const updateCurrentWidth = () => {
  currentWidth.value = window.innerWidth
}

window.onresize = throttle(updateCurrentWidth, 1000)

const currentWidth = ref(window.innerWidth)

export const isMobile = computed(() => currentWidth.value < 992)
export const isDesktop = computed(() => currentWidth.value >= 992)
