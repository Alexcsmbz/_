<template>
  <p-popup-overlay>
    <p-popup-box
      v-loader="isLoadingRef"
      class="relative"
    >
      <layout class="row gap-24">
        <p-text
          class="center fs-22 primary"
          text="Set password:"
        />
        <layout class="row gap-24">
          <p-line-input
            :placeholder="email"
            is-readonly
            name="reset-password-email"
          />
          <p-password-input
            placeholder="Your password"
            :on-change="onChangePassword"
            :value="passwordRef"
            name="sign-up-password"
            type="password"
          />
          <p-password-input
            placeholder="Repeat password"
            :on-change="onConfirmPassword"
            :value="confirmPasswordRef"
            name="sign-up-confirm-password"
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
              text="Set"
              :fn="onResetPassword"
            />
          </layout>
        </layout>
      </layout>
      <p-close :on-close="onClose" />
    </p-popup-box>
  </p-popup-overlay>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { useStore, firebaseErrors } from '@liga/store'
import { usePopups, provideErrorContext } from '@liga/vue'
import { prop } from '@liga/generic'
import { closePopupMixin } from 'popups/close-popup-mixin'

import pPasswordInput from 'inputs/pPasswordInput.vue'
import pLineInput from 'inputs/pLineInput.vue'
import pClose from 'primitives/pClose.vue'
import layout from 'layout/layout.vue'
import pPopupBox from 'primitives/pPopupBox.vue'
import pPopupOverlay from 'primitives/pPopupOverlay.vue'
import pButton from 'primitives/pButton.vue'
import pText from 'primitives/pText.vue'

export default defineComponent({
  props: {
    email: prop.str(),
    code: prop.str(),
  },
  components: {
    pPasswordInput,
    pLineInput,
    pClose,
    layout,
    pPopupBox,
    pPopupOverlay,
    pButton,
    pText,
  },
  setup({ code }) {
    const { dispatch } = useStore()
    const { showError } = provideErrorContext()
    const { closeCurrent } = usePopups()
    const passwordRef = ref('')
    const confirmPasswordRef = ref('')
    const isLoadingRef = ref(false)

    const onChangePassword = (value: string) => {
      passwordRef.value = value
    }
        
    const onConfirmPassword = (value: string) => {
      confirmPasswordRef.value = value
    }

    const onClose = () => {
      closeCurrent()
    }

    const onResetPassword = async () => {
      try {
        isLoadingRef.value = true
        if (!passwordRef.value || !confirmPasswordRef.value) {
          showError('Please enter password')
        } else if (passwordRef.value !== confirmPasswordRef.value) {
          showError('Passwords do not match')
        } else {
          await dispatch('auth/confirmPasswordReset', {
            code: code,
            newPassword: confirmPasswordRef.value,
          })

          closeCurrent()
        }
      } catch (e) {
        switch (e.code) {
          case firebaseErrors['auth/weak-password']:
            showError('The password must be 6 characters long or more')
            break
        }
      } finally {
        isLoadingRef.value = false
      }
    }

    closePopupMixin(onClose)

    return {
      passwordRef,
      confirmPasswordRef,
      onChangePassword,
      onConfirmPassword,
      onResetPassword,
      isLoadingRef,
    }
  },
})
</script>

<style lang="scss" scoped>
.error-area {
  min-height: 20px;
}
</style>