<template>
  <footer class="c-footer-root">
    <container class="pv-64">
      <layout class="column justify-content-sb">
        <layout class="row gap-m">
          <layout class="column justify-content-sb">
            <layout class="row gap-xs">
              <router-link to="/">
                <liga class="logo" />
              </router-link>
              <layout class="column justify-content-start align-items-baseline">
                <p-text text="Powered by" />
                <icon
                  icon-key="waves"
                  class="icon"
                  width="54"
                  height="11"
                />
              </layout>
            </layout>
          </layout>
          <p-text
            class="hint"
            text="© 2017-2020 Liga Tokens"
          />
        </layout>
        <layout class="row gap-m">
          <p-nav-d
            top
            right
            :links="links"
          />
          <layout class="row gap-xs">
            <p-text
              class="hint"
              text="All registered trademarked logos and arts on LIGA are the property of their respective owners."
            />
            <p-text
              class="hint"
              text="LIGA is in no way affiliated with or endorsed by any represented organizations."
            />
          </layout>
        </layout>
      </layout>
    </container>
  </footer>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { useStore } from '@liga/store'

import pText from 'primitives/pText.vue'
import container from 'layout/container.vue'
import layout from 'layout/layout.vue'
import pNavD from 'primitives/pNav/pNavD.vue'

export default defineComponent({
  props: {},
  components: {
    pText,
    container,
    layout,
    pNavD,
  },
  setup() {
    const { getter } = useStore()
    const appMetadata = getter('app/metadata')
    const links = computed(() => appMetadata.value ? appMetadata.value.navLinks : undefined)
    return { links }
  },
})
</script>

<style lang="scss" scoped>
  .c-footer-root {
    background-color: v(background);
  }

  .logo {
    width: 105px;
    height: 42px;
  }
</style>
