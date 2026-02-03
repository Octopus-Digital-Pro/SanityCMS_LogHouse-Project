import {defineField, defineType} from 'sanity'

export const portfolioSection = defineType({
  name: 'portfolioSection',
  title: 'Portfolio Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Supports markdown on the frontend (markdownify).',
    }),

    defineField({
      name: 'options',
      title: 'Options',
      type: 'object',
      fields: [
        defineField({
          name: 'layout',
          title: 'Layout',
          type: 'string',
          initialValue: 'masonry',
          options: {
            list: [
              {title: 'Masonry', value: 'masonry'},
              {title: 'Grid', value: 'grid'},
              {title: 'Slider (Pro)', value: 'slider'},
              {title: 'Full-width (Pro)', value: 'full-width'},
            ],
            layout: 'radio',
          },
        }),
        defineField({
          name: 'appearance',
          title: 'Appearance',
          type: 'string',
          initialValue: 'light',
          options: {
            list: [
              {title: 'Light', value: 'light'},
              {title: 'Dark', value: 'dark'},
            ],
            layout: 'radio',
          },
        }),
        defineField({
          name: 'limit',
          title: 'Limit (portfolio mode only)',
          type: 'number',
          description:
            'If set, the frontend will slice the collection to this number. Ignored in accordion mode.',
          validation: (Rule) => Rule.min(1).integer(),
        }),
      ],
    }),

    defineField({
      name: 'items',
      title: 'Accordion items (optional)',
      type: 'array',
      description:
        'If you add at least 1 item, the frontend switches to accordion mode and does NOT render portfolio cards.',
      of: [
        {
          name: 'portfolioAccordionItem',
          title: 'Accordion item',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              description:
                'Frontend expects HTML in `item.description`. If you want rich editing, switch this field to `array` of `block` and render it accordingly in Astro.',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'title'},
            prepare({title}) {
              return {title: title || 'Accordion item'}
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      enable: 'enable',
      appearance: 'options.appearance',
      layout: 'options.layout',
      itemCount: 'items.length',
    },
    prepare({title, enable, appearance, layout, itemCount}) {
      const mode = itemCount && itemCount > 0 ? `Accordion (${itemCount})` : 'Portfolio grid'
      const state = enable === false ? 'Disabled' : 'Enabled'
      return {
        title: title || 'Portfolio Section',
        subtitle: `${state} • ${mode} • ${appearance || 'light'} • ${layout || 'masonry'}`,
      }
    },
  },
})
