// /sanity/schemaTypes/objects/accordion.ts
import {defineType, defineField} from 'sanity'

export const accordion = defineType({
  name: 'accordion',
  title: 'Accordion',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'items',
      title: 'Accordion elements',
      type: 'array',
      of: [
        {
          name: 'accordionItem',
          title: 'Accordion item',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Accordion title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'description',
              title: 'Accordion description',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [{title: 'Normal', value: 'normal'}],
                  lists: [],
                  marks: {
                    decorators: [
                      {title: 'Bold', value: 'strong'},
                      {title: 'Italic', value: 'em'},
                      {title: 'Underline', value: 'underline'},
                    ],
                    annotations: [
                      {
                        name: 'link',
                        title: 'Link',
                        type: 'object',
                        fields: [
                          defineField({
                            name: 'href',
                            title: 'URL',
                            type: 'url',
                            validation: (Rule) =>
                              Rule.required().uri({
                                scheme: ['http', 'https', 'mailto', 'tel'],
                              }),
                          }),
                          defineField({
                            name: 'blank',
                            title: 'Open in new tab',
                            type: 'boolean',
                            initialValue: true,
                          }),
                        ],
                      },
                    ],
                  },
                },
              ],
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'title'},
          },
        },
      ],
      validation: (Rule) =>
        Rule.required().min(3).error('Please add at least 3 accordion elements.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      count: 'items.length',
    },
    prepare({title, count}) {
      return {
        title: title || 'Accordion',
        subtitle: `${count ?? 0} item(s)`,
      }
    },
  },
})
