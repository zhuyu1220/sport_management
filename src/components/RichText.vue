<template>
 <div >
   <editor  :id="tinymceId" :init="init">
  </editor>
 </div>
 
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
// import 'tinymce/icons/default/icons.js'
import 'tinymce/plugins/image'

export default {
  name: 'RichText',
  props: {
    id: {
      type: String,
      default: function () {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
  },
  watch: {
    value (val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''))
      }
    }
  },
  data () {
    const _this = this
    return {
      tinymceId: this.id,
      hasInit: false,
      hasChange: false,
      init: {
        language_url: '/static/tinymce/zh-Hans.js', // 语言包的路径
        language: 'zh-Hans', // 语言
        skin_url: '/static/tinymce/skins/ui/oxide', // skin路径
        height: 300, // 编辑器高度
        // toolbar: ' undo redo |  bold italic underline strikethrough image',
        branding: false, // 去水印
        elementpath: true, // 禁用编辑器底部的状态栏
        statusbar: true, // 隐藏编辑器底部的状态栏
        paste_data_images: true, // 允许粘贴图像
        menubar: true, // 隐藏最上方menu
        plugins: 'image', // 图片插件
        mages_upload_url:'',//上传图片地址
        images_upload_base_path: '/demo',
        images_upload_handler: (blobInfo, success, failure) => {
          // 这里可以请求接口
          success('data:image/jpeg;base64,' + blobInfo.base64())
        }, // 上传本地图片
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          // 监听富文本内容的改变 将变化传回richtext的v-model
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        }
      }
    }
  },
  components: {Editor},
  mounted () {
    tinymce.init({})
  }
}
</script>

<style >
   .tox-tinymce-aux {
    z-index: 5000 !important;
  }
</style>

