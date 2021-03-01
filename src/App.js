import React, { useState, useEffect } from 'react'
// import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'reactstrap';
import Formdata from './component/Formdata';
import { Button } from 'reactstrap';
const App = () => {
  const [data, setdata] = useState([]);
  const [editableData, setEditableData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  //fetch data
  const accessdata = async () => {
    try {
      const url = await fetch('http://localhost:3001/data');
      setdata(await url.json());
    } catch (error) {
      console.log({ error })
    }
  }
   //delete data
  const deleteddata = async (id) => {
    try {
      console.log(id)
      await fetch(`http://localhost:3001/data/${id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.log({ error })
    }
    accessdata();
  }

  //create data
  const onFormdata = (name, phone, address) => {
    const url = fetch('http://localhost:3001/data', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        phone: phone,
        address: address,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    // accessdata();
    
  }

  //update data
  const updateddata = (id) => {
    toggle()
    const dataone = data.find(obj => obj.id === id);
    setEditableData(dataone);
 }
  //use effect
  useEffect(() => {
    accessdata();
  }, [])

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div>
      <Button color="danger" onClick={() => setIsOpen(true)}>Add</Button>
        <Formdata traveldata={onFormdata} onetravel={updateddata} editableData = {editableData} isOpen={isOpen} 
        toggle={toggle}/>
        <Table>
          <thead>
            <tr>
              <th>sr.no</th>
              <th>name</th>
              <th>phone</th>
              <th>address</th>
              <th>opration</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((current) => {
                const { id, name, phone, address } = current;
                return (
                  <>
                    <tr>
                      <td>{id}</td>
                      <td>{name}</td>
                      <td>{phone}</td>
                      <td>{address}</td>
                      <td> <Button color="danger" onClick={() => deleteddata(id)}>delete</Button> &nbsp;&nbsp; <Button color="success"  onClick={() => updateddata(id)} >update</Button>
                      </td>
                    </tr>
                  </>
                )
              })
            }
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default App
