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
  /**
   * List of Items in the menu
   * Follow https://github.com/yaminncco/vue-sidebar-menu#item-properties
   */
  menu: Array<MenuItem | SidebarHeaderItem | MenuLine>

  /**
   * Sidebar Collapse state (v-model:collapsed to enable two-way data binding).
   * by default false
   */
  menuType?: boolean

  collapsed?: boolean

  miniMenu?: boolean

  width?: string

  widthMiniMenu?: boolean

  removeIconSpace?: string

  closeOnClickOutSide?: boolean

  overLayerOnOpen?: boolean

  /**
   * Position sidebar right to left.
   * by default false
   */
  childrenOpenAnimation?: boolean

  postion?: boolean
  /**
   * Make sidebar relative to the parent (by default the sidebar is relative to the viewport).
   * by default false
   */

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
