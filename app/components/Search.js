// /components/Search.js
// Include React and React-Router dependencies
var React = require('react');
var Router = require('react-router');

// Include the Query and Results componens
var Query = require('./Search/Query');
var Results = require('./Search/Results');

// Include the Helper (for the query)
var helpers = require('../utils/helpers');

// Create the Main component
var Search = React.createClass({

	/*Here we set the initial state variables (this allows us to propagate the variables for maniuplation by the children components*/
	/*Also note the "resuls" state. This will be where we hold the data from our results*/
	getInitialState: function(){
		return {
			queryTerm: "",
			startYear: "",
			endYear: "",
			results: {}
		};
	},


	/*This function gets called if the user searches for a completely new set of parameters (i.e. if any of the search terms changes)*/
	/*If the user searches for the exact same thing, then React will ignore it.*/
	componentDidUpdate: function(prevProps, prevState){
		console.log('in Search.js')
		console.log("COMPONENT UPDATED");
		console.log('qTerm ',this.state.queryTerm);
		console.log('sYear ',this.state.startYear);
		console.log('eYear ',this.state.endYear);

		console.log("Previous State", prevState);
//added start
			// This bit may seem strange but is necessary to ensure that we aren't in an infinite loop
			// Without this code, react will update the component each time. This will then trigger the same componentDidUpdate forever...
			// Here we say: "If the new state is NOT the same as the old state... then run the query".

			if (this.state.queryTerm != "" && 
				(prevState.queryTerm != this.state.queryTerm || prevState.startYear != this.state.startYear || prevState.endYear != this.state.endYear)) {
				// Here we utilize our helper function (in utils) to run the query.
				// We pass in the parameters term, startYear, and endYear from our components state.
				helpers.runQuery(this.state.queryTerm, this.state.startYear, this.state.endYear).then(function (data) {
					if (data != this.state.results) {
						// We then take the results and change our state's results value to match.
						this.setState({
							results: data
						});
					}

// added end

				// console.log("RESULTS", results)
				// console.log("DATA", data)

				// This code is necessary to bind the keyword "this" when we say this.setState
				// to actually mean the component itself and not the runQuery function.
// added
					// It's tricky. But one of those things you'll find if you Stack Overflow around.
				}.bind(this));
			}

// added end
	},

	// This function will be passed down into children components so they can change the "parent"
	// i.e we will pass this method to the query component that way it can change the main component
	// to perform a new search
	setQuery: function(newQuery, newStart, newEnd){
		console.log("setQuery");
		console.log('newQuery ', newQuery);
		console.log('newStart ', newStart);
		console.log('newEnd ', newEnd);
		this.setState({
			queryTerm: newQuery,
			startYear: newStart,
			endYear: newEnd
		});
	},

	/*Render the function. Note how we deploy both the Query and the Results*/
	render: function(){
		console.log("Render Results", this.state.results)
		return(
			<div className="main-container">

				{/*Note how we pass the setQuery function to enable Query to perform searches*/}
				<Query updateSearch={this.setQuery} />

				{/*Note how we pass in the results into this component*/}
				<Results results={this.state.results}/>

			</div>

		)
	}
});

// Export the module back to the route
module.exports = Search;
