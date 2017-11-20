# vue-simple-i18n
Probably the thinnest library to end all Vue i18n solutions within 1kb

[Demo](https://vi18n.ccoooss.com/) | [Playground](https://codepan.net/gist/e368155b1a6e034f802001fcb75d72a7)

## Installation

CDN: [UNPKG](https://unpkg.com/vue-simple-i18n) | [jsDeliver](https://cdn.jsdelivr.net/npm/vue-simple-i18n/dist/vue-simple-i18n.min.js)

or

```
npm install vue-simple-i18n
```

then

```
import vI18n from 'vue-simple-i18n'
```

## Basic Usage
**Use case:** All places where you need to display in different languages.

**Usage:** See example.

**Example:**

``` html
<div id="app">
  <select v-model="v_locale">
    <option v-for="(locale, key) in locales" :value="key">{{locale.__name__}}</option>
  </select>
  <input type="text" v-model="name">
  <h1>{{welcome}}</h1>
</div>

```

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
### Use Translation as a Method
<details>
<summary>Detail</summary>

**Use case:** Dynamic content in list rendering, temporary locale change, temporary value change etc.

**Usage:** Instead of map the translation to computed properties, map the translation directly to methods could use the translation as a method. Specify the `v_locale` property in the argument could change the locale string-wide.

**Example:**

``` html
<div id="app">
  <h1>How to say "Hello" in different languages</h1>
  <div>
    <label>Name:<input type="text" v-model="name"></label>
  </div>
  <ul>
    <li v-for="(locale, key) in locales">{{helloMsg({v_locale: key, languageName: locale.__name__})}}</li>
  </ul>
</div>
```

``` javascript
const i18n = new vI18n({
  locales: {
    'en-us': {
      __name__: 'English',
      hello: 'Hello'
      helloMsg: 'Hello {{name}}, this is how we say "{{hello}}" in {{languageName}}.'
    },
    'zh-cn': {
      __name__: '简体中文',
      hello: '你好',
      helloMsg: '{{name}}您好，这是如何用{{languageName}}说“{{hello}}”。'
    },
    // More locales...
  }
})

new Vue({
  el: '#app',
  data: {
    name: 'Yukino',
    locales: i18n.locales
  },
  computed: {
    ...i18n.map(['hello'])
  },
  methods: {
    ...i18n.map(['helloMsg'])
  }
})
```

</details>

### Programmatic Translation
<details>
<summary>Detail</summary>

**Use case:** Singular/plural, grammatical gender etc.

**Usage:** Insteas of a string, write a function that returns a string as the translation. The first argument passes to the function is the current Vue vm instance, the second argument is the value you passed to the template if you are using it as a method.

**Example:**

``` html
<div id="app">
  <ul>
    <li v-for="index in steps">{{step({index})}}</li>
  </ul>
</div>
```

``` javascript
const i18n = new vI18n({
  locales: {
    'en-us': {
      step: (vm, vars) => `${vars.index} step${vars.index > 1 ? 's' : ''} completed, total ${vm.steps} step${vm.steps > 1 ? 's' : ''}.`
    }
  }
})

new Vue({
  el: '#app',
  data: {
    steps: 10
  },
  methods: {
    ...i18n.map(['step'])
  }
})
```

</details>

### Dynamic Load
<details>
<summary>Detail</summary>

**Use case:** Add a new locale or modify existing ones on demand.

**Usage:** Simply modify the i18n instance you created. Refresh the Vue instance, it works!

**Example:**

``` javascript
// Now we have English as default but we don't have a Chinese translation
// But the user specifies Chinese as his locale
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
// A little bit hacky here but we have to do this due to the restriction
// Here we choose 'name'
let name = vm.name
vm.name = ''
vm.name = name
```

</details>


### Nested Expressions
<details>
<summary>Detail</summary>

**Use case:** Display translations within translations etc.

**Usage:** See [Use Translation as a Method](#use-translation-as-a-method).

**Note:** String level locales will not inherit in nested expressions.

</details>

## License: [MIT](https://cos.mit-license.org/)
Contributions welcomed, but please keep the minified js under 1kb :point_up:
