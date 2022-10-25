# Vue Awesome Sidebar

Vue Awesome Sidbar is a powerfull and fast vue js(version 3) sidbar navigation library with a set of components and slots that are flexible, very lightweight and customizable with sass and css which is very easy to use.

#Features

# Table of Contents

- [**_Demo_**](#demo)
- [**_Installation_**](#installation)
  - [**_Vue.js_**](#Vue.js)
  - [**_Nuxt.js_**](#Nuxt.js)
- [**_Basic Usage_**](#usage)
- [**_Api_**](#api)
  - [**_Props_**](#api)
  - [**_Events_**](#api)
  - [**_Slots_**](#Slot-Names)
- [**_Styling_**](#api)
  - [**_Sass varibales_**](#Component-Attributes)
  - [**_Css_**](#Class-Name-Attributes)
- [**_Author_**](#authors-&&-Contributors)
- [**_License_**](#license)

&nbsp;

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
# Basic Usage

a simple example would be like this : 
```html

<template>
  <VueAwesomeSideBar
      v-model:miniMenu="miniMenu"
      v-model:collapsed="collapsed"
      :menu="testmENU"
      dark
      vueRouterEnabel
    ></VueAwesomeSideBar>
</template>

<script setup>
import { ref } from 'vue'

const collapsed = ref(false)
const miniMenu = ref(false)

const testmENU = [
  {
    name: 'Getting Started',
    href: '/a',
    icon: { text: 'home' , class: 'material-icons-outlined' },
    children: [
      {
        name: 'level 1.1',
        icon: { text: 'home' , class: 'material-icons-outlined'},
        children: [
          {
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
        href: '/level12/#w',
        name: 'level 2.1'
      },
    ]
  },
  {
    name: 'close menu',
    icon: { text: 'settings', class: 'material-icons-outlined' },
    collapseOnClick: true
  },
]
</script>
```

# API

### Props

| Prop                  |  Type   |Default|                             Description                                                                 |
|-----------------------|:-------:|:-----:|:--------------------------------------------------------------------------------------------------------|
| menu                  | Array   |  null | required - Array list of [**_item properties_**](#menu-properties)                                      |
| menuType              | string  | simple| required - style of the menu can be either "fully" or "simple"                                          |
| collapsed             | Boolean | false | optional - sets menus collapsed state should be used with v-model                                       |
| miniMenu              | boolean | false | optional - makes manu mini  should be used with v-model                                                 |
| width                 | string  | 290px | optional - sets width for menu                                                                          |
| widthMiniMenu         | string  | 65px  | optional - sets width for miniMenu                                                                      |
| closeOnClickOutSide   | Boolean | false | optional - Adds event listner to close Menu when clicked outside the menu                               |
| overLayerOnMenuOpen   | Boolean | false | optional - Adds overlayer under the Menu with the menu is open (should be used with closeOnClickOutSide)|
| childrenOpenAnimation | Boolean | true  |  optional - opens menu item children with animation                                                     |
| keepChildrenOpen      | Boolean | flase | keeps opened children items opened when parent item is closed                                           |
| position              | string  | fixed | sets menu positiong- by default menu is fixed on viewport                                               |
|ChildrenOpenActiveRoute| Boolean | true  | opens meneitem children if there is an menuitem with active "href" inside                               |
| checkButtonActive     | Boolean | true  | check if menuitemS href is active, if so activeClass is  added to it and miniActive class to the parent |
| vueRouterEnabel       | Boolean | true  | when a meueitem is clicked vue-router will bue pushed to the items "href" property                      |
| BottomMiniMenuBtn     | Boolean | true  | Adds mini menu toggle bottom to bottom of menu                                                          |
| paddingTop            | String  | 0px   | Adds padding to top of menu - usefull when using with appbar                                            |
| dark                  | Boolean | false | makes the theme of menu dark - color can be custimuzed with sass vars                                   |
| paddingTop            | String  | 0px   | Adds padding to top of menu - usefull when using with appbar                                            |
| rtl                   | Boolean | false | Makes the entire menu right to left align                                                               |

# menu properties

```ts
interface MenuItemIcon {
  text?: string
  class?: string
  element?: string
  attributes?: object
}

interface MenuItem {
  href: string | object
  name: string
  icon?: ItemIcon
  children?: Array<MenuItem | SidebarHeaderItem>
  class?: string
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

| Event Name                    | Description                             |
|-------------------------------|:----------------------------------------|
| `@item-click(itemObject)`        | fired when a menu item is clicked    |
| `@update:collapsed(isCollapsed)` | fired when menu is collapsed         |
| `@update:miniMenu(isMiniMenu)`  | fired when menu is in mini state      |

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

# Styling

### Sass varibles

```scss
//<--BASE-->
$overlayer-bg-color: rgba(0, 0, 0, 0.6);
$toggle-mini-btn-height: 50px;
$menu-item-simpleType-icon-height: 35px;
$menu-item-fullyType-height: 44px;
$label-font-size: 16px;//may not work with slots
$label-icon-size: 20px;//may not work with slots

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