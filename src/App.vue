<template>
  <Card title="BaseSwitch" class="block">
    <Space>
      <!--<Select v-model="locale" @on-change="(v: 'zh-CN') => i18n.global.locale.value = v">
        <Option value="zh-CN">中文</Option>
        <Option value="en-US">英文</Option>
      </Select> -->
      <!-- <Tag>{{ t('d.lang') }}</Tag> -->
      <Btn id="r"></Btn>
      <Btn id="qr">fff</Btn>
      <CD v-if="toggle === 'T'" :end="3600000"></CD>
      <CK v-if="toggle === 'T'"></CK>
      <BaseSwitch v-model="toggle" @change="change"></BaseSwitch>
      <BaseSwitch
        v-model="toggle"
        true-label="开"
        false-label="关"
        @on-change="$Message.info($event)"></BaseSwitch>
      <BaseSwitch v-model="toggle" true-label="打开" false-label="关闭" size="large"></BaseSwitch>
      值：{{ toggle }}
    </Space>
  </Card>
  <Card title="AllCheckbox" class="block">
    <AllCheckbox v-model="allCheckeds" v-model:all="allCheck" :list="allCheckedList"></AllCheckbox>
    <AllCheckbox v-model="allCheckeds" :list="allCheckedList">
      <template #default="{ item }">
        <DD>
          <del>{{ item }}</del>
        </DD>
      </template>
      <!-- <DD #default="item">{{ item }}</DD> -->
    </AllCheckbox>
    <p>
      值：{{ allCheckeds }} <span class="ivu-ml-16">whole: {{ allCheck }}</span>
    </p>
  </Card>
  <Card title="Combi" class="block">
    <Space>
      <Combi prepend="begin" append="end">
        <Select clearable>
          <Option value="aaa">aaaaaaa</Option>
        </Select>
      </Combi>
      <Combi>
        <template #append>
          <Button icon="md-add"></Button>
        </template>
        <Select clearable>
          <Option value="sss">sssssss</Option>
        </Select>
      </Combi>
      <Combi>
        <template #prepend>
          <Select clearable style="width: 4em">
            <Option value="111">111</Option>
            <Option value="222">222</Option>
          </Select>
        </template>
        <Select clearable>
          <Option value="2">2</Option>
        </Select>
        <template #append>
          <Icon type="md-arrow-dropright-circle" />
        </template>
      </Combi>
      <InputNumber :unset="5"></InputNumber>
    </Space>
  </Card>
  <Card title="CountRange" class="block">
    <Space>
      <CountRange
        v-model:begin="minNum"
        v-model:end="maxNum"
        @change-min="(v) => console.log(v)"></CountRange>
      <CountRange
        v-model:begin="minNum"
        v-model:end="maxNum"
        @change="(...e) => console.log(e)"></CountRange>
      range: {{ minNum }} ~ {{ maxNum }}
    </Space>
  </Card>
  <Card title="RemoteSelect" class="block">
    <Space>
      <RemoteSelect
        v-model="selectModel"
        v-model:list="selectLists"
        :method="getList"
        filterable
        all
        style="width: 200px">
      </RemoteSelect>
      <RemoteSelect :model-value="selectModel" :list="selectLists" textMode></RemoteSelect>
      <RemoteSelect
        :method="getList"
        multiple
        all
        @on-change="$Message.info(JSON.stringify($event))"></RemoteSelect>
      值：{{ selectModel }}
    </Space>
  </Card>
  <Card title="CacheSelect" class="block">
    <Space>
      <CacheSelect
        v-model="selectModel"
        v-model:list="selectList"
        :method="getList"
        filterable
        all
        style="width: 200px"
        @on-change="$Message.info($event)"
        @load="(e) => console.log(e)">
      </CacheSelect>
      <CacheSelect :model-value="selectModel" :list="selectList" textMode></CacheSelect>
      <CacheSelect
        v-if="toggle === 'T'"
        v-model:list="selectList"
        v-model="selectModel"
        :method="getList"
        filterable
        style="width: 220px"
        @load="(e) => console.log(e)">
      </CacheSelect>
      值：{{ selectModel }}
    </Space>
  </Card>
  <Card title="CurdTable" class="block">
    <ToggleColumn v-for="n in colNum" :key="n" v-model="columns" cache-id="app"></ToggleColumn>
    <Table :columns="columns" :data="table.list">
      <template #num="{ index }">
        <Input v-model.trim="table.list[index]!.num"></Input>
      </template>
    </Table>
    <CurdTable
      v-model="table.list"
      :columns="columns"
      size="small"
      :action-width="130"
      :add-row="table.add"
      loading>
      <template #num="{ index }">
        <Input v-model.trim="table.list[index]!.num"></Input>
      </template>
      <template #moreAction="{ row }">
        <Button size="small" class="ivu-mr-8">查看 {{ row.age }}</Button>
      </template>
    </CurdTable>
  </Card>
  <Card title="DateRange" class="block">
    <Space>
      <DateRange
        v-model:begin="beginDate"
        v-model:end="endDate"
        clearable
        style="width: 240px"></DateRange>
      <DateRange
        v-model:begin="beginDate"
        v-model:end="endDate"
        type="month"
        clearable
        transfer
        style="width: 220px">
      </DateRange>
      <DateRange
        v-model:begin="beginDate"
        v-model:end="endDate"
        type="year"
        clearable
        transfer
        style="width: 220px">
      </DateRange>
      <span>{{ beginDate.toLocaleString() }} ~ {{ endDate.toLocaleString() }}</span>
    </Space>
  </Card>
  <Card title="DateRangePicker" class="block">
    <Space>
      <DateRangePicker v-model:begin="rangeBegin" v-model:end="rangeEnd"></DateRangePicker>
      <DateRangePicker
        v-model:begin="rangeBegin"
        v-model:end="rangeEnd"
        type="datetimerange"
        style="width: 320px">
      </DateRangePicker>
      {{ rangeBegin }} ~ {{ rangeEnd }}
    </Space>
  </Card>
  <Card title="ModalFooter" class="block">
    <Button @click="modal.show = true">show Modal</Button>
    <Modal v-model="modal.show" title="modal footer">
      <Table :columns="table.columns"></Table>
      <template #footer>
        <ModalFooter
          v-model="modal.show"
          :ok-loading="modal.loading"
          @ok="confirm"
          @cancel="$Message.info('cancel')">
        </ModalFooter>
      </template>
    </Modal>
  </Card>
  <Card title="PageTable" class="block">
    <Row align="bottom" :gutter="10">
      <Col span="12">
        <PageTable
          ref="pageTableRef"
          v-model:selection="pageTable.selection"
          v-model:loading="pageTable.loading"
          :columns="table.columns"
          :method="getPageList"
          data-key="ress"
          total-key="total"
          click-to-check
          :max-height="400"
          show-header
          border
          stripe>
          <template #num="{ column }">
            {{ column.title }}
          </template>
        </PageTable>
      </Col>
      <Col span="12">
        <PageTable
          v-model="pageTable.list"
          :columns="table.columns"
          is-local
          :max-height="400"
          border
          style="margin-bottom: 15px" />
      </Col>
      <Col span="12">
        <PageTable v-model="pageTable.list" :columns="table.columns" is-local :max-height="400" />
      </Col>
      <Col span="12">
        <PageTable
          v-model="pageTable.list"
          :columns="table.columns"
          is-local
          :max-height="400"
          show-header
          fullscreen />
      </Col>
    </Row>
    <Tag v-for="(item, index) in pageTable.selection" :key="index">{{ item }}</Tag>
  </Card>
  <Card title="MCalendar" class="block">
    <MCalendar
      v-model:range="calendar.range"
      has-range
      class="ivu-text-left"
      @click-day="
        (...args: []) => {
          console.log('clickDay', args)
        }
      "
      @dblclick-day="(...args:[]) => console.log('dblclickDay', args)"
      @select-range="(...args:[]) => console.log('select-range', args)">
      <template #cell="{ day }"> <Badge status="success"></Badge>{{ day._text }} </template>
    </MCalendar>
  </Card>
