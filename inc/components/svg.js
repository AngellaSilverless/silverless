class SVG extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			isLoaded:  false,
			svg:       null,
			dataRoute: SilverlessSettings.URL.local + this.props.src
		}
	}
	
	componentDidMount() {
		fetch(this.state.dataRoute)
			.then(resp => resp.text())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						svg: {__html: result} 
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
		return (
			<div class={this.props.class} dangerouslySetInnerHTML={this.state.svg}></div>
		);
	}
}