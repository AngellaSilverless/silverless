class Work extends React.Component {
	
	constructor() {
		super();
		this.state = {
			isLoaded:  false,
			page:     null,
			dataRoute: SilverlessSettings.URL.api + "work"
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
	
	loadWorks() {
		if(!this.state || !this.state.page)
			return;
			
		let page = this.state.page;
			
		return (
			<div class="container cols-4-8 pt10">
				<div class="col"></div>
				
				<div class="col brand brand__top pt1 pb3">
					<h1 class="heading heading__xl mt0">{page.acf.hero.heading}</h1>
				</div>
				
				<div class="col sidebar">
					SIDEBAR
				</div>
				
				<div class="col container cols-6 works pb7">
					{page.works.map((work) =>

						<a href={work.permalink} class="col pb2" key={work.ID}>
							
							<div class="img" style={{backgroundImage: "url(" + work.acf.hero.background_image + ")"}}></div>
							
							<div class="brand brand__top">
								
								<h2 class="heading heading__light heading__sm mb0 mt0">{work.acf.hero.heading}</h2>
								
								<div class="text light-text">{work.acf.hero.sub_heading}</div>
								
							</div>
							
						</a>
					)}
				</div>
				
			</div>
		)
	}
	
	render() {
		return (
			<div id="container">
			
				<Header dark={true}/>
				
				<main class="work">{this.loadWorks()}</main>
			
				<Footer heading={true}/>
		
			</div>
		);
	}
	
}