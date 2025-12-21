# Changelog


## [0.1.3](https://github.com/Xli33/view-ui-plus-derive/compare/v0.1.2...v0.1.3) (2025-12-21)


### Features

* **PageTable:** 新增prop: `maximizeHeightType`，决定在最大化时设置height或maxHeight，默认`maxHeight` ([f4c2c6e](https://github.com/Xli33/view-ui-plus-derive/commit/f4c2c6e65b33c59c8a8ff171481729e2e95ba051))
* **PageTable:** 新增prop：hidePage，为true时隐藏分页；当总条数无效，且无数据时，列表容器增加class：page-table-list-empty ([aaed37d](https://github.com/Xli33/view-ui-plus-derive/commit/aaed37d45f4edda6ac6127c4084d219f464386c5))


### Bug Fixes

* **PageTable:** 修复打包时提示PageTable中组件引用类型为unknown ([1c01626](https://github.com/Xli33/view-ui-plus-derive/commit/1c0162644a545441bbcc8d1d480eff6b477c8e69))

## [0.1.2](https://github.com/Xli33/view-ui-plus-derive/compare/v0.1.1...v0.1.2) (2025-12-17)


### Features

* 支持自定义组件名前缀及其样式class前缀 ([3df43f1](https://github.com/Xli33/view-ui-plus-derive/commit/3df43f1cc8a5c2a6588750d6d5dacb62319a00fd))
* **PageTable:** 调整PageTable组件，暴露内部sizer ([7291c2f](https://github.com/Xli33/view-ui-plus-derive/commit/7291c2f0c43b6a98265c3af5cbad996e6da80fed))

## [0.1.1](https://github.com/Xli33/view-ui-plus-derive/compare/v0.1.0...v0.1.1) (2025-12-09)


### Features

* **PageTable:** 新增事件 `maximize-change`，切换最大化后触发 ([482b87d](https://github.com/Xli33/view-ui-plus-derive/commit/482b87d6b5c41c65510c6f32b8af83895ca6056c))


### Bug Fixes

* **PageTable:** 修复当传入未定义的props时，内部Table绑定的attrs不会随外部值变化而更新 ([be14b5e](https://github.com/Xli33/view-ui-plus-derive/commit/be14b5e3513cf4706c3bbb0e6d2cf5e6488a6cd7))

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
