"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_React$Component) {
	_inherits(Header, _React$Component);

	function Header() {
		_classCallCheck(this, Header);

		var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this));

		_this.state = {
			isLoaded: false,
			menuItems: null,
			dataRoute: SilverlessSettings.URL.api + "main-menu"
		};
		return _this;
	}

	_createClass(Header, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			fetch(this.state.dataRoute).then(function (resp) {
				return resp.json();
			}).then(function (result) {
				_this2.setState({
					isLoaded: true,
					menuItems: result
				});
			}, function (error) {
				_this2.setState({
					isLoaded: false,
					error: error
				});
			});
		}
	}, {
		key: "createMenu",
		value: function createMenu() {
			if (this.state && this.state.menuItems) {
				var menu = [];
				var menuItems = this.state.menuItems;

				for (var i = 0; i < menuItems.length; i++) {
					menu.push(React.createElement(
						"li",
						null,
						React.createElement(
							"a",
							{ href: menuItems[i].url },
							menuItems[i].title
						)
					));
				}

				return React.createElement(
					"ul",
					null,
					menu
				);
			}
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"header",
				null,
				React.createElement(
					"div",
					{ "class": "container cols-4-8" },
					React.createElement(
						"div",
						{ "class": "col" },
						React.createElement(
							"a",
							{ href: SilverlessSettings.URL.root, "class": "logo-wrapper" },
							React.createElement(SVG, { "class": "logo__silverless centered", src: "/inc/img/logo__silverless.svg" })
						)
					),
					React.createElement(
						"div",
						{ "class": "col" },
						this.createMenu()
					)
				)
			);
		}
	}]);

	return Header;
}(React.Component);

var Footer = function (_React$Component2) {
	_inherits(Footer, _React$Component2);

	function Footer() {
		_classCallCheck(this, Footer);

		var _this3 = _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this));

		_this3.state = {
			isLoaded: false,
			footer: null,
			dataRoute: SilverlessSettings.URL.api + "footer-info"
		};
		return _this3;
	}

	_createClass(Footer, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this4 = this;

			fetch(this.state.dataRoute).then(function (resp) {
				return resp.json();
			}).then(function (result) {
				_this4.setState({
					isLoaded: true,
					footer: result
				});
			}, function (error) {
				_this4.setState({
					isLoaded: false,
					error: error
				});
			});
		}
	}, {
		key: "footerInfo",
		value: function footerInfo() {
			if (this.state && this.state.footer) {
				var footer = this.state.footer;

				var socials = [];
				var socialItems = footer.social_links;

				for (var i = 0; i < socialItems.length; i++) {
					socials.push(React.createElement(
						"a",
						{ href: socialItems[i].link },
						React.createElement("i", { "class": "fab fa-" + socialItems[i].social_network })
					));
				}

				return React.createElement(
					"div",
					{ "class": "info" },
					React.createElement(
						"div",
						{ "class": "phone" },
						footer.phone
					),
					React.createElement(
						"div",
						{ "class": "email brand" },
						footer.email
					),
					React.createElement(
						"div",
						{ "class": "socials" },
						socials
					),
					React.createElement(
						"a",
						{ "class": "button mb5", target: "_blank", href: footer.button_target },
						footer.button_label
					),
					React.createElement(
						"div",
						{ "class": "colophon" },
						React.createElement(
							"span",
							null,
							footer.footer_info
						),
						React.createElement(
							"a",
							{ href: "/privacy-policy" },
							"Privacy policy"
						),
						React.createElement(
							"a",
							{ href: "/terms-conditions" },
							"Terms & Conditions"
						)
					)
				);
			}
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"footer",
				{ "class": "background-dark pt5 pb2" },
				React.createElement(
					"div",
					{ "class": "container cols-4-8" },
					React.createElement(
						"div",
						{ "class": "col" },
						React.createElement(
							"a",
							{ href: SilverlessSettings.URL.root, "class": "logo-wrapper" },
							React.createElement(SVG, { "class": "logo__silverless", src: "/inc/img/logo__silverless.svg" })
						)
					),
					React.createElement(
						"div",
						{ "class": "col" },
						this.footerInfo()
					)
				)
			);
		}
	}]);

	return Footer;
}(React.Component);

