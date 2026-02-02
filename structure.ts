import {StructureBuilder} from 'sanity/structure'
import {HomeIcon, DocumentIcon, CogIcon, SearchIcon} from '@sanity/icons'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // 🏠 Pages
      S.listItem()
        .title('Pages')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              // Home page (singleton by type, but still one doc)
              S.listItem()
                .title('Home page')
                .icon(HomeIcon)
                .child(S.documentTypeList('homePage').title('Home page')),

              // Standard pages
              S.listItem().title('Pages').child(S.documentTypeList('page')),

              // Events
              S.listItem().title('Events').child(S.documentTypeList('event')),
            ]),
        ),

      // 🌍 Globals / Singletons
      S.listItem()
        .title('Globals')
        .icon(SearchIcon)
        .child(
          S.list()
            .title('Globals')
            .items([
              // Footer singleton
              S.listItem()
                .title('Footer')
                .icon(CogIcon)
                .child(S.document().schemaType('footer').documentId('footer')),

              // Header Offcanvas singleton
              S.listItem()
                .title('Header Offcanvas')
                .icon(CogIcon)
                .child(S.document().schemaType('headerOffcanvas').documentId('headerOffcanvas')),

              // robots.txt singleton
              S.listItem()
                .title('robots.txt')
                .icon(CogIcon)
                .child(S.document().schemaType('robotsTxt').documentId('robotsTxt')),
            ]),
        ),

      // 🔽 Everything else (optional)
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['page', 'homePage', 'event', 'footer', 'headerOffcanvas', 'robotsTxt'].includes(
            listItem.getId()!,
          ),
      ),
    ])
