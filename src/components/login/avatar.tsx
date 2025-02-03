import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useContext } from 'react';
import { userContext } from '../../App';

export default function LetterAvatars() {
  const userState = useContext(userContext);

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar 
        sx={{ 
          bgcolor: "#4CAF50", // ירוק
          color: 'white',
          fontWeight: 'bold',
          boxShadow: 2,
          textTransform: 'uppercase',
          padding: 1,
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: "#FF7043", // אפרסק
          },
        }}
      >
        {userState?.user?.first_name?.charAt(0).toUpperCase()}
      </Avatar>
    </Stack>
  );
}
