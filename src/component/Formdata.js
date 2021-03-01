import React,{useEffect}  from 'react'
import { Button, Modal, ModalHeader, ModalBody,FormText, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

import { useState } from 'react';

const Formdata = (props) => {
    // const {
    //     buttonLabel,
    //     className
    //   } = props;
      const [modal, setModal] = useState(false);
      const [backdrop, setBackdrop] = useState(true);
      const [keyboard, setKeyboard] = useState(true);

      const [name, setname] = useState(props.editableData ? props.editableData.name:"" )
      const [phone, setphone] = useState(props.editableData ? props.editableData.phone : "")
      const [address, setaddress] = useState(props.editableData ? props.editableData.address : "")
      const [allentry, setallentry] = useState([])


      const submited=(e)=>{
        e.preventDefault();
        const newdata={name,phone,address}
        setallentry([...allentry,newdata])
        console.log(newdata)
        // props.traveldata(newdata);
        setname("");
        setphone("");
        setaddress("");
        props.traveldata(name,phone,address);
        props.toggle()
      
    }
    
     
    
      const changeBackdrop = e => {
        let value = e.target.value;
        if (value !== 'static') {
          value = JSON.parse(value);
        }
        setBackdrop(value);
      }
    
      const changeKeyboard = e => {
        setKeyboard(e.currentTarget.checked);
      }
      if(props.editableData){
        // setallentry([...allentry,{name:props.editableData.name}])

        // setallentry([...allentry,{name:props.editableData.name}])
          console.log(props.editableData.phone)
      }

    //  if(props.onetravel){
    //     // setname({name:props.name});
    //     setallentry([...allentry,{name:props.name}])
    //     // setphone([...allentry,{phone:props.phone}]);
    //     // setaddress([...allentry,{address:props.address}]);

 
    //      console.log("no",props.editableData)
    //  }
      
       
    
      
    return (
       <>
            <div>
      
      <Modal isOpen={props.isOpen} toggle={props.toggle} backdrop={backdrop} keyboard={keyboard}>
        <ModalHeader toggle={props.toggle}>Modal title</ModalHeader>
        <ModalBody>
        <Form  onSubmit={submited} >
      <FormGroup>
        <Label for="exampleEmail">Name</Label>
        <Input type="text" name="name" id="name" value={name} onChange={(e)=>setname(e.target.value)} required />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Phone</Label>
        <Input type="text" name="phone" id="phone" value={phone} onChange={(e)=>setphone(e.target.value)} required />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Address</Label>
        <Input type="text" name="address" id="address"  value={address} onChange={(e)=>setaddress(e.target.value)}  required/>
      </FormGroup>
      <Button >Submit</Button>
      <Button color="danger ml-3" onClick={props.toggle} >Cancel</Button>
    </Form>
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
        </ModalFooter> */}
      </Modal>
      

      
    </div>

       </>
    )
}

export default Formdata
