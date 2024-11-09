import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
export default function CustomSignUpPage() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    preference: '', // preference is initialized as empty string to ensure no default selection
    contactNumber: '', // added contactNumber field
  });
  const [error, setError] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form and handle signup
  const handleSignUp = () => {
    const { username, email, phone, address, preference, contactNumber } = formData;

    // Basic validation: username, email, phone, address, preference, and contactNumber
    if (!username || !email || !phone || !address || !preference || !contactNumber) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    console.log('Sign-Up Data:', formData); // Here you would typically call an API for signing up
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>

        {/* Display error message if any */}
        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {/* Username */}
        <TextField
          fullWidth
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          margin="normal"
        />

        {/* Email */}
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          margin="normal"
        />

        {/* Phone */}
        <TextField
          fullWidth
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          margin="normal"
        />

        {/* Address */}
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          margin="normal"
        />

        {/* Contact Number */}
        <TextField
          fullWidth
          label="Contact Number"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleInputChange}
          margin="normal"
        />

        {/* Preference Radio Buttons */}
        <div>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Select Preference:
          </Typography>
          <RadioGroup
            name="preference"
            value={formData.preference}
            onChange={handleInputChange}
            row
          >
            <FormControlLabel value="veg" control={<Radio />} label="Veg" />
            <FormControlLabel value="nonveg" control={<Radio />} label="Non-Veg" />
          </RadioGroup>
        </div>

        {/* Sign Up Button */}
        <Button variant="contained" color="primary" onClick={handleSignUp} sx={{ mt: 2,backgroundColor:"#2A9CA8" }}>
          Sign Up
        </Button>
      </Box>
    </Container>
  );
}
