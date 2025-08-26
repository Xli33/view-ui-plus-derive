import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ViewUiPlus from 'view-ui-plus'
import PageTable from '../PageTable.vue'

describe('PageTable', () => {
  it('renders properly', () => {
    const wrapper = mount(PageTable, {
      global: {
        plugins: [ViewUiPlus]
      },
      props: { showHeader: true }
    })
    // console.log('text(): --- ', wrapper.html())

    expect(wrapper.text()).toContain('列表')
  })
})
