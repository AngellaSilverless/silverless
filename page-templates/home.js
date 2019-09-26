class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			isLoaded:  false,
			page:      null,
			dataRoute: SilverlessSettings.URL.api + "home"
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
	
	render() {
		let hero, sectionLink, featuredWork;
		
		if(this.state && this.state.page && this.state.page.acf) {
			hero = <Hero hero={this.state.page.acf.hero}/>;
			sectionLink = <SectionLink section={this.state.page.acf.section_link}/>;
			featuredWork = <FeaturedWork projects={this.state.page.projects}/>
		}
		
		return (
			<div class="home">
				{hero}
				{sectionLink}
				{featuredWork}
			</div>
		);
	}
}

const SectionLink = (props) => {
	
	let buttons = [];
	if(props.section.buttons[0])
		buttons.push(<a class="button button__transparent" href={props.section.buttons[0].target}>{props.section.buttons[0].label}</a>);
	
	if(props.section.buttons[1])
		buttons.push(<a class="button ml2" href={props.section.buttons[1].target}>{props.section.buttons[1].label}</a>);
	
	return(
		<div class="section-link background-dark">

			<div class="container cols-4-8">
				
				<div class="col"></div>
				
				<div class="col">
					
					<div class="top-heading light-text pt2">
						
						<span>{props.section.top_heading} </span>
						
						<a href={props.section.target_page}>{props.section.target_label}</a>
						
					</div>
					
					<div class="info container cols-6 pb5 pt5">
						
						<div class="col">
							
							<h2 class="heading heading__light heading__lg brand mb1 pb1" dangerouslySetInnerHTML={{__html: props.section.heading}}></h2>
							
							<div class="copy light-text mb3" dangerouslySetInnerHTML={{__html: props.section.copy}}></div>
							
							<div class="wrapper-buttons">{buttons}</div>
							
						</div>
						
					</div>
					
				</div>
				
			</div>
			
		</div>
	);
};

const FeaturedWork = (props) => {
	let projects = [];
	for(let i = 0; i < props.projects.length; i++) {
		let project = props.projects[i];
		
		projects.push(
			<div class="project-wrapper container cols-4-8 mb7">
				
				<div class="col pt3 pb2">
				
					<h3 class="heading heading__light heading__md mb0">{project.acf.hero.heading}</h3>
					
					<div class="sub-heading brand light-text pt1">{project.acf.hero.sub_heading}</div>
					
					<div class="type light-text">
						
						{project.taxonomies.type.map((type) =>
							
							<div class="pb1" key={type.term_id}>{type.name}</div>
							
						)}
					</div>
					
					<a class="button button__transparent mt3" href={project.permalink}>Find out more</a>
				
				</div>
				
				<div class="col img" style={{backgroundImage: "url(" + project.acf.hero.background_image + ")"}}></div>
					
			</div>
		);
	}
	
	return(
		<div class="featured-work background-primary">
			
			<div class="container cols-12">
			
				<div class="col">
				
					<h2 class="heading-alt pt2 pb2">Featured Work</h2>
					{projects}
				
				</div>
			
			</div>
			
		</div>
	);
}
