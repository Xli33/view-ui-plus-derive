import { fileURLToPath, URL } from 'node:url'
import { cpSync, unlinkSync } from 'node:fs'
// import { resolve } from 'node:path'

import { build, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const sameOption = {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "@/styles/common.less";`
        }
      }
    }
  }
  if (command === 'build') {
    console.log('build umd')

    Object.entries({
      iviewDerive: 'src/index.ts',
      iviewMod: 'src/iview-mod.ts',
      iviewDeriveZHCN: 'src/locale/zh-CN.ts',
      iviewDeriveENUS: 'public/locale/en-US.js'
    }).forEach(async (e) => {
      await build({
        configFile: false,
        plugins: [vue(), vueJsx()],
        ...sameOption,
        esbuild: {
          drop: ['console', 'debugger'] // umd打包时删除所有的console 和 debugger
        },
        build: {
          target: 'es2015',
          cssTarget: ['chrome107', 'edge107', 'firefox104', 'safari16'],
          outDir: 'dist/umd',
          copyPublicDir: false,
          emptyOutDir: false,
          lib: {
            entry: e[1],
            name: e[0],
            fileName: (format, entryName) => `${entryName}.js`,
            cssFileName: 'index',
            formats: ['umd']
          },
          rollupOptions: {
            external: ['vue', 'view-ui-plus'],
            output: {
              globals: {
                vue: 'Vue',
                'view-ui-plus': 'ViewUIPlus'
              }
            }
          }
        }
      })
    })
  }

  return {
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      dts({
        tsconfigPath: './tsconfig.app.json',
        rollupTypes: true,
        // cleanVueFileName: true,
        // insertTypesEntry: false,
        include: ['src/index.ts', 'src/type.ts', 'src/components/*.vue', 'src/directives/*.ts'],
        afterBuild() {
          // console.log(fileMap)
          unlinkSync('dist/iview-mod.d.ts')
          unlinkSync('dist/iview-mod.less.d.ts')
          unlinkSync('dist/zh-CN.d.ts')
          cpSync('src/styles', 'dist/less', { recursive: true })
        }
        // beforeWriteFile(filePath) {
        //   if (filePath.match(/iview-mod.d.ts$|iview-mod.less.d.ts$/)) return false
        // }
      })
    ],
    ...sameOption,
    build: {
      emptyOutDir: false,
      cssCodeSplit: true,
      lib: {
        /* {
        index: resolve(import.meta.dirname, 'src/index.ts'),
        iviewFix: resolve(import.meta.dirname, 'src/iview-mod.ts'),
        iviewCustom: resolve(import.meta.dirname, 'src/iview-mod.less')
        AllCheckbox: resolve(import.meta.dirname, 'src/components/AllCheckbox.vue')
      } */
        entry: [
          'src/index.ts',
          'src/directives/index.ts',
          'src/iview-mod.ts',
          'src/iview-mod.less',
          'src/locale/zh-CN.ts'
          // 'src/components/Combi.vue'
        ],
        name: 'iviewDerive',
        // fileName 是软件包输出文件的名称，默认为 package.json 中的 "name"。也可以定义为以 format 和 entryName 为参数的函数，并返回文件名
        // fileName: 'index',
        fileName: (format, entryName) => /* ${format}/ */ `${entryName}.js`,
        cssFileName: 'index',
        formats: ['es' /*'cjs', 'umd' */]
      },
      rollupOptions: {
        // 确保外部化处理那些
        // 你不想打包进库的依赖
        external: ['vue', 'view-ui-plus', /dayjs\/?.*/, 'utils-where'],
        // input: {
        //   index: 'src/index.ts',
        //   iviewFix: 'src/iview-mod.ts',
        //   iviewCustom: 'src/iview-mod.less'
        //   // AllCheckbox: 'src/components/AllCheckbox.vue',
        //   // Combi: 'src/components/Combi.vue',
        //   // DateRange: 'src/components/DateRange.vue'
        // },
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖
          // 提供一个全局变量
          globals: {
            vue: 'Vue',
            'view-ui-plus': 'ViewUIPlus',
            dayjs: 'dayjs'
          },
          manualChunks(id) {
            // console.log(id)
            // 按组件对应名输出各自的css
            if (id.includes('.vue?vue&type=style&index=0&lang.less' /* '/components/' */)) {
              return id.match(/[a-zA-Z]+\.vue/)![0]
            }
            // 分离iview-mods/*
            if (/src\/iview-mods\/[a-z-]+\.ts/.test(id)) {
              return id.match(/[a-z-]+\.ts/)![0].slice(0, -3)
            }
            // 分离语言文件
            // if (/src\/locale\/\w+-\w+\.ts$/.test(id)) {
            //   const file = id.match(/[a-zA-Z-]+.ts/)![0]
            //   return file.slice(0, -3)
            // }
            // 分离vue指令文件
            if (/src\/directives\/.+\.ts$/.test(id)) {
              return id.match(/[a-z-]+\.ts/)![0].slice(0, -3)
            }
            // if (id.includes('.vue?vue&type=style&index=0&lang.less')) return 'css'
            // if (id.includes('.vue?vue&type=script&setup=true&lang.ts')) return 'coms'
            // if (id.includes('.vue')) return 'vues'
          },
          assetFileNames: (assetInfo) => {
            // console.log(JSON.stringify(assetInfo, null, 1))
            // let folder = 'assets'
            // const ext = (assetInfo.name || '').split('.').slice(-1)[0]
            // if (ext === 'css') {
            //   folder = 'css'
            // } else if (/^(?:png|jpe?g|gif|svg|webp)$/i.test(ext)) {
            //   folder = 'img'
            // } else if (/^(?:woff2?|ttf|otf)$/i.test(ext)) {
            //   folder = 'fonts'
            // }
            // return `${folder}/[name]-[hash][extname]`
            return `${assetInfo.names[0] !== 'iview-mod.css' ? 'styles/' : ''}[name][extname]`
          },
          chunkFileNames: (chunkInfo) => {
            // 分离到对应文件夹

            // const file = chunkInfo.name.match(/^\w+\.vue/)
            // return `${file ? 'components' : 'iview-mods'}/[name].js`
            const mid = chunkInfo.moduleIds[0]
            let matched = /src\/iview-mods\/.+\.ts$/.test(mid)
            if (matched) return 'iview-mods/[name].js'
            matched = /src\/locale\/.+\.ts$/.test(mid)
            if (matched) return 'locale/[name].js'
            matched = /src\/directives\/.+\.ts$/.test(mid)
            if (matched) return 'directives/[name].js'

            return '[name].js'
            //   if (
            //     chunkInfo.isDynamicEntry &&
            //     chunkInfo.facadeModuleId?.includes('/src/assets/locale')
            //   ) {
            //     const locale = <RegExpMatchArray>(
            //       chunkInfo.facadeModuleId.match(/([a-zA-Z-]+)\/index.ts/)
            //     )
            //     return `assets/locale/${locale[1]}-[hash].js`
            //   }
            // return 'js/[name]-[hash].js'
          },
          entryFileNames: (chunkInfo) => {
            //'js/[name]-[hash].js'
            // console.log(chunkInfo)
            let dir = ''
            const { facadeModuleId } = chunkInfo
            if (facadeModuleId!.match(/src\/locale\/.+\.ts$/)) dir = 'locale/'
            else if (facadeModuleId!.match(/src\/directives\/.+\.ts$/)) dir = 'directives/'
            return dir + '[name].js'
          }
        }
      }
    }
  }
})
