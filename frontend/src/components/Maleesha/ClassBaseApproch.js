//ClassBase Approch
import React from "react";

class CounterClass extends React.Component {
    constructor() {
        super();
        this.incrementFunction = this.incrementFunction.bind(this)  //after creating a function it should bind with class
        this.state = {
            number: 0
        }
    }

    incrementFunction() {
        this.setState({
            number: this.state.number + 1
        })
    }

    render() {
        return (
            <div>
                <h3>ClassBase Component</h3>
                <h1>Counter = {this.state.number}</h1>
                <button onClick={this.incrementFunction}>Increment</button>
            </div>
        )
    }
}

export default CounterClass;