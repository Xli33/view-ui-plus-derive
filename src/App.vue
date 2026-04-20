<template>
  <div class="layout">
    <Layout :style="{ height: '100vh' }">
      <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu active-name="AllCheckboxDemo" theme="dark" width="auto" @on-select="changeMenu">
          <MenuItem v-for="(item, key) in map" :key="key" :name="key">
            <span>{{ key }}</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout style="overflow: auto">
        <!-- <Header :style="{ background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)' }"></Header> -->
        <Content :style="{ padding: '16px' }">
          <!-- <Card> -->
          <!-- <keep-alive> -->
          <component :is="current"></component>
          <!-- </keep-alive> -->
          <!-- </Card> -->
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import AllCheckboxDemo from './views/AllCheckbox/demo.vue'
import BaseSwitchDemo from './views/BaseSwitch/demo.vue'
import CacheSelectDemo from './views/CacheSelect/demo.vue'
import CombiDemo from './views/Combi/demo.vue'
import CountRangeDemo from './views/CountRange/demo.vue'
import CurdTableDemo from './views/CurdTable/demo.vue'
import DateRangeDemo from './views/DateRange/demo.vue'
import DateRangePickerDemo from './views/DateRangePicker/demo.vue'
import MCalendarDemo from './views/MCalendar/demo.vue'
import ModalFooterDemo from './views/ModalFooter/demo.vue'
import PageTableDemo from './views/PageTable/demo.vue'
import RemoteSelectDemo from './views/RemoteSelect/demo.vue'
// import ToggleColumnDemo from './views/ToggleColumn/demo.vue';

const map = {
  AllCheckboxDemo,
  BaseSwitchDemo,
  CacheSelectDemo,
  CombiDemo,
  CountRangeDemo,
  CurdTableDemo,
  DateRangeDemo,
  DateRangePickerDemo,
  MCalendarDemo,
  ModalFooterDemo,
  PageTableDemo,
  RemoteSelectDemo
  // ToggleColumnDemo
}

const isCollapsed = ref(false)
const current = shallowRef(AllCheckboxDemo)

const changeMenu = (menuName: keyof typeof map) => {
  current.value = map[menuName]
}
</script>

<style lang="less">
body {
  // margin: 1vw;
  // text-align: center;
}

.ivu-card-head p {
  vertical-align: top;

  > span {
    vertical-align: middle;
  }
}

.ivu-select-dropdown {
  max-height: 320px;
}

.block {
  margin: 10px;
}

.ivu-table-small {
  font-size: 14px;

  .ivu-table-cell {
    padding-left: 6px;
    padding-right: 6px;
  }
}

/* .kebab {
  display: inline-block;
  width: 10px;
  padding: 0 1px;
  vertical-align: middle;

  &:not(.hidden):before {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background: #666;
  }

  @media (max-width: 1365px) {
    width: 5px;
    padding: 0;
  }
} */
</style>
