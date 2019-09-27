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
	
	componentDidUpdate() {
		let works = document.getElementById("works");
		if(works) {
			var mixer = mixitup(works);
		}
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
					
					<div class="filter mb5">
						<div class="title brand-plus">Filter by sector</div>
						
						<div class="taxonomy sector">
							{page.taxonomies.sector.map((sector) =>
								
								<div data-filter={"." + sector.slug} class="item" key={sector.term_id} dangerouslySetInnerHTML={{__html: sector.name}}></div>
								
							)}
						</div>
					</div>
					
					
					<div class="filter mb5">
						<div class="title brand-plus">Filter by type</div>
						
						<div class="taxonomy type">
							{page.taxonomies.type.map((type) =>
								
								<div data-filter={"." + type.slug} class="item" key={type.term_id} dangerouslySetInnerHTML={{__html: type.name}}></div>
								
							)}
						</div>
					</div>
					
				</div>
				
				<div class="col container cols-6 works pb7" id="works">
					{page.works.map((work) =>

						<a href={work.permalink} key={work.ID} class={ "mix col pb2"
							
							+ work.taxonomies.type.map(function(elem){
								return " " + elem.slug;
							}).join("")
							
							+ work.taxonomies.sector.map(function(elem){
								return " " + elem.slug;
							}).join("")
						}>
							
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