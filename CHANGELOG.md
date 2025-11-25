# Changelog


## [0.1.0](https://github.com/Xli33/view-ui-plus-derive/compare/v0.0.3...v0.1.0) (2025-11-25)


### ⚠ BREAKING CHANGES

* 调整PageTable，select-rows 事件更名为 selection-change
* 调整RemoteSelect展示内容，默认仅显示label，不显示对应值

### Features

* 调整PageTable，select-rows 事件更名为 selection-change ([5d09cfe](https://github.com/Xli33/view-ui-plus-derive/commit/5d09cfe9028be3a90de0c6c450bdee585d12c2d3))
* 调整RemoteSelect展示内容，默认仅显示label，不显示对应值 ([e883d64](https://github.com/Xli33/view-ui-plus-derive/commit/e883d64cc90b7615c26a50a7c56d69a182fa248a))
* 优化MCalendar，无需引入扩展dayjs插件以减小构建体积 ([296d464](https://github.com/Xli33/view-ui-plus-derive/commit/296d464c5e755673a6acf5239a4ca9cc2d3edc6c))
* 优化PageTable样式 ([c1ddaf9](https://github.com/Xli33/view-ui-plus-derive/commit/c1ddaf9745d719fcdcba7aaf406c00b40d79ebdd))
* 优化RemoteSelect，去除check默认值 ([4a60e02](https://github.com/Xli33/view-ui-plus-derive/commit/4a60e02188f95da79fef9ddb29627c15c6aa1504))
* 优化umd.d.ts声明 ([e1414d7](https://github.com/Xli33/view-ui-plus-derive/commit/e1414d76a0e772a940181c23a01ef78828f9799b))


### Bug Fixes

* 修复CacheSelect & RemoteSelect 无法接收非 null 与 undefined 的Falsy值 ([71894c9](https://github.com/Xli33/view-ui-plus-derive/commit/71894c9f20730ecaff7f0363029fece2f331378a))
* 修复RemoteSelect可能无法从外部清空内部modelValue ([bef53b2](https://github.com/Xli33/view-ui-plus-derive/commit/bef53b29d16b1952bef8853a46fab298b2716897))
* 修复ToggleColumn在显示列时可能出现列减少问题 ([c2a6d5d](https://github.com/Xli33/view-ui-plus-derive/commit/c2a6d5deb8b874ce80106382e33f49e5de2da977))

## [0.0.3](https://github.com/Xli33/view-ui-plus-derive/compare/v0.0.2...v0.0.3) (2025-09-06)


### Features

* 支持打包到umd ([429d0f7](https://github.com/Xli33/view-ui-plus-derive/commit/429d0f7c17e2d1d21a0215b9c2e1adfef2303efe))


### Bug Fixes

* 修复MCalendar在传入range超出当前可显示范围时的bug ([e91b1ae](https://github.com/Xli33/view-ui-plus-derive/commit/e91b1aeafc97cf7f2f2d3fb997548e836900ccbb))

## [0.0.2](https://github.com/Xli33/view-ui-plus-derive/compare/v0.0.1...v0.0.2) (2025-08-26)


### Features

* 优化MCalendar ([e0a13d7](https://github.com/Xli33/view-ui-plus-derive/commit/e0a13d7a8bc815b54dda2ae1a438f45cc3d3967a))


### Bug Fixes

* 解决setTimeout可能被当作node环境中的api而导致lint失败 ([424e103](https://github.com/Xli33/view-ui-plus-derive/commit/424e1030a9af6c4b8ce47c64fce75a79e00560ca))
* 修复部分组件语言引用 ([f05c9fa](https://github.com/Xli33/view-ui-plus-derive/commit/f05c9fa437cc97b194a2b312a7b0fc366ec4cfbd))
* fix some .d.ts ([12c5f59](https://github.com/Xli33/view-ui-plus-derive/commit/12c5f59e18a2b1aa157676aab9d64f06f6373dd3))

## 0.0.1 (2025-08-25)