var SVG = function (_React$Component3) {
	_inherits(SVG, _React$Component3);

	function SVG(props) {
		_classCallCheck(this, SVG);

		var _this5 = _possibleConstructorReturn(this, (SVG.__proto__ || Object.getPrototypeOf(SVG)).call(this, props));

		_this5.state = {
			isLoaded: false,
			svg: null,
			dataRoute: SilverlessSettings.URL.local + _this5.props.src
		};
		return _this5;
	}

	_createClass(SVG, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this6 = this;

			fetch(this.state.dataRoute).then(function (resp) {
				return resp.text();
			}).then(function (result) {
				_this6.setState({
					isLoaded: true,
					svg: { __html: result }
				});
			}, function (error) {
				_this6.setState({
					isLoaded: false,
					error: error
				});
			});
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement("div", { "class": this.props.class, dangerouslySetInnerHTML: this.state.svg });
		}
	}]);

	return SVG;
}(React.Component);

var Home = function (_React$Component4) {
	_inherits(Home, _React$Component4);

	function Home() {
		_classCallCheck(this, Home);

		var _this7 = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this));

		_this7.state = {
			isLoaded: false,
			page: null,
			dataRoute: SilverlessSettings.URL.api + "home"
		};
		return _this7;
	}

	_createClass(Home, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this8 = this;

			fetch(this.state.dataRoute).then(function (resp) {
				return resp.json();
			}).then(function (result) {
				_this8.setState({
					isLoaded: true,
					page: result
				});
			}, function (error) {
				_this8.setState({
					isLoaded: false,
					error: error
				});
			});
		}
	}, {
		key: "render",
		value: function render() {
			var hero = void 0,
			    sectionLink = void 0,
			    featuredWork = void 0;

			if (this.state && this.state.page && this.state.page.acf) {
				hero = React.createElement(Hero, { hero: this.state.page.acf.hero });
				sectionLink = React.createElement(SectionLink, { section: this.state.page.acf.section_link });
				featuredWork = React.createElement(FeaturedWork, { projects: this.state.page.projects });
			}

			return React.createElement(
				"div",
				{ "class": "home" },
				hero,
				sectionLink,
				featuredWork
			);
		}
	}]);

	return Home;
}(React.Component);

var SectionLink = function SectionLink(props) {

	var buttons = [];
	if (props.section.buttons[0]) buttons.push(React.createElement(
		"a",
		{ "class": "button button__transparent", href: props.section.buttons[0].target },
		props.section.buttons[0].label
	));

	if (props.section.buttons[1]) buttons.push(React.createElement(
		"a",
		{ "class": "button ml2", href: props.section.buttons[1].target },
		props.section.buttons[1].label
	));

	return React.createElement(
		"div",
		{ "class": "section-link background-dark" },
		React.createElement(
			"div",
			{ "class": "container cols-4-8" },
			React.createElement("div", { "class": "col" }),
			React.createElement(
				"div",
				{ "class": "col" },
				React.createElement(
					"div",
					{ "class": "top-heading light-text pt2" },
					React.createElement(
						"span",
						null,
						props.section.top_heading,
						" "
					),
					React.createElement(
						"a",
						{ href: props.section.target_page },
						props.section.target_label
					)
				),
				React.createElement(
					"div",
					{ "class": "info container cols-6 pb5 pt5" },
					React.createElement(
						"div",
						{ "class": "col" },
						React.createElement("h2", { "class": "heading heading__light heading__lg brand mb1 pb1", dangerouslySetInnerHTML: { __html: props.section.heading } }),
						React.createElement("div", { "class": "copy light-text mb3", dangerouslySetInnerHTML: { __html: props.section.copy } }),
						React.createElement(
							"div",
							{ "class": "wrapper-buttons" },
							buttons
						)
					)
				)
			)
		)
	);
};

