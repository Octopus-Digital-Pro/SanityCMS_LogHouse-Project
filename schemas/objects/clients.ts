// /sanity/schemaTypes/objects/clients.ts
import {defineType, defineField} from 'sanity'

export const clients = defineType({
  name: 'clients',
  title: 'Clients / Logos',
  type: 'object',
  fields: [
    defineField({
      name: 'enable',
      title: 'Enable section',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Section heading (supports markdown on FE)',
    }),

    defineField({
      name: 'list',
      title: 'Client logos',
      description: 'Exactly 8 logos are required',
      type: 'array',
      of: [
        {
          name: 'clientLogo',
          title: 'Client logo',
          type: 'object',
          fields: [
            defineField({
              name: 'src',
              title: 'Logo image',
              type: 'image',
              options: {hotspot: true},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              validation: (Rule) => Rule.required().max(60).warning('Keep alt text short'),
            }),
          ],
          preview: {
            select: {
              media: 'src',
              title: 'alt',
            },
          },
        },
      ],
      // ✅ enforce exactly 8 items
      validation: (Rule) =>
        Rule.required().min(8).max(8).error('You must add exactly 8 client logos.'),
    }),

    defineField({
      name: 'options',
      title: 'Display options',
      type: 'object',
      fields: [
        defineField({
          name: 'columnsPerRow',
          title: 'Columns per row (desktop)',
          type: 'number',
          options: {
            list: [
              {title: '4 columns', value: 4},
              {title: '6 columns', value: 6},
            ],
            layout: 'radio',
          },
          initialValue: 4,
        }),

        defineField({
          name: 'appearance',
          title: 'Appearance',
          type: 'string',
          options: {
            list: [
              {title: 'Light', value: 'light'},
              {title: 'Dark', value: 'dark'},
            ],
            layout: 'radio',
          },
          initialValue: 'light',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      count: 'list.length',
    },
    prepare({title, count}) {
      return {
        title: title || 'Clients',
        subtitle: `${count ?? 0} / 8 logos`,
      }
    },
  },
})
