class Hero extends React.Component {
	
	render() {
		var hero = this.props.hero;
		var style;
		
		if(hero.type == "image")
			style = {
				backgroundImage: "url(" + hero.background_image + ")"
			}
			
		if(hero.type == "colour")
			style = {
				backgroundColor: hero.colour
			}
		
		return (
			<div className={"hero " +  hero.height} style={style}>
				
				<div class="container">
					
					<div class="col hero__content">
						
						{/*<h1 class="heading">{hero.heading}</h1>*/}
						
					</div>
					
				</div>
				
			</div>
		);
	}
}