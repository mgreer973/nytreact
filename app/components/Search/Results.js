// /components/Search/Results.js
// Include React and React-Router dependencies
var React = require('react');
var Router = require('react-router');

// Include the Helper (for the query)
var helpers = require('../../utils/helpers');

// Query Component Declaration
var Results = React.createClass({
	// Here we will save states for the contents we save
	getInitialState: function(){
		return {
				title: "",
				url: "",
				pubdate: ""
		};
	},

	// /*This code handles the sending of the search terms to the parent Search component*/
	handleClick: function(item, event){
		console.log("Result.js CLICKED");
		console.log('Result.js item ', item);

			helpers.postSaved(item.headline.main, item.pub_date, item.web_url).then(function (data) {
				console.log('web item ', item.web_url);
			}.bind(this));
	},

	// Here we render the function
	render: function(){
		// We check if the target has a "docs" value (to confirm that we aren't just running the initial data)
		if (!this.props.results.hasOwnProperty('docs')){
			return(
				<li className="list-group-item">
					<h3>
					  	<span><em>Enter search terms to begin...</em></span>
					</h3>
		  	</li>
			)
		}
		// If data is provided
		else {
				var
				// We loop through the results and create divs for each.
				articles = this.props.results.docs.map(function (article, index) {
					return React.createElement(
						'div',
						{ key: index },
						React.createElement(
							'li',
							{ className: 'list-group-item' },
							React.createElement(
								'h3',
								null,
								React.createElement(
									'span',
									null,
									React.createElement(
										'em',
										null,
										article.headline.main
									)
								),
								React.createElement(
									'span',
									{ className: 'btn-group pull-right' },
									React.createElement(
										'a',
										{ href: article.web_url, target: '_blank' },
										React.createElement(
											'button',
											{ className: 'btn btn-default ' },
											'View Article'
										)
									),
									React.createElement(
										'button',
										{className: 'btn btn-primary', onClick: this.handleClick.bind(this, article), 'data-toggle': 'modal', 'data-target': '#myModal'},
										'Save'
									)
								)
							),
							React.createElement(
								'p',
								null,
								'Date Published: ',
								article.pub_date
							)
						)
					);
				}.bind(this));
		}

		return(
			<div className ="main-container">
				<div className="row">
					<div className="col-lg-12">
						<div className="panel panel-primary">
							<div className="panel-heading">
								<h1 className="panel-title"><strong>
									<i className="fa fa-list-alt"></i>  
										Results</strong>
								</h1>
							</div>
							<div className="panel-body">
								<ul className="list-group">
									{articles}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

// Export the module back to the route
module.exports = Results;
