export interface Obj {
  [x: string]: any
}

export type BtnType =
  | ''
  | 'default'
  | 'primary'
  | 'dashed'
  | 'text'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | undefined

export type BtnSize = '' | 'default' | 'small' | 'large' | undefined
