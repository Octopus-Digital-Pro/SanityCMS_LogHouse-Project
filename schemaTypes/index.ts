import {eventType} from './eventType'

import {page} from '../schemas/documents/page'
import {homePage} from '../schemas/documents/homePage'
import {footer} from '../schemas/documents/footer'
import {infoBlock} from '../schemas/objects/infoBlock'
import {hero} from '../schemas/objects/hero'
import {accordion} from '../schemas/objects/accordion'
import {clients} from '../schemas/objects/clients'
import {headerOffcanvas} from '../schemas/documents/headerOffcanvas'
import {robotsTxt} from '../schemas/documents/robotsTxt'

export const schemaTypes = [
  eventType,
  page,
  homePage,
  footer,
  headerOffcanvas,
  robotsTxt,
  infoBlock,
  hero,
  accordion,
  clients,
]
