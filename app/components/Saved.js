// /components/Saved.js
// Include React and React-Router dependencies
var React = require('react');
var Router = require('react-router')

// Include the Helper (for the saved recall)
var helpers = require('../utils/helpers');

// Create the Main component
var Main = React.createClass({

	getInitialState: function(){
		return {
			// Code
			savedArticles: ""
		};
	},

	componentDidMount: function(){
		// Code
			// Here we utilize the getSaved function to ping our API and grab all the saved articles from MongoDB
			helpers.getSaved().then(function (articleData) {
				this.setState({
					savedArticles: articleData.data
				});
				console.log("saved results", articleData.data);
			}.bind(this)); // Again notice the bind(this).

	},

	// /*This code handles the sending of the search terms to the parent Search component*/
	handleClick: function(item, event){
		console.log("CLICKED");
		console.log(item);
		// Delete the list!
			// Get the revised list!
			// Here we use the helpers deleteSaved function.
			// We pass in the title, date, and URL as part of the delete method.
			helpers.deleteSaved(item.title, item.date, item.url).then(function (data) {

				// Once we've deleted the record, we re-run the getSaved function to retrieve the revised list.
				helpers.getSaved().then(function (articleData) {
					this.setState({
						savedArticles: articleData.data
					});
					console.log("saved results", articleData.data);
				}.bind(this));
			}.bind(this)); // Notice how we need two bind(this). Each one is related to its own helper function.
	},

	render: function(){

		if (this.state.savedArticles == "") {
			return(
				<li className="list-group-item">
					<h3>
					  	<span><em>Save your first article...</em></span>
					</h3>
			  	</li>
			)
		}

		else {

			// Show saved articles
				var

				// "Map" each article in our list. This means that we associate each article with an entire HTML div.
				// This map function is powerful in that we can dynamically generate HTML for each element.
				articles = this.state.savedArticles.map(function (article, index) {

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
										article.title
									)
								),
								React.createElement(
									'span',
									{ className: 'btn-group pull-right' },
									React.createElement(
										'a',
										{ href: article.url, target: '_blank' },
										React.createElement(
											'button',
											{ className: 'btn btn-default ' },
											'View Article'
										)
									),
									React.createElement(
										'button',
										{ className: 'btn btn-primary', onClick: this.handleClick.bind(this, article) },
										'Delete'
									)
								)
							),
							React.createElement(
								'p',
								null,
								'Date Published: ',
								article.date
							)
						)
					);
				}.bind(this));
			}

			// This is where each of the above list items will finally get rendered when the map is complete

		return(
			<div className="main-container">
				<div className="row">
					<div className="col-lg-12">

						<div className="panel panel-primary">
							<div className="panel-heading">
								<h1 className="panel-title"><strong><i className="fa fa-download" aria-hidden="true"></i> Saved Articles</strong></h1>
							</div>
							<div className="panel-body">
								<ul className="list-group">
								   {/* this is a comment, display articles
										 {articles}
										 */}
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
module.exports = Main;
