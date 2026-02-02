import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      description: 'Only used in the Studio (e.g. "Home")',
      validation: (Rule) => Rule.required(),
      initialValue: 'Home',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
      initialValue: {current: '/'},
    }),

    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {type: 'infoBlock'},
        {type: 'hero'},
        {type: 'accordion'},
        {type: 'clients'},
        // add more modules later: {type: 'hero'}, {type: 'gallery'}, ...
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

  preview: {
    prepare() {
      return {
        title: 'Home page',
        subtitle: '/',
      }
    },
  },
})
