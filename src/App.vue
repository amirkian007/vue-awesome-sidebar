<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Menu from "./components/Menu.vue";

const testmENU:any = [
      {
        name: 'Getting Started',
        icon: 'home',
        children: [
          {
            name: 'level 1.1',
            icon: 'home',

            children: [
              {
                name: 'level 1.1.1',
                children: [
                  {
                    name: 'level 1.1.1.1',
                    children: [
                      {
                        name: 'level 1.1.1.1'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: 'level 1.2'
          }
        ]
      },
      {
        name: 'Dashboard',
        icon: 'dashboard',
        children: [
          {
            name: 'level 2.1'
          },
          {
            name: 'level 2.2'
          },
          {
            name: 'level 2.3'
          }
        ]
      },
      {
        name: 'Settings',
        icon: 'settings'
      },
      {
        name: 'Settings',
        icon: 'settings'
      },
      {
        name: 'Settings',
        icon: 'settings'
      },
      {
        name: 'Settings',
        icon: 'settings'
      },
      {
        name: 'Settings',
        icon: 'settings'
      },
      {
        name: 'Settings',
        icon: 'settings'
      },
      {
        name: 'Settings',
        icon: 'settings'
      },
      {
        name: 'Settings',
        icon: 'settings'
      },
      {
        name: 'Settings',
        icon: 'settings'
      },
      {
        name: 'Settings',
        icon: 'settings'
      },
      {
        name: 'Settings',
        icon: 'settings'
      },
      {
        name: 'Settings',
        icon: 'settings'
      },
      {
        name: 'Settings',
        icon: 'settings'
      },
      {
        name: 'Settings',
        icon: 'settings'
      },
      {
        name: 'Settings',
        icon: 'settings'
      },
      
    ]
</script>

<template>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div> -->
  <Menu :menu="testmENU"/> 
 <!-- <aside class="theme-doc-sidebar-container docSidebarContainer_b6E3">
    <div class="sidebar_njMd">
      <nav class="menu thin-scrollbar menu_SIkG">
        <ul class="theme-doc-sidebar-menu menu__list">
          <li
            class="
              theme-doc-sidebar-item-category
              theme-doc-sidebar-item-category-level-1
              menu__list-item menu__list-item--collapsed
            "
          >
            <div class="menu__list-item-collapsible">
              <a
                href="#"
                class="
                  menu__link
                  menu__link--sublist
                  menu__link--sublist-caret
                  menu__link--active
                "
                aria-expanded="false"
                >💡 Getting Started</a
              >
            </div>
            <ul
              style="
                display: none;
                overflow: hidden;
                height: 0px;
                will-change: height;
                transition: height 220ms ease-in-out 0s;
              "
              class="menu__list"
            >
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link menu__link--active"
                  aria-current="page"
                  tabindex="-1"
                  href="/docs/"
                  >👋 Introduction</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-category
                  theme-doc-sidebar-item-category-level-2
                  menu__list-item menu__list-item--collapsed
                "
              >
                <div class="menu__list-item-collapsible">
                  <a
                    href="#"
                    class="
                      menu__link menu__link--sublist menu__link--sublist-caret
                    "
                    aria-expanded="false"
                    tabindex="-1"
                    >🚀 Get started</a
                  >
                </div>
                <ul
                  style="
                    display: none;
                    overflow: hidden;
                    height: 0px;
                    will-change: height;
                    transition: height 297ms ease-in-out 0s;
                  "
                  class="menu__list"
                >
                  <li
                    class="
                      theme-doc-sidebar-item-category
                      theme-doc-sidebar-item-category-level-3
                      menu__list-item
                    "
                  >
                    <div class="menu__list-item-collapsible">
                      <a
                        href="#"
                        class="
                          menu__link
                          menu__link--sublist
                          menu__link--sublist-caret
                        "
                        aria-expanded="true"
                        tabindex="-1"
                        >📦 Installation</a
                      >
                    </div>
                    <ul
                      style="display: block; overflow: visible; height: auto"
                      class="menu__list"
                    >
                      <li
                        class="
                          theme-doc-sidebar-item-link
                          theme-doc-sidebar-item-link-level-4
                          menu__list-item
                        "
                      >
                        <a
                          class="menu__link"
                          tabindex="0"
                          href="/docs/installation/windows"
                          >⊞ Windows</a
                        >
                      </li>
                      <li
                        class="
                          theme-doc-sidebar-item-link
                          theme-doc-sidebar-item-link-level-4
                          menu__list-item
                        "
                      >
                        <a
                          class="menu__link"
                          tabindex="0"
                          href="/docs/installation/macos"
                          >🍏 macOS</a
                        >
                      </li>
                      <li
                        class="
                          theme-doc-sidebar-item-link
                          theme-doc-sidebar-item-link-level-4
                          menu__list-item
                        "
                      >
                        <a
                          class="menu__link"
                          tabindex="0"
                          href="/docs/installation/linux"
                          >🐧 Linux</a
                        >
                      </li>
                    </ul>
                  </li>
                  <li
                    class="
                      theme-doc-sidebar-item-link
                      theme-doc-sidebar-item-link-level-3
                      menu__list-item
                    "
                  >
                    <a
                      class="menu__link"
                      tabindex="-1"
                      href="/docs/installation/fonts"
                      >🔤 Fonts</a
                    >
                  </li>
                  <li
                    class="
                      theme-doc-sidebar-item-link
                      theme-doc-sidebar-item-link-level-3
                      menu__list-item
                    "
                  >
                    <a
                      class="menu__link"
                      tabindex="-1"
                      href="/docs/installation/prompt"
                      >✨ Prompt</a
                    >
                  </li>
                  <li
                    class="
                      theme-doc-sidebar-item-link
                      theme-doc-sidebar-item-link-level-3
                      menu__list-item
                    "
                  >
                    <a
                      class="menu__link"
                      tabindex="-1"
                      href="/docs/installation/customize"
                      >💅🏼 Customize</a
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li
            class="
              theme-doc-sidebar-item-category
              theme-doc-sidebar-item-category-level-1
              menu__list-item menu__list-item--collapsed
            "
          >
            <div class="menu__list-item-collapsible">
              <a
                href="#"
                class="menu__link menu__link--sublist menu__link--sublist-caret"
                aria-expanded="false"
                >⚙️ Configuration</a
              >
            </div>
            <ul
              class="menu__list"
              style="
                display: none;
                overflow: hidden;
                height: 0px;
                will-change: height;
                transition: height 342ms ease-in-out 0s;
              "
            >
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/configuration/overview"
                  >General</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/configuration/block"
                  >Block</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/configuration/segment"
                  >Segment</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/configuration/sample"
                  >Sample</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/configuration/title"
                  >Console title</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/configuration/colors"
                  >Colors</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/configuration/templates"
                  >Templates</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/configuration/secondary-prompt"
                  >Secondary prompt</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/configuration/debug-prompt"
                  >Debug prompt</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/configuration/transient"
                  >Transient prompt</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/configuration/line-error"
                  >Line error</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/configuration/tooltips"
                  >Tooltips</a
                >
              </li>
            </ul>
          </li>
          <li
            class="
              theme-doc-sidebar-item-category
              theme-doc-sidebar-item-category-level-1
              menu__list-item menu__list-item--collapsed
            "
          >
            <div class="menu__list-item-collapsible">
              <a
                href="#"
                class="menu__link menu__link--sublist menu__link--sublist-caret"
                aria-expanded="false"
                >🌟 Segments</a
              >
            </div>
            <ul
              class="menu__list"
              style="
                display: none;
                overflow: hidden;
                height: 0px;
                will-change: height;
                transition: height 584ms ease-in-out 0s;
              "
            >
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/segments/angular"
                  >Angular</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/aws"
                  >AWS</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/az"
                  >Azure</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/azfunc"
                  >Azure Functions</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/segments/battery"
                  >Battery</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/segments/brewfather"
                  >Brewfather</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/cds"
                  >CDS</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/segments/command"
                  >Command</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/segments/crystal"
                  >Crystal</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/cf"
                  >Cloud Foundry</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/segments/cftarget"
                  >Cloud Foundry Target</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/cmake"
                  >Cmake</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/dart"
                  >Dart</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/dotnet"
                  >Dotnet</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/segments/executiontime"
                  >Execution Time</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/exit"
                  >Exit code</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/segments/flutter"
                  >Flutter</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/fossil"
                  >Fossil</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/git"
                  >Git</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/segments/poshgit"
                  >Git (posh-git)</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/golang"
                  >Golang</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/segments/haskell"
                  >Haskell</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/ipify"
                  >Ipify</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/iterm"
                  >iTerm</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/java"
                  >Java</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/julia"
                  >Julia</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/kotlin"
                  >Kotlin</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/segments/kubectl"
                  >Kubectl</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/lua"
                  >Lua</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/nbgv"
                  >Nbgv</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/segments/nightscout"
                  >Nightscout</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/npm"
                  >NPM</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/node"
                  >Node</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/nx"
                  >Nx</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/os"
                  >OS</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/owm"
                  >Open Weather Map</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/path"
                  >Path</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/perl"
                  >Perl</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/php"
                  >PHP</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/segments/plastic"
                  >Plastic SCM</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/segments/project"
                  >Project</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/python"
                  >Python</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/r"
                  >R</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/root"
                  >Root</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/ruby"
                  >Ruby</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/rust"
                  >Rust</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/segments/session"
                  >Session</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/shell"
                  >Shell</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/segments/spotify"
                  >Spotify</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/strava"
                  >Strava</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/svn"
                  >Subversion</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/swift"
                  >Swift</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/segments/sysinfo"
                  >System Info</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/segments/terraform"
                  >Terraform</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/text"
                  >Text</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/time"
                  >Time</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/segments/ui5tooling"
                  >UI5 Tooling</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/segments/wakatime"
                  >Wakatime</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/wifi"
                  >WiFi</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/segments/withings"
                  >Withings</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/winreg"
                  >Windows Registry Key Query</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a class="menu__link" tabindex="-1" href="/docs/segments/ytm"
                  >YouTube Music</a
                >
              </li>
            </ul>
          </li>
          <li
            class="
              theme-doc-sidebar-item-category
              theme-doc-sidebar-item-category-level-1
              menu__list-item menu__list-item--collapsed
            "
          >
            <div class="menu__list-item-collapsible">
              <a
                href="#"
                class="menu__link menu__link--sublist menu__link--sublist-caret"
                aria-expanded="false"
                >🙋🏾‍♀️ Contributing</a
              >
            </div>
            <ul
              class="menu__list"
              style="
                display: none;
                overflow: hidden;
                height: 0px;
                will-change: height;
                transition: height 258ms ease-in-out 0s;
              "
            >
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/contributing/started"
                  >Get Started</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/contributing/segment"
                  >Add Segment</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/contributing/git"
                  >Git Commands</a
                >
              </li>
              <li
                class="
                  theme-doc-sidebar-item-link
                  theme-doc-sidebar-item-link-level-2
                  menu__list-item
                "
              >
                <a
                  class="menu__link"
                  tabindex="-1"
                  href="/docs/contributing/plastic"
                  >Plastic SCM testing</a
                >
              </li>
            </ul>
          </li>
          <li
            class="
              theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1
              menu__list-item
            "
          >
            <a class="menu__link" href="/docs/themes">🎨 Themes</a>
          </li>
          <li
            class="
              theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1
              menu__list-item
            "
          >
            <a class="menu__link" href="/docs/share">📸 Share theme</a>
          </li>
          <li
            class="
              theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1
              menu__list-item
            "
          >
            <a class="menu__link" href="/docs/faq">🤨 FAQ</a>
          </li>
          <li
            class="
              theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1
              menu__list-item
            "
          >
            <a class="menu__link" href="/docs/migrating"
              >⚰️ PowerShell Module</a
            >
          </li>
          <li
            class="
              theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1
              menu__list-item
            "
          >
            <a class="menu__link" href="/docs/contributors">✨ Contributors</a>
          </li>
        </ul>
      </nav>
    </div>
  </aside> -->
</template>
