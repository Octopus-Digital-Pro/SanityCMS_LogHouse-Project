// /sanity/schemaTypes/documents/headerOffcanvas.ts
import {defineType, defineField} from 'sanity'

export const headerOffcanvas = defineType({
  name: 'headerOffcanvas',
  title: 'Header – Offcanvas',
  type: 'document',
  fields: [
    defineField({
      name: 'enable',
      title: 'Enable offcanvas',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Short text shown under the logo',
    }),

    defineField({
      name: 'button',
      title: 'Call to action button',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Button label',
          type: 'string',
        }),
        defineField({
          name: 'url',
          title: 'Button link',
          type: 'url',
          validation: (Rule) => Rule.uri({scheme: ['http', 'https', 'mailto', 'tel']}),
        }),
      ],
    }),

    defineField({
      name: 'contactInfo',
      title: 'Contact information',
      type: 'object',
      fields: [
        defineField({
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'phone',
          title: 'Phone',
          type: 'string',
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (Rule) => Rule.email(),
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Header Offcanvas',
        subtitle: 'Global offcanvas menu content',
      }
    },
  },
})
