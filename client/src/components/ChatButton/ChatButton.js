import React from 'react';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';

const ChatButton = ({ unreadCount }) => {
  return (
    <IconButton aria-label="chat">
      <Badge badgeContent={unreadCount} color="primary" variant='dot'>
        <ChatIcon />
      </Badge>
    </IconButton>
  );
};

export default ChatButton;
