import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ViewUiPlus from 'view-ui-plus'
import CurdTable from '../CurdTable.vue'

describe('CurdTable', () => {
  it('renders properly', () => {
    const wrapper = mount(CurdTable, {
      global: {
        plugins: [ViewUiPlus]
      },
      props: {}
    })
    // console.log('text(): --- ', wrapper.html())

    expect(wrapper.text()).toContain('新增')
  })
})
