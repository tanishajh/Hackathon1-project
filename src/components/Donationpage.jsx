import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AddIcon from '@mui/icons-material/Add'; // "+" icon
import RemoveIcon from '@mui/icons-material/Remove'; // "-" icon

export default function DonationPage() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    items: [{ name: '', Quantity: '' }], // Default with one food item
    description: 'Good for health',
    currentAddress: 'SPIT, Andheri',
    selectNgo: 'NGO SJK',
    destinationAddress: 'Andheri East',
  });
  const [error, setError] = useState('');

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('items')) {
      const index = name.split('.')[1]; // Get the index for array fields
      const updatedItems = [...formData.items];
      updatedItems[index][name.split('.')[0]] = value; // Update the item
      setFormData({ ...formData, items: updatedItems });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Add a new food item to the list
  const addFoodItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: '', Quantity: '' }],
    });
  };

  // Remove a food item from the list (but not the first one)
  const removeFoodItem = (index) => {
    if (index !== 0) {  // Prevent removing the first food item
      const updatedItems = formData.items.filter((_, i) => i !== index);
      setFormData({ ...formData, items: updatedItems });
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    const { items, description, currentAddress, selectNgo, destinationAddress } = formData;

    // Basic validation
    if (!items || !description || !currentAddress || !selectNgo || !destinationAddress) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    console.log('Donation Data:', formData); // Placeholder for form submission logic
  };

  return (
    <Container
      maxWidth="md"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: '20px',
        backgroundImage: 'url(https://example.com/your-image.jpg)', // Replace with your image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Donation Form */}
      <Box
        sx={{
          p: 4,
          width: '100%',
          maxWidth: '600px',
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background for readability
        }}
        className="shadow-lg rounded-lg"
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: 'black', textAlign: 'center', mb: 2 }}
        >
          Food Donation Form
        </Typography>

        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {/* Item List Fields */}
        {formData.items.map((item, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label={`Food Item ${index + 1}`}
              name={`items.${index}.name`}
              value={item.name}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label={`Quantity of ${item.name}`}
              name={`items.${index}.Quantity`}
              value={item.Quantity}
              onChange={handleChange}
              margin="normal"
              type="number"
            />
            {/* Remove Button */}
            {index !== 0 && (  // Only show the remove button if it's not the first item
              <Button
                variant="outlined"
                color="error"
                startIcon={<RemoveIcon />}
                onClick={() => removeFoodItem(index)}
                sx={{ mt: 1, ml: 1 }}
              >
                Remove
              </Button>
            )}
          </Box>
        ))}

        {/* Add Food Item Button */}
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={addFoodItem}
          sx={{ mb: 2 }}
        >
          Add Food Item
        </Button>

        {/* Description Field */}
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
        />

        {/* Current Address Field */}
        <TextField
          fullWidth
          label="Current Address"
          name="currentAddress"
          value={formData.currentAddress}
          onChange={handleChange}
          margin="normal"
        />

        {/* Select NGO Field */}
        <TextField
          fullWidth
          label="Select NGO"
          name="selectNgo"
          value={formData.selectNgo}
          onChange={handleChange}
          margin="normal"
        />

        {/* Destination Address Field */}
        <TextField
          fullWidth
          label="Destination Address"
          name="destinationAddress"
          value={formData.destinationAddress}
          onChange={handleChange}
          margin="normal"
        />

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2, backgroundColor: '#2A9CA8' }}
        >
          Submit Donation
        </Button>

        {/* Contact Information inside the form */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            width: '100%',
            backgroundColor: '#f7f7f7',
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ color: 'black', textAlign: 'center', mb: 2 }}>
            Contact Us
          </Typography>
          <Box display="flex" alignItems="center" mb={1}>
            <HomeIcon style={{ marginRight: '10px' }} />
            <Typography>Bhavan's Campus, Old D N Nagar, Andheri West, Mumbai, 
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <EmailIcon style={{ marginRight: '10px' }} />
            <Typography>ByteDevs@gmail.com</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <PhoneIcon style={{ marginRight: '10px' }} />
            <Typography>+1 787-504-2308</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
