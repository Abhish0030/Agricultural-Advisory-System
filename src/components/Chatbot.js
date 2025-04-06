// components/Chatbot.js
import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, Paper, Typography, Avatar } from '@mui/material';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your agricultural assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await axios.post('/api/chatbot/', { message: input });
      const botMessage = { text: response.data.response, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error communicating with chatbot API:', error);
      const errorMessage = { text: "Sorry, I'm having trouble connecting. Please try again later.", sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', height: '80vh', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
        Agricultural AI Assistant
      </Typography>
      <Paper elevation={3} sx={{ flexGrow: 1, p: 2, mb: 2, overflow: 'auto' }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index} sx={{ 
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              alignItems: 'flex-start'
            }}>
              {msg.sender === 'bot' && (
                <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>AI</Avatar>
              )}
              <Paper elevation={2} sx={{ 
                p: 2, 
                bgcolor: msg.sender === 'user' ? 'primary.light' : 'background.paper',
                color: msg.sender === 'user' ? 'primary.contrastText' : 'text.primary',
                maxWidth: '70%'
              }}>
                <ListItemText primary={msg.text} />
              </Paper>
              {msg.sender === 'user' && (
                <Avatar sx={{ bgcolor: 'secondary.main', ml: 1 }}>U</Avatar>
              )}
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Paper>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about weather, soil, crops, or fertilizers..."
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSend}
          disabled={!input.trim()}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chatbot;