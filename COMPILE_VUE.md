How to compile Vue templates
============================

Apparently, Firefox doesn't allow Vue to inject rendering scripts (see [here](https://medium.com/javascript-in-plain-english/how-i-built-a-browser-extension-with-vue-part-2-2c4ab2dd752d)).
So you have to use Vue templates with the `render()` method.

To use `.vue` files you need to compile them to JavaScript.
Here we explain how to compile them using webpack.

How to compile `.vue` files
---------------------------

To compile these files we're going to need to install `vue-loader` and `vue-template-compiler`.

    npm install --save-dev vue-loader vue-template-compiler

Now we follow the instruction in [this](https://vue-loader.vuejs.org/guide/#manual-setup) page to set up the `webpack.config.file`.

The result should be a something similar to this:

```JavaScript
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  module: {
    rules: [
      // ... other rules
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ]
}

```


How to use the template
-----------------------

As we have to use the `render()` function instead of normal Vue functionality, things get a bit complicated.
I found the best way of actualising elements is by calling some of their methods.
In this case, ideally, we want a method that receives a new job offer and actualises the elements of the page accordingly.

```JavaScript
var job = {
  title: "Fairy manager",
  compInfo: "Fairy Corp",
  description: "We need a new Fairy manager."
}
```

It is easy to call methods within an element.
But as the info comes from a message from the outside, we have to call them from a parent element.
In this case the best thing to do is to add a reference when creating the cildren so we can call it later like this:

```JavaScript
vueElement.$refs.childReference.methodName();
```

To add a reference we need to use the `render()` method as well, we have no other option.
So we can do this

```JavaScript
render(h) {
    return h('app', {ref: "childComponent"});
}
```

Now we can indeed call any method from the child component with the reference `childComponent`.
