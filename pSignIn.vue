<template>
  <div class="p-sign-in-root">
    <layout class="row gap-24">
      <layout class="row gap-24">
        <p-line-input
          placeholder="your@email.com"
          :on-change="onChangeEmail"
          name="sign-in-email"
        />
        <p-password-input
          placeholder="Your password"
          :on-change="onChangePassword"
          :value="passwordRef"
          name="sign-in-password"
          type="password"
        />
      </layout>
      <layout class="row gap-24">
        <layout class="row gap-8">
          <div class="error-area">
            <layout
              v-if-error
              class="column gap-4 center f-error"
            >
              <icon
                icon-key="warning-fill"
                width="15"
                height="15"
              />
              <p-text
                v-error
              />
            </layout>
          </div>
          <p-button
            class="primary"
            text="Sign in"
            :fn="() => onSignIn(passwordRef)"
          />
        </layout>
        <p-text
          text="Forgot your password?"
          class="hint center bold pointer uppercase underline"
          @click.native="onForgotPasswordClick"
        />
      </layout>
    </layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { prop } from '@liga/generic'

import pPasswordInput from 'inputs/pPasswordInput.vue'
import pLineInput from 'inputs/pLineInput.vue'
import layout from 'layout/layout.vue'
import pButton from 'primitives/pButton.vue'
import pText from 'primitives/pText.vue'

export default defineComponent({
  props: {
    onSignIn: prop.func<(password: string) => void>(),
    onForgotPasswordClick: prop.func<() => void>(),
  },
  components: {
    pPasswordInput,
    pLineInput,
    layout,
    pButton,
    pText,
  },
  setup(prop, ctx) {
    const passwordRef = ref('')

    const onChangePassword = (value: string) => {
      passwordRef.value = value
    }

    const onChangeEmail = (value: string) => {
      ctx.emit('onChangeEmail', value)
    }

    return {
      passwordRef,
      onChangePassword,
      onChangeEmail,
    }
  },
})
</script>

<style lang="scss" scoped>
.error-area {
  min-height: 20px;
}
</style>