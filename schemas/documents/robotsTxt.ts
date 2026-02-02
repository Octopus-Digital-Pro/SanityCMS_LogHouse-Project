import {defineField, defineType} from 'sanity'

export const robotsTxt = defineType({
  name: 'robotsTxt',
  title: 'robots.txt',
  type: 'document',

  fields: [
    defineField({
      name: 'disallowAll',
      title: 'Disallow all crawling',
      type: 'boolean',
      description: 'When ON, robots.txt will contain: Disallow: /',
      initialValue: false,
      options: {
        layout: 'switch', // slider/toggle UI
      },
    }),

    defineField({
      name: 'sitemaps',
      title: 'Sitemaps',
      type: 'array',
      description: 'Each entry outputs a "Sitemap: <url>" line.',
      of: [
        defineField({
          name: 'sitemapUrl',
          title: 'Sitemap URL',
          type: 'url',
          validation: (Rule) =>
            Rule.required().uri({
              scheme: ['http', 'https'],
            }),
        }),
      ],
      validation: (Rule) => Rule.min(0),
    }),
  ],

  preview: {
    prepare() {
      return {title: 'robots.txt'}
    },
  },
})
