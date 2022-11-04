import { App } from 'vue'

export interface MenuItemIcon {
  text?: string

  class?: string

  element?: string

  attributes?: object
}

export interface MenuItem {
  href: string | object

  name: string

  icon?: ItemIcon

  children?: Array<MenuItem | SidebarHeaderItem>

  class?: string

  activeClass?: boolean

  miniActiveClass?: boolean
}

export interface MenuHeaderItem {
  title: string

  class?: string

  attributes?: object
}

export interface MenuLine {
  LineShow: boolean

  class?: string

  attributes?: object

  element?: string
}

export class Menu {
  menu: Array<MenuItem | SidebarHeaderItem | MenuLine>

  menuType?: boolean

  collapsed?: boolean

  miniMenu?: boolean

  width?: string

  widthMiniMenu?: boolean

  removeIconSpace?: string

  closeOnClickOutSide?: boolean

  overLayerOnOpen?: boolean

  childrenOpenAnimation?: boolean

  postion?: boolean

  keepChildrenOpen?: boolean

  ChildrenOpenActiveRoute?: string
  checkButtonActive?: string
  vueRouterEnabel?: string
  BottomMiniMenuBtn?: string
  paddingTop?: string
  dark?: string
  rtl?: string
}

export default function install(app: App): void
