import React from 'react';
import apiService from './movie.service';

class DashboardComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      movies: [],
    };
    this.searchMovie = this.searchMovie.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  searchMovie(e) {
    e.preventDefault();
    apiService.searchMovies(this.state.title).then(res => {
      console.log('--------------');
      this.setState({ movies: res.Search });
    }).catch(err => {
      this.setState({ movies: [] });
    });
  }

  onChange(e) {
    this.setState({ title: e.target.value });
  }

  onMovieSelect(movie) {
    console.log('movie', movie);
    this.props.history.push({
      pathname: `/movie/${movie.imdbID}`,
    });
  }

  render() {
    return (
      <div className="dashboardContainer">
        <div className="searchBar">
        <form className="searchBox" onSubmit={this.searchMovie}>
           <input
              type='text'
              value={this.state.title}
              name='title'
              onChange={this.onChange}
              className="searchInputBox"
            ></input>
          <input className="searchButton" type='submit' value='search'></input>
        </form>
        </div>
        <div className="grid-container">
          {this.state.movies && !!this.state.movies.length && this.state.movies.map(movie =>
            <div className="g-movie" key={movie.imdbID} onClick={() => { this.onMovieSelect(movie) }}>
            <img className="g-poster" src={movie.Poster}></img>
            <div className="movie-details">{movie.Title} ({movie.Year})s</div>
            </div>)}
            {this.state.movies && !!!this.state.movies.length && 
            <div className="no-data-avail">
             Pleasae apply search to load data or No data available
            </div>}
        </div>
      </div>
    )
  }
}

export default DashboardComponent;