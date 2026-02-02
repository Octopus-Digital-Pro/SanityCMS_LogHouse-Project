import {defineField, defineType} from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'preTitle',
      title: 'Pre-title',
      type: 'string',
      description: 'Small text above the main title',
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
      description: 'Optional description below the title',
    }),

    defineField({
      name: 'media',
      title: 'Media',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (Rule) => Rule.required().warning('Alt text improves accessibility and SEO'),
        }),
      ],
    }),

    defineField({
      name: 'button',
      title: 'Button',
      type: 'object',
      options: {collapsible: true, collapsed: false},
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
          validation: (Rule) =>
            Rule.uri({
              allowRelative: true,
              scheme: ['http', 'https', 'mailto', 'tel'],
            }),
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
        title: title || 'Hero',
        subtitle: subtitle || 'Hero section',
        media,
      }
    },
  },
})