</template>

<script lang="tsx">
import {
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  shallowReactive,
  shallowRef,
  useTemplateRef
} from 'vue'
import { Tag } from 'view-ui-plus'
// import { useI18n } from 'vue-i18n'
import {
  AllCheckbox,
  BaseSwitch,
  Combi,
  CountRange,
  CacheSelect,
  RemoteSelect,
  CurdTable,
  DateRange,
  DateRangePicker,
  MCalendar,
  ModalFooter,
  PageTable,
  ToggleColumn
} from './index'
import type { Obj } from './type'
import { Clock, Countdown } from 'utils-where'
// import { i18n } from './i18n'

export default {
  components: {
    DD: {
      // name: 'DD',
      setup(props, { slots }) {
        return () => <ins>{slots.default!()}</ins>
      }
    },
    Btn: {
      inheritAttrs: false,
      props: {
        disabled: Boolean,
        title: {
          type: String,
          default: 'btnssss'
        }
      },
      setup(props, ctx) {
        return () => (
          <button disabled={props.disabled} {...props} {...ctx.attrs}>
            {ctx.slots.default?.() || props.title}
          </button>
        )
      }
    },
    CD: {
      props: {
        end: Number
      },
      setup(props) {
        const leftH = ref(),
          leftM = ref(),
          leftS = ref()
        const cd = new Countdown(
          new Date(Date.now() + props.end),
          false,
          ({ hour, minute, second }) => {
            leftH.value = hour
            leftM.value = minute
            leftS.value = second
            console.log('still countdowning')
          }
        )
        cd.stop()
        setTimeout(() => cd.start(), 3000)
        onBeforeUnmount(() => {
          cd.remove()
        })
        return () => (
          <Tag>
            {leftH.value}:{leftM.value}:{leftS.value}
          </Tag>
        )
      }
    },
    CK: {
      setup() {
        const y = ref(),
          m = ref(),
          d = ref(),
          h = ref(),
          w = ref(),
          mn = ref(),
          s = ref()
        const padZero = (num: number) => (num + '').padStart(2, '0')
        const ck = new Clock(
          new Date(2000, 1, 1, 0, 0, 0),
          2,
          false,
          ({ year, month, day, week, hour, minute, second }) => {
            y.value = year
            m.value = month
            d.value = day
            w.value = week
            h.value = hour
            mn.value = minute
            s.value = second
            console.log('still clocking')
          }
        )
        ck.stop()
        setTimeout(() => {
          ck.start()
        }, 3000)

        onBeforeUnmount(() => {
          ck.remove()
        })
        return () => (
          <Tag>
            {y.value} - {m.value} - {d.value} 星期：{w.value} &nbsp;&nbsp; {padZero(h.value)}:
            {padZero(m.value)}:{padZero(s.value)}
          </Tag>
        )
      }
    }
  }
}
</script>

