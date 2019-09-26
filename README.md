# Wordpress and React Integration

## Basic structure

- inc/scss (Style files that will be compiled into style.css)
- inc/js (Basic website structure - header, footer, index)
- page-templates (Template files for pages)
	
## Instructions for inserting a new page template

#### 1. Create a JavaScript file inside the page-template folder

```js
const ComponentName = () => (
	<div class="component-class">
		<h1>Component Name</h1>
	</div>
);
```

#### 2. Prepend the new file in the 'Page Structure' section in inc/js/index.js

```js
//@prepros-prepend ../../page-templates/page-name.js
```

#### 3. Create the route for the new page in the 'Routes' section in inc/js/index.js

```html
<Route exact path={SilverlessSettings.path + 'page-slug/'} component={component-name} />
```