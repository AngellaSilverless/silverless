class Footer extends React.Component {
	constructor() {
		super();
		this.state = {
			isLoaded:  false,
			footer: null,
			dataRoute: SilverlessSettings.URL.api + "footer-info"
		}
	}
	
	componentDidMount() {
		fetch(this.state.dataRoute)
			.then(resp => resp.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						footer: result 
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
	
	footerInfo() {
		if(this.state && this.state.footer) {
			let footer = this.state.footer;
			
			let socials = [];
			let socialItems = footer.social_links;
			
			for(let i = 0; i < socialItems.length; i++) {
				socials.push(
					<a href={socialItems[i].link}><i class={"fab fa-" + socialItems[i].social_network}></i></a>
				);
			}
			
			return (
				<div class="info">
					<div class="phone">{footer.phone}</div>
					<div class="email brand">{footer.email}</div>
					<div class="socials">{socials}</div>
					
					<a class="button mb5" target="_blank" href={footer.button_target}>{footer.button_label}</a>
					
					<div class="colophon">
						<span>{footer.footer_info}</span>
						<a href="/privacy-policy">Privacy policy</a>
						<a href="/terms-conditions">Terms & Conditions</a>
					</div>
				</div>
			);
		}
	}
	
	render() {
		return (
			<footer class="background-dark pt5 pb2">
				
				<div class="container cols-4-8">
					
					<div class="col">
						
						<a href={SilverlessSettings.URL.root} class="logo-wrapper">
							
							<SVG class="logo__silverless" src="/inc/img/logo__silverless.svg"/>
							
						</a>
						
					</div>
					
					<div class="col">{this.footerInfo()}</div>
					
				</div>
				
			</footer>
		);
	}
}