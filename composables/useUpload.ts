interface UploadOptions {
  accept: string
  format?: 'TEXT' | 'DATA_URL'
  cb: (data: string) => void
}

export function useUpload() {
  const upload = (options: UploadOptions) => {
    const input = document.createElement('input')
    input.style.opacity = '0'
    input.type = 'file'
    input.accept = options.accept
    document.body.appendChild(input)
    input.addEventListener('change', () => {
      if (input.files![0]) {
        const reader = new FileReader()
        reader.onload = (e) => {
          input.remove()
          options.cb(e.target?.result as string)
        }
        if (options.format === 'DATA_URL')
          reader.readAsDataURL(input.files![0])
        else
          reader.readAsText(input.files![0])
      }
      else {
        input.remove()
      }
    })
    input.click()
  }

  return {
    upload,
  }
}
