class Header extends React.Component {
	constructor() {
		super();
		this.state = {
			isLoaded:  false,
			menuItems: null,
			dataRoute: SilverlessSettings.URL.api + "main-menu"
		}
	}
	
	componentDidMount() {
		fetch(this.state.dataRoute)
			.then(resp => resp.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						menuItems: result 
					});
				},
				(error) => {
					this.setState({
						isLoaded: false,
						error
					});
				}
			)
	}
	
	createMenu() {
		if(this.state && this.state.menuItems) {
			let menu = [];
			let menuItems = this.state.menuItems;
			
			for(let i = 0; i < menuItems.length; i++) {
				menu.push(
					<li>
						<a href={menuItems[i].url}>{menuItems[i].title}</a>
					</li>
				);
			}
			
			return (<ul>{menu}</ul>);
		}
	}
	
	render() {
		return (
			<header>
				
				<div class="container cols-4-8">
					
					<div class="col">
						
						<a href={SilverlessSettings.URL.root} class="logo-wrapper">
							
							<SVG class="logo__silverless centered" src="/inc/img/logo__silverless.svg"/>
							
						</a>
						
					</div>
					
					<div class="col">{this.createMenu()}</div>
				</div>
				
			</header>
		);
	}
}