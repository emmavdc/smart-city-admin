import React from "react";

class OptionsBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            supplierLastame:"",
            customerLastame:"",
            startDate:"",
            type:"",
            callback: props.callback,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleChange(event) {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    handleSearch(event) {
        this.state.callback({
          supplierLastame: this.state.supplierLastame,
          customerLastame: this.state.customerLastame,
          startDate: this.state.startDate,
          type: this.state.type,
        });
    }

    render(){
        return(
            <div className="btn-toolbar justify-content-between" role="toolbar">
                <div className="input-group" role="group">
                    <input 
                    placeholder="Nom Offreur"
                    type="text"
                    name="supplierLastame"
                    onChange={this.handleChange}>
                    </input>
                    <input 
                    placeholder="Nom Demandeur"
                    type="text"
                    name="customerLastame"
                    onChange={this.handleChange}>
                    </input>
                    <input 
                    placeholder="Date de début"
                    type="text"
                    name="startDate"
                    onChange={this.handleChange}>
                    </input>
                    <input 
                    placeholder="Type"
                    type="text"
                    name="type"
                    onChange={this.handleChange}>
                    </input>
                    <input 
                    type="button"
                    onClick={this.handleSearch}
                    className="btn btn-primary"
                    value="Chercher">
                    </input>
                </div>
            </div>
        );
    }

}
export default OptionsBar;