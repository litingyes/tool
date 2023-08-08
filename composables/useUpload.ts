export function useUpload() {
  const upload = (accept: string, cb: (data: string) => void) => {
    const input = document.createElement('input')
    input.style.opacity = '0'
    input.type = 'file'
    input.accept = accept
    document.body.appendChild(input)
    input.addEventListener('change', () => {
      if (input.files![0]) {
        const reader = new FileReader()
        reader.onload = (e) => {
          input.remove()
          cb(e.target?.result as string)
        }
        reader.readAsDataURL(input.files![0])
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
