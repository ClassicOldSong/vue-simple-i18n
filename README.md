# vue-simple-i18n
(maybe) the most simple and easy to use i18n library for Vue2 within 1kb

[demo](https://vi18n.ccoooss.com/)

[Playground](https://codepan.net/gist/e368155b1a6e034f802001fcb75d72a7)

## Usage
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
    name: 'Yukino', // Value used by template
    'v_locale': i18n.locale, // Specify 'v_locale' could change locale component-wide
    locales: i18n.locales
  },
  computed: i18n.map(['welcome']) // Map the translation!
})
```
