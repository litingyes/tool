import type { SuggestionOptions } from '@tiptap/suggestion'
import { PluginKey } from '@tiptap/pm/state'
import { Extension } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'
import { VueRenderer } from '@tiptap/vue-3'
import type { Instance } from 'tippy.js'
import tippy from 'tippy.js'
import SlashMenuVue from '~/components/SlashMenu.vue'
import type { Item as SlashMenuItem } from '~/components/SlashMenu.vue'

export interface SlashMenuOptions {
  HTMLAttributes: Record<string, any>
  suggestion: Omit<SuggestionOptions<SlashMenuItem>, 'editor'>
}

export const SlashMenuPluginKey = new PluginKey('slashMenu')

export const SlashMenu = Extension.create<SlashMenuOptions>({
  name: 'slashMenu',

  addOptions() {
    return {
      HTMLAttributes: {},
      suggestion: {
        char: '/',
        pluginKey: SlashMenuPluginKey,
        command({ editor, range, props }) {
          props.command(editor, range)
        },
        render() {
          let component: VueRenderer, popup: Instance[]

          return {
            onStart(props) {
              component = new VueRenderer(SlashMenuVue, {
                props,
                editor: props.editor,
              })

              if (!props.clientRect)
                return

              popup = tippy('body', {
                appendTo: () => document.body,
                content: component.element,
                getReferenceClientRect: props.clientRect as () => DOMRect,
                interactive: true,
                placement: 'bottom-start',
                showOnCreate: true,
                trigger: 'manual',
              })
            },
            onUpdate(props) {
              component.updateProps(props)

              if (!props.clientRect)
                return

              popup[0].setProps({
                getReferenceClientRect: props.clientRect as () => DOMRect,
              })
            },
            onKeyDown({ event }) {
              if (event.key === 'Escape') {
                popup[0].destroy()
                component.destroy()
                return true
              }

              return component.ref?.onKeyDown(event)
            },
            onExit() {
              popup[0].destroy()
              component.destroy()
            },
          }
        },
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})
