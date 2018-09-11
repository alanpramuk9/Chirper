import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class EditChirp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            objects: []
        }
        this.editThisChirp = this.editThisChirp.bind(this);
    }

    componentDidMount() {
        let url = '/api/chirps/' + this.props.match.params.id;
        fetch(url, {
            method: 'GET',
            headers: new Headers({ 'Content-Type': 'application/json' })
        })
            .then(response => response.json())
            .then(object => this.setState({ objects: object }))
    }

    editThisChirp(event) {
        event.preventDefault();
        // let url = '/api/chirps/' + this.props.match.params.id + '/edit';
        let url = '/api/chirps/' + this.props.match.params.id;
        let backUrl = '/chirps/' + this.props.match.params.id;
        let obj = { text: this._inputElement.value };
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(obj),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(this.props.history.push(backUrl))
    }

    render() {
        return (
            <Fragment>
                <div className="container border rounded mt-2 text-center" style={{ backgroundColor: `#FFFFFF` }}>
                    <div className="row">
                        <div className="col">
                            <form>
                                <div className="form-group p-1 m-1">
                                <label htmlFor="chirp-text">Edit Chirp:</label>
                                    <input type="text" className="form-control p-1 m-1 bg-light" placeholder={this.state.objects.text} ref={(a) => this._inputElement = a} />
                                    <button onClick={this.editThisChirp} className="btn btn-primary w-100 p-1 m-1">Submit Edit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default EditChirp;