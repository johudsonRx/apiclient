import React, { Component } from 'react';
import "./App.css";
import stringify from "json-stable-stringify";
import {
    connect
} from "react-redux";

import {
    addToStore,
    sendData
} from "./actions/app";

import {
    Header,
    Footer
} from "./components";


class App extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }


    getValues = ({ target: { name, value } }) => this.props.dispatch(addToStore({ [name]: value }));

    sendData = (event) => {
        event.preventDefault();

        const url = "/apicatalog";
        const data = this.props.api;
        this.props.dispatch(sendData(url, data));

    }
    render() {

        console.log("State: ", this.props);


        return (
            <div className="app">
                <Header />

                <Content sendData={this.sendData} getValues={this.getValues} {...this.props} />

                <Footer />
            </div>
        );
    }
}



const Content = (props) => {
    return (
        <div className="content">
            <form className="ui grid form">

                <div className="five wide column">
                    <label htmlFor="url">Client Url <span>(Endpoint)</span></label>
                    <input type="text" name="url" onChange={props.getValues} />
                </div>
                <div className="five wide column">
                    <label htmlFor="operation">Operation Name <span>(Method)</span></label>
                    <input type="text" name="operation" onChange={props.getValues} />
                </div>

                <div className="five wide column">
                    <label htmlFor="authorization">Authorization</label>
                    <input type="text" name="authorization" onChange={props.getValues} />
                </div>

                <div>
                    <label htmlFor="header">Headers <span>(Ex. headerName1 = headervalue1, headerName2 = headerValue2)</span></label>
                    <input type="text" name="header" onChange={props.getValues} />
                </div>

                <button className="ui primary basic button column" onClick={props.sendData}>Test it</button>
            </form>

            <Request {...props} />
        </div>
    )
};




const Request = (props) => {
    let error;
    try {
        error = stringify(props.api.err , { space: "  " })
    } catch (error) {
        // TODO
    }
    const data = stringify(props.api.data, { space: "  " });
    console.log("Error: ", error);
    const {
        operation
    } = props.api;

    const statusClass = props.api.status ? "status" : "";
    const input = operation !== "GET" && operation.length >= 3 && operation.length !== 0 ? (
        <div className="eight wide column">

            <div>
                <label htmlFor="input">Input </label>
                <textarea name="input" ></textarea>
            </div>
            <div>
                <input type="file" name="file" />
            </div>

        </div>
    ) : "";

    const outputClass = operation !== "GET" && operation.length >= 3 && operation.length !== 0 ? "seven" : "fifteen"

    return (
        <div className="request">
            <form className="ui form grid" >
                {input}

                <div className={outputClass + " wide column output"} >
                    <label htmlFor="output">Output</label>
                    <textarea name="output" value={data === "" ? error : data} className={statusClass}></textarea>
                </div>

                <button className=" wide ui primary basic button column"> Save Request</button>
            </form>
        </div>

    );
};

const mapPropsToState = (state) => {
    return {
        api: state.api
    }
};

export default connect(mapPropsToState)(App);