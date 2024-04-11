import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ReorderingPage() {
  const [itemId, setItem_ID] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [itemType, setItemType] = useState("")
  const [itemPrice,setPrice] = useState([]);

  useEffect(() => {
    const fetchitemId = async () => {
    try{
      const response = await axios.get("/StudioInventory/display");
      set(response.data.map( => itemId.Item_ID));
    }catch(error){
      console.error("Error fetching data")
    }
  };
  fetchEmployeeID(); 
  },[]);

  function sendData(e) {
    e.preventDefault();

    const  = {
      
    }

    console.log()

    axios.post("/Attendancecount/add",)
      .then(() => {
        alert("Item added")
      })
      .catch((err) => {
        alert(err)
      })
  }

  return (
    <div className="container">
      <h3>Re-ordering inventory Stocks</h3>
      <form onSubmit={sendData}>

        <div className="mb-3">
          <label htmlFor="name">Item ID</label>
          <select className="form-control" id ="empId" value={empId} onChange={(e) => setemp_ID(e.target.value)}>
            <option value =" ">item id</option>
            {employeeID.map(id => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="name">quantity</label>
          <input type="text" className="form-control" id="job" placeholder="Quantity" onChange={(e) => {
            setjobrole(e.target.value);
          }} />
        </div>


        <div className="mb-3">
          <label htmlFor="name">date</label>
          <input type="text" className="form-control" id="job" value={date} placeholder="Date" onChange={(e) => {
            setattendance(e.target.value);
          }} />
        </div>

        <div className="mb-3">
          <label htmlFor="name">itemType</label>
          <input type="text" className="form-control" placeholder="Item Type" id="job"readOnly />
        </div>

        <div className="mb-3">
          <label htmlFor="name">itemPrice</label>
          <input type="text" className="form-control" placeholder="Item price" id="job" readOnly />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
