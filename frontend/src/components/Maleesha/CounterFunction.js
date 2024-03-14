//FunctionBase Approch
/*since functionbase doesnt have constructor to define state, In this method we use ReactHooks, import Hooks  { useState }
and also this method we dont have to bind the function that we create */

import React, { useState } from "react";

function CounterFunction() {

    let [number, UpdateNumber] = useState(0)   //[state variableName,UpdateMethod] = useState(defaultValue)

    function Increment() {
        UpdateNumber(++number)
    }

    return (
        <div>
            <h3>FunctionBase Component</h3>
            <h1>Counter = {number}</h1>
            <button onClick={e => Increment()}>Increment</button>
        </div>
    )
}

export default CounterFunction;