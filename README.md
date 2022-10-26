
# Basic Usage

a simple example would be like this : 
check out [**_props_**](#props) for properites
```html

<template>
  <VueAwesomeSideBar
      v-model:miniMenu="miniMenu"
      v-model:collapsed="collapsed"
      :menu="testMenu"
      vueRouterEnabel
    ></VueAwesomeSideBar>
</template>

<script setup>
import { ref } from 'vue'

const collapsed = ref(false)
const miniMenu = ref(false)

const testMenu = [
  {
    name: 'Getting Started',
    icon: { text: 'home' , class: 'material-icons-outlined' },
    children: [
      {
        name: 'level 1.1',
        href: '/a',
        icon: { text: 'home' , class: 'material-icons-outlined'},
        children: [
          {
            href: '/b',
            name: 'level 1.1.1',
          },
        ]
      },
      {
        name: 'level 1.2'
      }
    ],
  },
  {
    header: 'Settings'
  },
  {
    name: 'Dashboard',
    icon: { class: 'material-icons-outlined', text: 'dashboard' },
    children: [
      {
        href: '/c',
        name: 'level 2.1',
      },
    ]
  },
  {
    name: 'close menu',
    icon: { text: 'settings', class: 'material-icons-outlined' },
  },
]
</script>
```

# Installation

```
npm i vue-sidebar-menu --save
//or
yarn i vue-sidebar-menu --save
```

Install the plugin globally.

Vue js 3:
```js
//main.js
import { createApp } from 'vue'
import App from './App.vue'
import vueAwesomeSidebar from 'vue-awesome-sidebar'
import 'vue-awesome-sidebar/dist/vue-awesome-sidebar.css'

const app = createApp(App)
app.use(vueAwesomeSidebar)
app.mount("#app")
```
Nuxt js 3:
```js
import vueAwesomeSidebar from "vue-awesome-sidebar";
import "vue-awesome-sidebar/dist/vue-awesome-sidebar.css";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vueAwesomeSidebar);
});
```
or import the component locally :
```js
//App.vue
import vueAwesomeSidebar from 'vue-awesome-sidebar'
import 'vue-awesome-sidebar/dist/vue-awesome-sidebar.css'
export default {
  components: {
    vueAwesomeSidebar
  }
}
```
### Props

| Prop                  |  Type   |Default|                             Description                                                                 |
|-----------------------|:-------:|:-----:|:--------------------------------------------------------------------------------------------------------|
| menu(required)        | Array   |  null | Array list of [**_item properties_**](#menu-properties)                                                 |
| menuType(required)    | string  | simple| style of the menu can be either "fully" or "simple"                                                     |
| collapsed             | Boolean | false | sets menus collapsed state should be used with v-model                                                  |
| miniMenu              | boolean | false | makes manu mini - should be used with v-model                                                           |
| width                 | string  | 290px | sets width for menu                                                                                     |
| widthMiniMenu         | string  | 65px  | sets width for miniMenu                                                                                 |
| autoCollapse          | number  | null  | adds event listner to collapse menu when the given value((in px) is lower than the viewport width       |
| closeOnClickOutSide   | Boolean | false | Adds event listner to collapse Menu when clicked outside the menu                                       |
| overLayerOnOpen       | Boolean | false | Adds overlayer under the Menu with the menu is open                                                     |
| childrenOpenAnimation | Boolean | true  | opens menu item children with animation                                                                 |
| keepChildrenOpen      | Boolean | flase | keeps opened children items opened when parent item is closed                                           |
| position              | string  | fixed | sets menu positiong - by default menu is fixed on viewport                                              |
|ChildrenOpenActiveRoute| Boolean | true  |opens meneitem children on page load if an item with active "href" inside and miniActive class is apllyed|
| checkButtonActive     | Boolean | true  | checks if menuitems href is active, if so activeClass is  added to it and miniActive class to the parent|
| vueRouterEnabel       | Boolean | true  | when a meueitem is clicked vue-router will bue pushed to the items "href" property                      |
| BottomMiniMenuBtn     | Boolean | true  | Adds mini menu toggle bottom to bottom of menu                                                          |
| paddingTop            | String  | 0px   | Adds padding to top of menu - usefull when using with app bar with higher z-index                       |
| dark                  | Boolean | false | makes the theme of menu dark - color can be custimuzed with sass vars                                   |
| rtl                   | Boolean | false | Makes the entire menu right to left align                                                               |

## menu-properties

```ts
interface MenuItemIcon {
  text: string
  class?: string
  element?: string //defualt is <i>
  attributes?: object
}

interface MenuItem {
  href: string | object // vue-router Object
  name: string
  icon?: ItemIcon
  children?: Array< MenuItem | SidebarHeaderItem >
  class?: string
  collapseOnClick?: boolean //collapses menu when clicked
  activeClass?: boolean
  miniActiveClass?: boolean
}

interface MenuHeaderItem {
  title: string
  class?: string
  attributes?: object
}

interface MenuLine {
  LineShow: boolean
  class?: string
  attributes?: object
  element?: string
}
```
### Events

| Event Name                     | Description                                                     |
|--------------------------------|:----------------------------------------------------------------|
| `@item-click(MenuItem)`        | fired when a menu item is clicked                               |
|`@update:collapsed(isCollapsed)`| fired when menu is collapsed - should be used with "v-model"    |
| `@update:miniMenu(isMiniMenu)` | fired when menu is in mini state - should be used with "v-model"|

### Slots

```html
<!--menu items Append icon-->
<template #itemApendIcon="{ icon,isChildrenMenuOpen, active,miniActive }"></template>
<!--menu items label -->
<template #menuItemLabel="{labelName ,isChildrenMenuOpen, active,miniActive}"></template>
<!--menu items Preppend icon-->
<template #itemPrepandIcon="{ icon,isChildrenMenuOpen, active,miniActive }"></template>
<!--menu header item-->
<template #headerItem="{ header }"></template>
<!--menu header at the top of the menu-->
<template #header></template>
<!--menu footer -->
<template #footer></template>
<!--menus bottom toggle btn -->
<template #BottomMiniMenuBtn></template>
```

### Sass varibles

```scss
//z-index of the menu components rage form 848-854

//<--BASE-->
$overlayer-bg-color: rgba(0, 0, 0, 0.6);
$toggle-mini-btn-height: 50px;
$menu-item-simpleType-icon-height: 35px;
$menu-item-fullyType-height: 44px;
$label-font-size: 16px;//may not work with slots
$label-icon-size: 20px;//may not work with slots
$scroll-bar-width: 13px;

//<--COLORS-->
//NOTE : the "-white" at the end of each var defines the theme, you can change it to "-dark" to set it for dark mode theme
//example :"$icon-color-dark : #000000 " for dark theme and "$icon-color-white : #fafafa " for white theme
//note : may not work with slots depending on how the slots is used

//Menu
$menu-back-ground-color-white: white; -dark: #0d1117; //==> $menu-back-ground-color-dark:#0d1117
$border-color-white: #cfcfcf; -dark: rgba(170, 170, 170, 0.329);
$scroll-bar-color-white: rgb(184, 184, 184); -dark: #686868;
$header-color-white: #213547; -dark: #ffffffde;

//Menu item prepend icon
$icon-color-white: rgb(28, 30, 33); -dark: rgb(218, 221, 225);
$icon-active-color-white: #2c7ae0; -dark: rgb(44, 122, 224);
$icon-mini-active-color-white: #2c7ae0; -dark: rgb(44, 122, 224);
$icon-hover-color-white: ''; -dark: '';

//Menu item
$menu-item-bg-color-white: none; -dark: none;
$menu-item-hover-bg-white: rgb(242, 242, 242); -dark: hsla(0, 0%, 100%, 0.05);
$menu-item-active-bg-color-white: rgb(242, 242, 242); -dark: hsla(0, 0%, 100%, 0.05);
$mini-active-item-bg-color-white: none; -dark: none;

//Menu item label
$text-color-none-hover-white: rgb(28, 30, 33); -dark: rgb(218, 221, 225);
$text-active-color-white: #2c7ae0; -dark: rgb(44, 122, 224);
$text-mini-active-color-white: #2c7ae0; -dark: rgb(44, 122, 224);
$text-hover-color-white: none; -dark: none;

//menu item append icon
$append-icon-color-white: rgb(28, 30, 33); -dark: rgb(218, 221, 225);
$append-active-icon-color-white: rgb(28, 30, 33); -dark: rgb(218, 221, 225);

//horizental line
$hr-line-color-white: rgba(211, 211, 211, 0.548); -dark: rgba(211, 211, 211, 0.548);

//bottomBtn for miniMenu
$bottomBtn-bg-color-white: white; -dark: #13161b;
```

### Css class

```scss
//menu
.vas-menu{}
.menu-wraper{}//menu scroll wrapper
.miniCoolapseMenu{} //for mini menu
.compeleteCoolapseMenu{} //for collapsed menu
.dark-theme{}
.white-theme{}
.vas-footer{}
.bottomBtn{} // mini menutoggle button

//menu item
.menu-item-base{// wrapper for menu item ant children
  &.menuExpanded
}//apllayed to all menuitem
.menuExpanded{}
.label{
  .menu-icondd{}
  .labelName{}
  .icons{}
  .postIconOpenAnima{}
}
.menuexpand{}
.activeClass{}
.miniActiveClass{}
.labelHoverClass{}

//container
.items-container{}
.topContainer{}
```