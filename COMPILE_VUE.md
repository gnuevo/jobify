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

The only part missing now is to create some `props` the Vue element is going to track.

```JavaScript
props: ['title', 'compInfo', 'description', 'saved']
```

If any of the variables described in the `props` changes, it triggers the re-render of the element.
So we can control the information that is displayed.
To change a `prop` we make use of the keyword `this` from one of the methods.
For example

```JavaScript
methods: {
  actualiseTitle(new_title) {
    this.title = new_title; // this will trigger the rendering of the new info
  }
}
```

Now we can indeed call any method from the child component with the reference `childComponent`.

How to send messages back to parent
-----------------------------------

To communicate from child to parent we have to make use of Vue events.

From the child component we need to call the `$emit(event_name, data)` function.
That will sen an event to the parent element.
See a tutorial [here](https://vuejs.org/v2/guide/components-custom-events.html).

```html
<!-- inside child -->
<button @click="this.$emit(event_name, data)"></button>
```

Now we need to capture that event from the parent element.
Normally we would capture it using the `v-on` directive.

```html
<child v-on:event_name="handler"></child>
```

In our case, as we make use of the render function, things are a bit different.
We cannot use the `v-on` directive with the render function `h`.
So we need to make use of the data object that `h` provides us.
To see the full syntax of this object see [here](https://es-vuejs.github.io/vuejs.org/v2/guide/render-function.html#El-objeto-de-datos-en-profundidad).
We make use of the `on` property.

```JavaScript
h('app', {
  on: {
    mymsg: this.onchildevent
  }
});
```
Now, when the `mymsg` event is triggered, the parent will handle it using the method `onchildevent`.
Here is the full example.

```javascript
var app = new Vue({
    el: ...,
    components: {
        App
    },
    data: {
      ...
    },
    render(h) {
        return h('app', {ref: "childComponent", on: {mymsg: this.onchildevent}});
    },

    methods: {
      onchildevent: function(info) {
        console.log("onChildEvent");
        console.log(info);
      }
    }
});
```
