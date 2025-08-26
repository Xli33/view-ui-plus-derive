import { describe, it, expect } from 'vitest'

import { flushPromises, mount } from '@vue/test-utils'
import ViewUiPlus from 'view-ui-plus'
import RemoteSelect from '../RemoteSelect.vue'

describe('RemoteSelect', () => {
  it('renders properly', async () => {
    const wrapper = mount(RemoteSelect, {
      global: {
        plugins: [ViewUiPlus]
      },
      props: {
        textMode: true,
        autoGet: true,
        modelValue: 'a',
        method: () =>
          new Promise((resolve) => {
            resolve([
              {
                value: 'a',
                label: '一'
              },
              {
                value: 'b',
                label: '二'
              }
            ])
          })
      }
    })

    await flushPromises()
    // console.log('text(): --- ', wrapper.html())

    expect(wrapper.text()).toContain('一(a)')
  })
})
