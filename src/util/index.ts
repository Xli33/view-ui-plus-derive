// import type { Obj } from '@/type'

import { inject } from 'vue'

// /**
//  * 根据源对象返回不包含自有可枚举指定属性的新对象
//  *
//  * @param obj 普通对象
//  * @param excludes string[]
//  * @returns object
//  * @example
//  * <template>
//  *  <some-com v-bind="attrs" />
//  * </template>
//  * <script setup>
//  *  const attrs = omitKeys(useAttrs(), )
//  * </script>
//  */
// export function omitKeys(obj: Obj, excludes: string[] = ['id', 'class', 'style']) {
//   const omitted: Obj = {}
//   Object.entries(obj).forEach((e) => {
//     if (!excludes.includes(e[0])) omitted[e[0]] = e[1]
//   })
//   return omitted
// }

export const classSymbol = Symbol('vupdPrefix')

export const useClass = (name: string) => {
  const prefix = inject(classSymbol, '') as string
  return prefix ? prefix.replace(/\B([A-Z])/g, '-$1').toLowerCase() + '-' + name : name
}
