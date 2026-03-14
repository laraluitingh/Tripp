import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function Comment(props) {
    const comment = props.obj
  return (
    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
      <ListItemAvatar>
        <Avatar
          alt={comment.userId.name}
          src="/static/images/avatar/1.jpg"
          sx={{ width: 34, height: 34 }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="body2" fontWeight={600}>
            {comment.userId.name}
          </Typography>
        }
        secondary={
          <Typography variant="body2" color="text.primary" sx={{ mt: 0.3 }}>
            {comment.body}
          </Typography>
        }
        sx={{
          bgcolor: 'grey.100',
          borderRadius: 2,
          px: 1.5,
          py: 0.8,
          m: 0
        }}
      />
    </ListItem>
  );
}