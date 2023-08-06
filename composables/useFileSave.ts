export function useFileSave() {
  const save = (name: string, data: Blob) => {
    const url = URL.createObjectURL(data)
    const a = document.createElement('a')
    a.href = url
    a.download = name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const saveHtml = (name: string, data: string) => {
    const blob = new Blob([data], {
      type: 'text/html',
    })
    save(`${name}.html`, blob)
  }

  const saveJson = (name: string, data: string) => {
    const blob = new Blob([data], {
      type: 'application/json',
    })
    save(`${name}.json`, blob)
  }

  const saveText = (name: string, data: string) => {
    const blob = new Blob([data], {
      type: 'text/plain',
    })
    save(`${name}.txt`, blob)
  }

  return {
    save,
    saveHtml,
    saveJson,
    saveText,
  }
}
