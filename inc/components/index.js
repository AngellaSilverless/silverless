/***************************************************/
/*                 BASIC STRUCTURE                 */
/***************************************************/

//@prepros-prepend header.js
//@prepros-prepend footer.js
//@prepros-prepend svg.js

/***************************************************/
/*                  PAGE TEMPLATES                 */
/***************************************************/

//@prepros-prepend ../../page-templates/home.js
//@prepros-prepend ../../page-templates/work.js
//@prepros-prepend ../../page-templates/single-work.js
//@prepros-prepend ../../page-templates/not-found.js

/***************************************************/
/*                  TEMPLATE PARTS                 */
/***************************************************/

//@prepros-prepend ../../template-parts/hero.js

/***************************************************/
/*                      ROUTES                     */
/***************************************************/

var { BrowserRouter, Route, Switch, Link } = ReactRouterDOM

class App extends React.Component {
	
	render() {
		return (
			<Switch>
				<Route exact path={SilverlessSettings.path} component={Home} />
				<Route exact path={SilverlessSettings.path + 'work/'} component={Work} />
				<Route exact path={SilverlessSettings.path + 'work/:slug'} component={SingleWork} />
				<Route path="*" component={NotFound} />
			</Switch>
		);
	}
}

ReactDOM.render(
	<BrowserRouter>
		<Route path="/" component={App} />
	</BrowserRouter>, document.getElementById('root')
);