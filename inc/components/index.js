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
//@prepros-prepend ../../page-templates/page.js
//@prepros-prepend ../../page-templates/posts.js
//@prepros-prepend ../../page-templates/post.js
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
			<div id="container">
				<Header />
				<main>
					<Switch>
						<Route exact path={SilverlessSettings.path} component={Home} />
						<Route exact path={SilverlessSettings.path + 'posts/'} component={Posts} />
						<Route exact path={SilverlessSettings.path + 'posts/:slug'} component={Post} />
						<Route exact path={SilverlessSettings.path + 'sample-page/'} component={Page} />
						<Route path="*" component={NotFound} />
					</Switch>
				</main>
				<Footer />
			</div>
		);
	}
}

ReactDOM.render(
	<BrowserRouter>
		<Route path="/" component={App} />
	</BrowserRouter>, document.getElementById('root')
);