<script setup lang="tsx">
// const { t } = useI18n()
// const locale = ref('zh-CN')

const toggle = ref('T')
const allCheckeds = shallowRef(['1', '3']),
  allCheck = ref(),
  allCheckedList = Object.entries({
    1: '周一',
    2: '周二',
    3: '周三',
    4: '周四',
    5: '周五',
    6: '周六',
    7: '周日'
  })
const selectModel = ref(''),
  selectList = ref([]),
  selectLists = ref([])
const minNum = ref(),
  maxNum = ref()
const genCols = () => [
  {
    title: 'emoji',
    key: 'emoji',
    type: 'selection',
    _switchable: false
  },
  {
    title: 'exp',
    key: 'exp'
    // minWidth: 300
  },
  {
    title: 'num',
    key: 'num',
    slot: 'num',
    // minWidth: 300,
    renderHeader: (h: any, { column }: { column: Obj }) => (
      <>
        {column.title}
        <input
          value={column.title}
          onInput={(e) => (column.title = (e.target as HTMLInputElement).value)}
        />
      </>
    )
  },
  {
    title: 'time',
    key: 'time'
    // width: 200
  }
]
const table = {
  columns: genCols(),
  list: [
    {
      emoji: '😶‍🌫️🤨😐',
      exp: 'ԅ(¯﹃¯ԅ)',
      num: Math.random(),
      time: new Date().toLocaleString()
    },
    {
      emoji: '😠😪',
      exp: 'ヾ(•ω•`)o',
      num: Math.random(),
      time: new Date().toLocaleString()
    }
  ],
  add: () => [
    {
      emoji: ' 😏🤤',
      exp: 'Σ(っ °Д °;)っ',
      num: Math.random(),
      time: new Date().toLocaleString()
    }
  ]
}
const columns = shallowRef(genCols()),
  colNum = ref(2)
console.log(columns)

const beginDate = ref(''),
  endDate = ref('')
const rangeBegin = ref(''),
  rangeEnd = ref('')

const calendar = shallowReactive({
  range: [
    { _date: new Date(Date.now() - 86400000 * 7) },
    { _date: new Date(Date.now() - 86400000) }
  ]
})

const modal = shallowReactive({
  show: false,
  loading: false
})
const refPageTable = useTemplateRef('pageTableRef')
const getBareTableList = () =>
  new Array(50).fill(0).map((e, i) => JSON.parse(JSON.stringify(table.list[i % 2]!)))
const pageTable = reactive({
  loading: false,
  selection: [],
  list: getBareTableList()
})

const getList = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        allCheckedList.map((e) => ({
          value: e[0],
          label: e[1]
        }))
      )
    }, 1000)
  })
}

const change = (val: string) => console.log('change: ' + val)

const confirm = () => {
  modal.loading = true
  setTimeout(() => {
    modal.show = false
    setTimeout(() => {
      modal.loading = false
    }, 200)
  }, 1000)
}

const getPageList = () =>
  new Promise((r) => {
    setTimeout(() => {
      r({
        ress: getBareTableList(),
        total: 50
      })
    }, 1000)
  })

onMounted(() => {
  refPageTable.value!.search()
})
</script>

<style lang="less">
body {
  margin: 1vw;
  text-align: center;
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
