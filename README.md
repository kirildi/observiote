![NodeJS](https://github.com/kirildi/observiote/actions/workflows/nodejs.yml/badge.svg)  

# observiote

Simple IoT devices monitoring App
 

## API Information

Application does't support CRUD operations at the moment. 
The main idea was to monitoring mostly small or hobby IoT devices, which are already added to the database,
and they send/store their data via another API service on local(private) server.

## Setup

Donwload the project and firstly run
`npm install` to fetch the needed packages (check `package.json`)

To build it run `npm build` then move the content of the `dist` folder in the desired static server root directory/subdirectory. 

### Recommended IDE Setup

Vue 3 + Typescript + Vite

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) (for the Typescript support),

Or use the plugin:
[TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).
