import React, { Component } from 'react';

export class AddNewItem extends Component {
    constructor(props) {
        super(props);
        this.state = { newItemText: "" }
    }

    updateNewTextValue = (event) => {
        this.setState({ newItemText: event.target.value });
    }

    addNewItem = () => {
        this.props.callback(this.state.newItemText);
        this.setState({ newItemText: "" });
    }

    render = () =>
        <div className="row addNew">
            <div className="col-md-6 offset-md-2">
                <input className="form-control" value={this.state.newItemText} onChange={this.updateNewTextValue} />
            </div>
            <div className="col-md-4">
                <button className="btn btn-success" onClick={this.addNewItem}>
                    Add New Item
        </button>
            </div>
        </div>
}