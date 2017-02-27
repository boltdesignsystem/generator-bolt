![Friends of PegaKit](https://raw.githubusercontent.com/PegaKit/PegaKit/master/media/dist/banners/friendsofpegakit-black-on-transparent.png)

# PegaKit <%= props.names.capitalcase.plural %>
[![npm version](https://badge.fury.io/js/pegakit-<%= props.name %>.svg)](https://badge.fury.io/js/pegakit)
[![Bower version](https://badge.fury.io/bo/pegakit-<%= props.name %>.svg)](https://badge.fury.io/bo/pegakit-<%= props.name %>)

<%= props.description %>
<%= props.names.capitalcase.plural %> is a *PegaKit Component*, please refer to the [PegaKit doc](http://pegakit.github.io/) for more informations about how works *PegaKit Components*

## Getting Started
### Download
You can easily install *PegaKit <%= props.names.capitalcase.plural %>* by using npm, Yarn or Bower

```bash
# With bower
$ bower install <%= props.packageName %>

# With npm
$ npm install <%= props.packageName %>

# With yarn
$ yarn add <%= props.packageName %>
```

You can also download a zip archive [right here](<%= props.url %>/archive/master.zip).

### Installation
#### *SCSS*
The main scss file to include to your main `.scss` file is located at the `./<%= folders.src %>/scss/<%= props.names.kebabcase.plural %>.scss`. As a *PegaKit Component*, it also requires two dependencies to compile the *scss* code. Here an *scss* installation snippet.

```
// PegaKit Dependencies
@import './path/to/dependencies/pegakit-core/src/pegakit';

// PegaKit Components <%= props.names.capitalcase.plural %>
@import './path/to/dependencies/<%= props.packageName %>/<%= folders.src %>/scss/<%= props.names.kebabcase.plural %>.scss';
```

<% if (props.javascript) { %>#### *JavaScript*
The javascript file is located at the `./<%= folders.dest %>/javascript/<%= props.names.kebabcase.plural %>.js`. The optimized and minified version is available at `<%= folders.dest %>/javascript/<%= props.names.kebabcase.plural %>.min.js`.<% } %>

<% if (props.twig) { %>#### *Twig files*
The twig file is located at the `./<%= folders.src %>/twig/<%= props.names.kebabcase.singular %>.html.twig`.<% } %>

## Usage
to be written

## License
MIT © [PegaKit](pegakit.github.io)
