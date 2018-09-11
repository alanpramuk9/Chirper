import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import me from '../../Images/alan.jpg';
class SingleChirp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            objects: []
        }
        this.deleteChirp = this.deleteChirp.bind(this);
    }

    componentDidMount() {
        let url = '/api/chirps/' + this.props.match.params.id;
        fetch(url, {
            method: 'GET',
            headers: new Headers({ 'Content-Type': 'application/json' })
        })
            .then(response => response.json())
            .then(object => this.setState({ objects: object[0] }))
    }

    deleteChirp(event) {
        let url = '/api/chirps/' + this.props.match.params.id;
        fetch(url, {
            method: 'DELETE',
            headers: new Headers({ 'Content-Type': 'application/json' })
        })
        .then(this.props.history.push('/'))
    }

    render() {
        return (
            <Fragment>
                <div className="container">
                    <div className="row text-left my-2">
                        <div className="card w-100">
                            <div className="card-header">
                                <div className="media">
                                    <img className="Avatar rounded-circle border border-dark mr-3"
                                        src={me}
                                        alt="me"
                                        style={{ height: `50px`, width: `50px` }}
                                    />
                                    <div className="media-body">
                                        <h5 className="d-inline font-weight-bold">Alan</h5>
                                        <h6 className="text-muted">Chirpped:</h6>
                                    </div>
                                </div>
                            </div>
                            <h4 className="card-text text-center  p-1 m-1">{this.state.objects.text}</h4>
                            <div>
                                <h6 className="card-subtitle p-1 m-1 text-muted font-weight-light">Location- {this.state.objects.location}</h6>
                                <h6 className="card-subtitle p-1 m-1 text-muted font-weight-light">UserID- {this.props.match.params.id}</h6>
                                <h6 className="card-subtitle p-1 m-1 text-muted font-weight-light">Created At- {this.state.objects._created}</h6>
                            </div>
                            <Link className="btn btn-primary my-1" to="/">Go Back to All Chirps</Link>
                            <Link className="btn btn-secondary my-1" to={"/chirps/edit/" + this.props.match.params.id}>Edit Chirp</Link>
                            <button onClick={this.deleteChirp} className="btn btn-danger my-1">Delete Chirp</button>
                        </div>
                    </div>
                </div>

            </Fragment>
        )
    }

}

export default SingleChirp;