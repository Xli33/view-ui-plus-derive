import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ViewUiPlus from 'view-ui-plus'
import Combi from '../Combi.vue'

describe('Combi', () => {
  it('renders properly', () => {
    const wrapper = mount(Combi, {
      global: {
        plugins: [ViewUiPlus]
      },
      props: { prepend: '类型' }
    })
    // console.log('text(): --- ', wrapper.html())

    expect(wrapper.text()).toContain('类型')
  })
})