var FeaturedWork = function FeaturedWork(props) {
	var projects = [];
	for (var i = 0; i < props.projects.length; i++) {
		var project = props.projects[i];

		projects.push(React.createElement(
			"div",
			{ "class": "project-wrapper container cols-4-8 mb7" },
			React.createElement(
				"div",
				{ "class": "col pt3 pb2" },
				React.createElement(
					"h3",
					{ "class": "heading heading__light heading__md mb0" },
					project.acf.hero.heading
				),
				React.createElement(
					"div",
					{ "class": "sub-heading brand light-text pt1" },
					project.acf.hero.sub_heading
				),
				React.createElement(
					"div",
					{ "class": "type light-text" },
					project.taxonomies.type.map(function (type) {
						return React.createElement(
							"div",
							{ "class": "pb1", key: type.term_id },
							type.name
						);
					})
				),
				React.createElement(
					"a",
					{ "class": "button button__transparent mt3", href: project.permalink },
					"Find out more"
				)
			),
			React.createElement("div", { "class": "col img", style: { backgroundImage: "url(" + project.acf.hero.background_image + ")" } })
		));
	}

	return React.createElement(
		"div",
		{ "class": "featured-work background-primary" },
		React.createElement(
			"div",
			{ "class": "container cols-12" },
			React.createElement(
				"div",
				{ "class": "col" },
				React.createElement(
					"h2",
					{ "class": "heading-alt pt2 pb2" },
					"Featured Work"
				),
				projects
			)
		)
	);
};

var Page = function Page() {
	return React.createElement(
		"div",
		{ "class": "page" },
		React.createElement(
			"h1",
			null,
			"Page"
		)
	);
};
var Posts = function Posts() {
	return React.createElement(
		"div",
		{ "class": "posts" },
		React.createElement(
			"h1",
			null,
			"Posts"
		)
	);
};
var Post = function Post() {
	return React.createElement(
		"div",
		{ "class": "post" },
		React.createElement(
			"h1",
			null,
			"Post"
		)
	);
};
var NotFound = function NotFound() {
	return React.createElement(
		"div",
		{ "class": "not-found" },
		React.createElement(
			"h1",
			null,
			"NotFound"
		)
	);
};

var Hero = function (_React$Component5) {
	_inherits(Hero, _React$Component5);

	function Hero() {
		_classCallCheck(this, Hero);

		return _possibleConstructorReturn(this, (Hero.__proto__ || Object.getPrototypeOf(Hero)).apply(this, arguments));
	}

	_createClass(Hero, [{
		key: "render",
		value: function render() {
			var hero = this.props.hero;
			var style;

			if (hero.type == "image") style = {
				backgroundImage: "url(" + hero.background_image + ")"
			};

			if (hero.type == "colour") style = {
				backgroundColor: hero.colour
			};

			return React.createElement(
				"div",
				{ className: "hero " + hero.height, style: style },
				React.createElement(
					"div",
					{ "class": "container" },
					React.createElement("div", { "class": "col hero__content" })
				)
			);
		}
	}]);

	return Hero;
}(React.Component);
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

var _ReactRouterDOM = ReactRouterDOM,
    BrowserRouter = _ReactRouterDOM.BrowserRouter,
    Route = _ReactRouterDOM.Route,
    Switch = _ReactRouterDOM.Switch,
    Link = _ReactRouterDOM.Link;

var App = function (_React$Component6) {
	_inherits(App, _React$Component6);

	function App() {
		_classCallCheck(this, App);

		return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
	}

	_createClass(App, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ id: "container" },
				React.createElement(Header, null),
				React.createElement(
					"main",
					null,
					React.createElement(
						Switch,
						null,
						React.createElement(Route, { exact: true, path: SilverlessSettings.path, component: Home }),
						React.createElement(Route, { exact: true, path: SilverlessSettings.path + 'posts/', component: Posts }),
						React.createElement(Route, { exact: true, path: SilverlessSettings.path + 'posts/:slug', component: Post }),
						React.createElement(Route, { exact: true, path: SilverlessSettings.path + 'sample-page/', component: Page }),
						React.createElement(Route, { path: "*", component: NotFound })
					)
				),
				React.createElement(Footer, null)
			);
		}
	}]);

	return App;
}(React.Component);

ReactDOM.render(React.createElement(
	BrowserRouter,
	null,
	React.createElement(Route, { path: "/", component: App })
), document.getElementById('root'));