import React, { useContext, useState } from 'react'
import { Button, Modal } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const Logout = () => {
    const [openModal, setOpenModal] = useState("");
  const props = { openModal, setOpenModal };


//   use context 
const {logOut} = useContext(AuthContext);

  const hangleSignOut = () => {
    // console.log("sign out");
    logOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      })
  }
  return (
    <div className='h-screen flex items-center justify-center'>
        <Button onClick={() => props.setOpenModal('default')}>Click here to Logout</Button>
      <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Footer>
          <Link to="/" onClick={hangleSignOut}><Button onClick={() => props.setOpenModal(undefined)}>Yes, I want to sign out!</Button></Link>
          <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Logout