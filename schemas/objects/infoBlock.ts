import {defineField, defineType} from 'sanity'

export const infoBlock = defineType({
  name: 'infoBlock',
  title: 'Info Block',
  type: 'object',
  fields: [
    defineField({
      name: 'preTitle',
      title: 'Pre-title',
      type: 'string',
      description: 'Small label above the main title',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'showDivider',
      title: 'Show divider',
      type: 'boolean',
      initialValue: true,
      description: 'Toggles the horizontal line under the title',
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
        }),
        defineField({
          name: 'href',
          title: 'Link',
          type: 'url',
          description: 'Use a full URL (e.g. https://...)',
          validation: (Rule) =>
            Rule.uri({
              allowRelative: true, // allows "/contact" too
              scheme: ['http', 'https', 'mailto', 'tel'],
            }),
        }),
        defineField({
          name: 'variant',
          title: 'Variant',
          type: 'string',
          options: {
            list: [
              {title: 'Primary', value: 'primary'},
              {title: 'Secondary', value: 'secondary'},
              {title: 'Link', value: 'link'},
            ],
            layout: 'radio',
          },
          initialValue: 'primary',
        }),
      ],
      // Hide the whole button group until label or href is being used (optional)
      options: {collapsible: true, collapsed: false},
    }),
    defineField({
      name: 'media',
      title: 'Media (image)',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (Rule) => Rule.required().warning('Alt text helps accessibility/SEO'),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'preTitle',
      media: 'media',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Info Block',
        subtitle: subtitle ? `Pre-title: ${subtitle}` : 'Module',
        media,
      }
    },
  },
})
