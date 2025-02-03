import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { userContext } from "../../App";
import axios from "axios";
import { user } from "../../reducer/userReduce";
import { Box, Button, Modal, Typography, TextField } from "@mui/material";
import Update from "./update";

export default function Login() {
  const userState = useContext(userContext);
  const [open, setOpen] = useState(false);
  const [afterIn, setAfterIn] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleRegister = async (e: FormEvent, userData: Partial<user>) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/user/login', userData);
      userState.userDispatch({ type: 'CREATE', data: res.data });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          alert("Invalid password or email!!");
        } else {
          alert("An error occurred: " + e.message);
        }
      } else {
        console.error("Unexpected error:", e);
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData: Partial<user> = {
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || ''
    };
    handleRegister(event, userData);
    setOpen(false);
  };

  useEffect(() => {
    if (userState.user?.isConected) {
      setAfterIn(true);
    }
  }, [userState.user?.isConected]);

  return (
    <>
      <div>
        {!afterIn && (
          <Button
            style={{
              position: 'absolute',
              top: '5%',
              left: '50%',
              backgroundColor: '#77A672', // ירוק
              color: 'white',
              borderRadius: '25px',
              padding: '12px 25px',
              textTransform: 'none',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              '&:hover': { backgroundColor: '#5E8B5C' },
            }}
            onClick={handleOpen}
          >
            Login
          </Button>
        )}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              backgroundColor: 'white', 
              padding: '30px', 
              borderRadius: '8px', 
              boxShadow: 3,
              width: '90%', // Responsive width
              maxWidth: '400px' // Limit width for large screens
            }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ color: '#77A672', fontWeight: 600, marginBottom: '20px' }}
            >
              Enter your details:
            </Typography>

            <form onSubmit={handleSubmit} id="modal-modal-description">
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: '15px' }}
                inputRef={emailRef}
                required
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                sx={{ marginBottom: '20px' }}
                inputRef={passwordRef}
                required
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#FF7043', // אפרסק
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
        {afterIn && <Update />}
      </div>
    </>
  );
}
