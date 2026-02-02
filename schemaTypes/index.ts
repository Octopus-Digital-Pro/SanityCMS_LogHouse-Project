import {eventType} from './eventType'

import {page} from '../schemas/documents/page'
import {homePage} from '../schemas/documents/homePage'
import {footer} from '../schemas/documents/footer'
import {HeaderOptions} from 'sanity/presentation'
import {infoBlock} from '../schemas/objects/infoBlock'
import {hero} from '../schemas/objects/hero'
import {accordion} from '../schemas/objects/accordion'
import {clients} from '../schemas/objects/clients'
import {headerOffcanvas} from '../schemas/documents/headerOffcanvas'

export const schemaTypes = [
  eventType,
  page,
  homePage,
  footer,
  headerOffcanvas,
  infoBlock,
  hero,
  accordion,
  clients,
]
