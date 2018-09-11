import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ducky from '../../Images/chirper.jpg';

//Component to construct a chirp as a bootstrap card
class Chirp extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Fragment>
                <div className="row text-left my-2">
                    <div className="card w-75" style={{margin: '0 auto'}}>
                        <div className="card-header">
                            <div className="media">
                                <img className="Avatar rounded-circle border border-dark mr-3"
                                    src={ducky}
                                    alt="ducky"
                                    style={{ height: `50px`, width: `50px` }}
                                />
                                <div className="media-body">
                                    <h5 className="d-inline font-weight-bold">{this.props.name}</h5>
                                    <h6 className="text-muted">Chirped:</h6>
                                </div>
                            </div>
                        </div>
                        <p className="card-text p-1 m-1">{this.props.text}</p>
                        <Link className="btn btn-primary mt-2" to={"/chirps/" + this.props.id}>See Details</Link>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Chirp;