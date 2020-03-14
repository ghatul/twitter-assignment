import React from 'react';
import apiSevice from './movie.service';

class MovieComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {}
        }
    }

    componentDidMount() {
      

        const params = this.props.match && this.props.match.params;
        apiSevice.getMovie(params.id).then(res => {
            this.setState({ movie: res });
        }).catch(err => {
            console.log(err);
        })

        //This loop is used to emulate the consecutive user searches. 

    }

    render() {
        const { movie } = this.state;
        return (
          <div>
              <img className="m-poster" src={movie.Poster}></img>
              <div>{movie.Actors}</div>
              <div>{movie.Awards}</div>
              <div>{movie.BoxOffice}</div>
              <div>{movie.Country}</div>
              <div>{movie.DVD}</div>
              <div>{movie.Director}</div>
              <div>{movie.Genre}</div>
              <div>{movie.Language}</div>
              <div>{movie.Metascore}</div>
              <div>{movie.Plot}</div>
              <div>{movie.Production}</div>
              <div>{movie.Rated}</div>
              <div>{movie.Released}</div>
              <div>{movie.Response}</div>
              <div>{movie.Runtime}</div>
              <div>{movie.Type}</div>
              <div>{movie.Website}</div>
              <div>{movie.Writer}</div>
              <div>{movie.Year}</div>
              <div>{movie.imdbRating}</div>
              <div>{movie.imdbVotes}</div>
          </div>
        )
    }
}

export default MovieComponent;