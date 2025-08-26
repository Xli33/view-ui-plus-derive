/// <reference types="vite/client" />

// declare interface Obj {
//   [x: string]: any
// }

declare module 'view-ui-plus/dist/locale/*' {
  const lang: Record<string, any>
  export default lang
}
declare module '../public/locale/*' {
  const lang: Record<string, any>
  export default lang
}

declare type nullish = undefined | null
