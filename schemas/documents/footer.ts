// /sanity/schemaTypes/documents/footer.ts
import {defineType, defineField} from 'sanity'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'copyright',
      title: 'Copyright text',
      type: 'string',
      description: 'Supports markdown on the frontend',
    }),

    defineField({
      name: 'socials',
      title: 'Social links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required().uri({scheme: ['http', 'https']}),
            }),
          ],
          preview: {
            select: {
              media: 'icon',
              title: 'url',
            },
          },
        },
      ],
    }),

    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 2,
    }),

    defineField({
      name: 'contact',
      title: 'Contact details',
      type: 'object',
      fields: [
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
        title: 'Global Footer',
        subtitle: 'Site-wide footer settings',
      }
    },
  },
})
