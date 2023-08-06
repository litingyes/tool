import { saveAs } from 'file-saver'

export function useFileSave() {
  const saveHtml = (name: string, data: string) => {
    const blob = new Blob([data], {
      type: 'text/html',
    })
    saveAs(blob, `${name}.html`)
  }

  const saveJson = (name: string, data: string) => {
    const blob = new Blob([data], {
      type: 'application/json',
    })
    saveAs(blob, `${name}.json`)
  }

  const saveText = (name: string, data: string) => {
    const blob = new Blob([data], {
      type: 'text/plain',
    })
    saveAs(blob, `${name}.txt`)
  }

  return {
    saveHtml,
    saveJson,
    saveText,
  }
}
