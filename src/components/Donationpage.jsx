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
import photo from "../assets/donation.png";
import { useNavigate } from "react-router-dom";
import themehook from "./AuthContext";

export default function DonationPage() {
  const { userdata, username, setuserdata, setusername } = themehook();
  const navigate = useNavigate();
  const theme = useTheme();
  const [formData, setFormData] = useState({
    items: [{ name: "", Quantity: "" }],
    description: "Good for health",
    currentAddress: "SPIT, Andheri",
    DestinationAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("items")) {
      const [field, index, property] = name.split(".");
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
      items: [...formData.items, { name: "", Quantity: "" }],
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
      userId: username._id,
      item: formData.items,
      Description: formData.description,
      CurrentAddress: formData.currentAddress,
      DestinationAddress: formData.DestinationAddress,
    };

    try {
      const response = await axios.post(apiUrl, payload);

      if (response.status === 201) {
        toast.success("Donation successfully added. Please select NJO");
        navigate("/map");
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
        <img src={photo} />
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
                name={`items.${index}.Quantity`}
                value={item.Quantity}
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

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2, backgroundColor: "#2A9CA8" }}
          >
            Submit Donation
          </Button>
        </form>
      </Box>
    </Container>
  );
}
