class SingleWork extends React.Component {
	
	constructor() {
		super();
		let pageName = window.location.pathname.replace(/\//, "");
		
		this.state = {
			isLoaded:  false,
			page:     null,
			dataRoute: SilverlessSettings.URL.api + pageName
		}
	}
	
	componentDidMount() {
		fetch(this.state.dataRoute)
			.then(resp => resp.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						page: result 
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
	
	loadWork() {
		if(!this.state || !this.state.page)
			return;
			
			console.log(this.state.page);
			
		let page = this.state.page;
			
		return (
			<div>
				
				<div class="container cols-4-8 pt10">
					
					<div class="col"></div>
					
					<div class="col ">
						
						<div class="sub-heading pb1">{page.acf.hero.sub_heading}</div>
						
						<div class="brand brand__top pt1 pb3">
							
							<h1 class="heading heading__xl mt0">{page.acf.hero.heading}</h1>
							
						</div>
						
					</div>
					
				</div>
				
				<div class="background img" style={{backgroundImage: "url(" + page.acf.hero.background_image + ")"}}></div>
				
				<div class="container cols-4-8 pt5 pb5">
					
					<div class="col">
						
						<div class="type light-text">
							{page.taxonomies.type.map((type) =>
								
								<div class="brand-plus pb1" key={type.term_id}>{type.name}</div>
								
							)}
						</div>
						
					</div>
					
					<div class="col">
						
						<div class="info-heading"><p>{page.acf.info.copy_heading}</p></div>
						<div class="info-heading light-text"><p>{page.acf.info.copy}</p></div>
						
					</div>
					
				</div>
			
			</div>
		)
	}
	
	render() {
		return (
			<div id="container">
			
				<Header dark={true}/>
				
				<main class="single-work">{this.loadWork()}</main>
			
				<Footer heading={true}/>
		
			</div>
		);
	}
	
}