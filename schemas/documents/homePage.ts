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
