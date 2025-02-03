import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormEvent, useContext, useRef, useState } from 'react';

import { userContext } from '../../App';
import { user } from '../../reducer/userReduce';
import axios from 'axios';
import { TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 500,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 3,
  p: 4,
};

export default function Update() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const userState = useContext(userContext);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:3000/api/user/', userState);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = {
      first_name: firstNameRef.current?.value || undefined,
      last_name: lastNameRef.current?.value || undefined,
      email: emailRef.current?.value || undefined,
      password: passwordRef.current?.value || undefined,
      address: addressRef.current?.value || undefined,
      phone: phoneRef.current?.value || undefined,
    };

    userState.userDispatch({ type: 'UPDATE', data: userData as Partial<user> });
    handleUpdate(event);
    setOpen(false);
  };

  return (
    <div>
      <Button
        style={{
          position: 'absolute',
          top: '5%',
          left: '5%',
          backgroundColor: '#77A672', // Green color
          color: 'white',
          borderRadius: '25px',
          padding: '12px 25px',
          textTransform: 'none',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          '&:hover': { backgroundColor: '#5E8B5C' },
        }}
        onClick={handleOpen}
      >
        Update
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: '#77A672', fontWeight: 600, marginBottom: '20px' }}
          >
            Enter your new details:
          </Typography>

          <form onSubmit={handleSubmit} id="modal-modal-description">
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: '15px' }}
              inputRef={firstNameRef}
              
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: '15px' }}
              inputRef={lastNameRef}
              
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: '15px' }}
              inputRef={emailRef}
              
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              sx={{ marginBottom: '15px' }}
              inputRef={passwordRef}
              
            />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: '15px' }}
              inputRef={addressRef}
            />
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              type="tel"
              sx={{ marginBottom: '15px' }}
              inputRef={phoneRef}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#FF7043', // Peach color
                color: 'white',
                width: '100%',
                padding: '12px',
                borderRadius: '5px',
                '&:hover': { backgroundColor: '#FF5722' },
                fontWeight: 600,
              }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
