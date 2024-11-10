import React, { useState } from "react";
import { Button, TextField, Typography, Container, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { toast } from "react-toastify";
import axios from "axios";
import photo from "../assets/donation.png"; // Adjust path as needed

export default function DonationPage() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    items: [{ name: "", quantity: "" }],
    description: "Good for health",
    currentAddress: "SPIT, Andheri",
    destinationAddress: "",
    selectNgo: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("items")) {
      const [_, index, property] = name.split(".");
      const updatedItems = [...formData.items];
      updatedItems[index][property] = value;
      setFormData({ ...formData, items: updatedItems });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addFoodItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: "", quantity: "" }],
    });
  };

  const removeFoodItem = (index) => {
    if (index !== 0) {
      const updatedItems = formData.items.filter((_, i) => i !== index);
      setFormData({ ...formData, items: updatedItems });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = "http://localhost:3000/donation/createDonation";

    const payload = {
      userId: "672f4c6484b7073ac76b40ec",
      item: formData.items,
      description: formData.description,
      currentAddress: formData.currentAddress,
      destinationAddress: formData.destinationAddress,
      selectNgo: formData.selectNgo
    };

    try {
      const response = await axios.post(apiUrl, payload);

      if (response.status === 201) {
        toast.success("Donation successfully added. Please select NGO");
      } else {
        toast.error(`Error: ${response.statusText || "Please try again"}`);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Error adding donation. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "100vh",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
    >
      {/* Left Side: Image */}
      <div>
        <img src={photo} alt="Donation" />
      </div>

      {/* Right Side: Donation Form */}
      <Box
        sx={{
          p: 4,
          width: "50%",
          maxWidth: "600px",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
        className="shadow-lg rounded-lg"
      >
        <form onSubmit={handleSubmit}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: "black", textAlign: "center", mb: 2 }}
          >
            Food Donation Form
          </Typography>

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
                name={`items.${index}.quantity`}
                value={item.quantity}
                onChange={handleChange}
                margin="normal"
                type="number"
              />
              {index !== 0 && (
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

          <Button
            variant="outlined"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={addFoodItem}
            sx={{ mb: 2 }}
          >
            Add Food Item
          </Button>

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Current Address"
            name="currentAddress"
            value={formData.currentAddress}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Select NGO"
            name="selectNgo"
            value={formData.selectNgo}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Destination Address"
            name="destinationAddress"
            value={formData.destinationAddress}
            onChange={handleChange}
            margin="normal"
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2, backgroundColor: '#2A9CA8' }}
          >
            Submit Donation
          </Button>

          {/* Contact Information */}
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
              <Typography>Bhavan's Campus, Old D N Nagar, Andheri West, Mumbai</Typography>
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
        </form>
      </Box>
    </Container>
  );
}
