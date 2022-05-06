// 富文本编辑器图片base64 - 改为url上传
export function tinymceUploadImage(blobInfo, success, failure) {
    const formData = new FormData()
    // 服务端接收文件的参数名，文件数据，文件名
    formData.append('upfile', blobInfo.blob(), blobInfo.filename())
    this.$axios({
      method: 'post',
      // 这里是你的上传地址
      url: '/api/upload/image',
      data: formData
    })
      .then((res) => {
        // 接口返回的图片地址
        success(res.Data.msgbox)
      })
      .catch(() => {
        failure('上传失败')
      })
  }
  
  