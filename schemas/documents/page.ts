import {defineField, defineType} from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {type: 'infoBlock'},
        // Later you’ll add more modules here: hero, gallery, CTA, etc.
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {name: 'title', type: 'string', title: 'SEO Title'},
        {name: 'description', type: 'text', title: 'Meta Description'},
        {name: 'ogTitle', type: 'string', title: 'Open Graph Title'},
        {name: 'ogDescription', type: 'text', title: 'Open Graph Description'},
        {name: 'ogImage', type: 'image', title: 'Open Graph Image'},
        {name: 'noIndex', type: 'boolean', title: 'No Index'},
        {name: 'noFollow', type: 'boolean', title: 'No Follow'},
      ],
    }),
  ],
})
