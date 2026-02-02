import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const singletonActions = new Set(['publish', 'discardChanges', 'restore'])
const singletonTypes = new Set(['footer', 'headerOffcanvas'])

export default defineConfig({
  name: 'default',
  title: 'LogHouse by the Lake',

  projectId: 'io5wefjf',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S: import('sanity/structure').StructureBuilder) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Footer')
              .id('footer')
              .child(S.document().schemaType('footer').documentId('footer')),
            S.listItem()
              .title('Header Offcanvas')
              .id('headerOffcanvas')
              .child(S.document().schemaType('headerOffcanvas').documentId('headerOffcanvas')),
            ...S.documentTypeListItems().filter(
              (item: {getId?: () => string | undefined}) =>
                item.getId?.() && !singletonTypes.has(item.getId()!),
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({action}) => action && singletonActions.has(action))
        : input,
  },
})
