import React, { Component } from 'react';
import { render } from 'react-dom';

class AddChirp extends Component {

    constructor(props) {
        super(props);
        this.addChirps = this.addChirps.bind(this);
    }

    addChirps(event) {
        event.preventDefault();
        let obj = { text: this._inputElement.value };
        fetch(`/api/chirps`, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((result) => {
            location.reload();
        })

    }

    render() {
        return (
            <React.Fragment>
                <div className="container border rounded mt-2 mb-4 text-center" style={{ backgroundColor: `#FFFFFF` }}>
                    <div className="row">
                        <div className="col">
                            <form>
                                <div className="form-group p-1 m-1">
                                    <label htmlFor="chirp-text" style={{fontSize: '2em', color: 'red'}}>What's goin on?</label>
                                    <input type="text" className="form-control p-1 m-1 bg-light" id="chirp-text" ref={(a) => this._inputElement = a} placeholder="Type your Chirp here!" />
                                    <button onClick={this.addChirps} className="btn btn-danger w-100 p-1 m-1">Chirp it!</button>  
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default AddChirp;