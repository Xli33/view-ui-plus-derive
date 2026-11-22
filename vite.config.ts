import { fileURLToPath, URL } from 'node:url'
import {
  readdirSync,
  readFileSync,
  copyFileSync,
  writeFileSync,
  unlinkSync,
  mkdirSync
} from 'node:fs'
// import { resolve } from 'node:path'

import { build, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import dts from 'unplugin-dts/vite'

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
      iviewDeriveZhCn: 'src/locale/zh-CN.ts',
      iviewDeriveEnUs: 'public/locale/en-US.js'
    }).forEach(async (e) => {
      await build({
        configFile: false,
        plugins: [vue(), vueJsx()],
        ...sameOption,
        build: {
          target: 'es2023',
          cssTarget: ['chrome112', 'edge112', 'firefox115', 'safari16.4'],
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
          rolldownOptions: {
            external: ['vue', 'view-ui-plus'],
            output: {
              minify: {
                compress: {
                  dropConsole: true,
                  dropDebugger: true
                }
              },
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
      {
        name: 'exclude-locale-sourcemap',
        generateBundle(_, bundle) {
          for (const fileName in bundle) {
            // 匹配所有输出在 locale 目录下的 .js.map 文件
            if (fileName.startsWith('locale/') && fileName.endsWith('.js.map')) {
              // 从即将写入磁盘的资产包中直接删除它
              delete bundle[fileName]
            }
          }
        }
      },
      dts({
        tsconfigPath: './tsconfig.app.json',
        bundleTypes: true,
        // cleanVueFileName: true,
        // insertTypesEntry: false,
        include: [
          'src/index.ts',
          'src/type.ts',
          'src/components/*.{vue,ts}',
          'src/directives/*.ts'
        ],
        // 写入.d.ts前去除部分组件中内联的其它组件类型声明
        // beforeWriteFile(filePath, content) {
        //   if (filePath.includes('CacheSelect.vue')) {
        //     // console.log('found:', content.match(/sel:.+?\}\)\s*\|\s*null;/s)?.[0])
        //     return {
        //       filePath,
        //       content: content.replace(/sel:.+?\}\)\s*\|\s*null;/s, 'sel: any')
        //     }
        //   }
        //   if (filePath.includes('PageTable.vue')) {
        //     // console.log('found:', content.match(/tableRef:.+\| null;/s)?.[0])
        //     return {
        //       filePath,
        //       content: content.replace(
        //         /tableRef:.+\| null;\s*}, HTMLDivElement>/s,
        //         'tableRef: any;\npageRef: any;\n}, HTMLDivElement>'
        //       )
        //     }
        //   }
        // },
        afterBuild() {
          const arr = ['index.less', 'common.less']

          // console.log(fileMap)
          unlinkSync('dist/iview-mod.d.ts')
          unlinkSync('dist/iview-mod.less.d.ts')
          // unlinkSync('dist/zh-CN.d.ts')

          mkdirSync('dist/less')
          readdirSync('src/styles').forEach(
            (f) =>
              f !== arr[0] &&
              copyFileSync(`src/styles/${f}`, `dist/less/${(arr.includes(f) ? '' : 'Vupd') + f}`)
          )
          // 替换 dist/less/index.less 里的引用路径
          const index = readFileSync('src/styles/index.less', 'utf-8').replace(
            /\.\/(\w+\.less)/g,
            './Vupd$1'
          )
          writeFileSync('dist/less/index.less', index)
          // cpSync('src/styles', 'dist/less', { recursive: true })
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
          'src/iview-mod.ts',
          'src/iview-mod.less'
          // vite8起，lib模式下无需指定entry，也能从 src/index 这种单一入口中拆分chunk了
          // 'src/directives/index.ts',
          // 'src/locale/zh-CN.ts'
          // 'src/components/Combi.vue'
        ],
        name: 'iviewDerive',
        // fileName 是软件包输出文件的名称，默认为 package.json 中的 "name"。也可以定义为以 format 和 entryName 为参数的函数，并返回文件名
        // fileName: 'index',
        fileName: (format, entryName) => /* ${format}/ */ `${entryName}.js`,
        cssFileName: 'index',
        formats: ['es' /*'cjs', 'umd' */]
      },
      rolldownOptions: {
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
          // globals: {
          //   vue: 'Vue',
          //   'view-ui-plus': 'ViewUIPlus',
          //   dayjs: 'dayjs'
          // },
          codeSplitting: {
            groups: [
              // 按组件对应名输出各自的css
              {
                name: (id: string) => {
                  if (id.includes('.vue?vue&type=style&index=0&lang.less' /* '/components/' */)) {
                    return id.match(/[a-zA-Z]+\.vue/)![0]
                  }
                },
                priority: 1
              },
              // 分离ep-mods/*
              {
                test: /src\/iview-mods\/[a-z-]+\.ts/,
                name: (id: string) => 'iview-mods/' + id.match(/[a-z-]+\.ts/)![0].slice(0, -3),
                priority: 1
              },
              // 分离语言文件
              {
                test: /src\/locale\/\w+-\w+\.ts$/,
                name: (id: string) => 'locale/' + id.match(/[a-zA-Z-]+.ts/)![0].slice(0, -3),
                priority: 1
              },
              // 分离vue指令文件
              {
                test: /src\/directives\/.+\.ts$/,
                name: (id: string) => 'directives/' + id.match(/[a-z-]+\.ts/)![0].slice(0, -3),
                priority: 1
              }
            ]
          },
          // manualChunks(id) {
          //   // console.log(id)
          //   // 按组件对应名输出各自的css
          //   if (id.includes('.vue?vue&type=style&index=0&lang.less' /* '/components/' */)) {
          //     return id.match(/[a-zA-Z]+\.vue/)![0]
          //   }
          //   // 分离iview-mods/*
          //   if (/src\/iview-mods\/[a-z-]+\.ts/.test(id)) {
          //     return id.match(/[a-z-]+\.ts/)![0].slice(0, -3)
          //   }
          //   // 分离语言文件
          //   // if (/src\/locale\/\w+-\w+\.ts$/.test(id)) {
          //   //   const file = id.match(/[a-zA-Z-]+.ts/)![0]
          //   //   return file.slice(0, -3)
          //   // }
          //   // 分离vue指令文件
          //   if (/src\/directives\/.+\.ts$/.test(id)) {
          //     return id.match(/[a-z-]+\.ts/)![0].slice(0, -3)
          //   }
          //   // if (id.includes('.vue?vue&type=style&index=0&lang.less')) return 'css'
          //   // if (id.includes('.vue?vue&type=script&setup=true&lang.ts')) return 'coms'
          //   // if (id.includes('.vue')) return 'vues'
          // },
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
            return `${assetInfo.names[0] !== 'iview-mod.css' ? 'styles/Vupd' : ''}[name][extname]`
          },
          chunkFileNames: (/* chunkInfo */) => {
            // 分离到对应文件夹

            // const file = chunkInfo.name.match(/^\w+\.vue/)
            // return `${file ? 'components' : 'iview-mods'}/[name].js`
            // const mid = chunkInfo.moduleIds[0]
            // let matched = /src\/iview-mods\/.+\.ts$/.test(mid)
            // if (matched) return 'iview-mods/[name].js'
            // matched = /src\/locale\/.+\.ts$/.test(mid)
            // if (matched) return 'locale/[name].js'
            // matched = /src\/directives\/.+\.ts$/.test(mid)
            // if (matched) return 'directives/[name].js'

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
          }
          // entryFileNames: (chunkInfo) => {
          //   //'js/[name]-[hash].js'
          //   // console.log(chunkInfo)
          //   let dir = ''
          //   const { facadeModuleId } = chunkInfo
          //   if (facadeModuleId!.match(/src\/locale\/.+\.ts$/)) dir = 'locale/'
          //   else if (facadeModuleId!.match(/src\/directives\/.+\.ts$/)) dir = 'directives/'
          //   return dir + '[name].js'
          // }
        }
      }
    }
  }
})
