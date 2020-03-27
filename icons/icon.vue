<template>
  <div
    ref="rootRef"
    class="icon-root"
    @click="() => fn ? fn() : {}"
  >
    <svg
      class="svg"
      :width="size.width"
      :height="size.height"
    >
      <use :xlink:href="`#${icon}`" />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from '@vue/composition-api'
import { prop } from '@liga/generic'

export default defineComponent({
  props: {
    iconKey: prop.str({ optional: true }),
    fn: prop.func<() => void>({ optional: true }),
    width: prop.str({ optional: true }),
    height: prop.str({ optional: true }),
  },
  components: {},
  
  setup(props, ctx) {
    const { width, height } = props
    const rootRef = ref(null)

    const defaultIconKey = ref('')
    onMounted(function(this: Vue) {
      this.$nextTick(function () {
        const r = getComputedStyle(rootRef.value as any).getPropertyValue('--var-default-icon-key')
        defaultIconKey.value = r.trim() 
      })
    })

    const icon = computed(() => props.iconKey ? props.iconKey : defaultIconKey.value)

    const size = computed(() => {
      if (width || height) {
        return {
          width: width,
          height: height,
        }
      } else if (rootRef.value) {
        return {
          width: getComputedStyle(rootRef.value as any).getPropertyValue('line-height'),
          height: getComputedStyle(rootRef.value as any).getPropertyValue('line-height'),
        }
      }
    })

    return {
      rootRef,
      size,
      icon,
    }
  },
})
</script>

<style lang="scss" scoped>
  
  @include generateComponent('icon');

  .icon-root {
    display: inline-flex;
    vertical-align: -25%;
  }
</style>
