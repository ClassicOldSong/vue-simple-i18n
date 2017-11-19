# vue-simple-i18n
Probably the thinnest library to end all Vue i18n solution within 1kb

[Demo](https://vi18n.ccoooss.com/)

[Playground](https://codepan.net/gist/e368155b1a6e034f802001fcb75d72a7)

## Installation

CDN: [UNPKG](https://unpkg.com/vue-simple-i18n) | [jsDeliver](https://cdn.jsdelivr.net/npm/vue-simple-i18n@1.1.0/dist/vue-simple-i18n.min.js)

or

```
npm install vue-simple-i18n
```

then

```
import vI18n from 'vue-simple-i18n'
```

## Basic Usage
HTML:

``` html
<div id="app">
  <select v-model="v_locale">
    <option v-for="(locale, key) in locales" :value="key">{{locale.__name__}}</option>
  </select>
  <input type="text" v-model="name">
  <h1>{{welcome}}</h1>
</div>

```

JS:

``` javascript
import vI18n from 'vue-simple-i18n'

const i18n = new vI18n({
  base: 'en-us', // The base fallback when specified language not exists, defaults to 'en-us'
  locale: 'zh-cn', // Global language, defaults to browser language
  locales: {
    'en-us': {
      __name__: 'English', // Specify a display name for each language is highly recommended
      welcome: 'Welcome {{name}} to the Wonderland!' // Translation, default template supported is vue-like without expressions
    },
    'zh-cn': {
      __name__: '简体中文',
      welcome: '{{name}}，欢迎来到幻境！'
    }
  } // Where you put all your translations
})

new Vue({
  el: '#app',
  data: {
    name: 'Yukino', // Value used by translation template
    v_locale: i18n.locale, // Specify 'v_locale' could change locale component-wide
    locales: i18n.locales
  },
  computed: {
    ...i18n.map(['welcome']) // Map the translation!
  }
})
```

## Advanced Usage
### Programmatic Translation
Use case: singular/plural, grammatical gender etc.

Usage: Use a function that returns a string as the translation. The first argument passes to the function is the current Vue vm instance.

Example:

``` javascript
const i18n = new vI18n({
  locales: {
    'en-us': {
      problemsSolved: vm => `Total ${vm.count} problem${vm.count > 1 ? 's' : ''} solved.`
    }
  }
})
```

### Dynamic Locale Load
You can add a new locale or modify existing ones as you wish.

Example:

``` javascript
// Now we have English as default but we don't have a Chinese translation
// But the users specifies Chinese as their locale
const i18n = new vI18n({
  base: 'en-us',
  locale: 'zh-cn',
  locales: {
    'en-us': {
      welcome: 'Welcome {{name}} to the Wonderland!'
    }
  }
})

// Create the Vue instance
// Now all displayed locales are shown in English
const vm = new Vue({
  el: '#app',
  data: {
    name: 'Yukino'
  },
  computed: {
    ...i18n.map(['welcome'])
  }
})

// Now some how we get the Chinese translation
const ChineseTranslation = {
  welcome: '{{name}}，欢迎来到幻境!'
}

i18n.locales['zh-cn'] = ChineseTranslation

// Don't forget to refresh the Vue instance for this gadget is not embeded into Vue's life cycle
// Note that vm.$forceUpdate does not work on computed properties
// We should trigger re-compute by modifying one of the property on the instance
// Here we choose 'name'
let name = vm.name
vm.name = ''
vm.name = name
```
