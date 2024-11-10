import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Rating,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function FeedbackForm() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedbackType: "",
    message: "",
    donationExperience: "",
    recipeRecommendations: "",
    easeOfUse: "",
    featureRating: 0,
    suggestions: "",
  });
  const [error, setError] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle rating changes
  const handleRatingChange = (e, value) => {
    setFormData({ ...formData, featureRating: value });
  };

  // Validate form and handle submission
  const handleSubmit = () => {
    const { name, email, feedbackType, message } = formData;

    if (!name || !email || !feedbackType || !message) {
      setError("Please fill in all required fields.");
      return;
    }

    setError("");
    console.log("Feedback Data:", formData); // Placeholder for API submission
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          p: 2,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Feedback
        </Typography>

        {/* Display error message if any */}
        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {/* Name */}
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          margin="normal"
          required
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
          required
        />

        {/* Feedback Type */}
        <TextField
          fullWidth
          label="Feedback Type (e.g., Donation, Recipe, Tracking)"
          name="feedbackType"
          value={formData.feedbackType}
          onChange={handleInputChange}
          margin="normal"
          required
        />

        {/* Message */}
        <TextField
          fullWidth
          label="Message"
          name="message"
          multiline
          rows={4}
          value={formData.message}
          onChange={handleInputChange}
          margin="normal"
          required
        />

        {/* Donation Experience */}
        {formData.feedbackType.toLowerCase() === "donation" && (
          <TextField
            fullWidth
            label="Donation Experience"
            name="donationExperience"
            value={formData.donationExperience}
            onChange={handleInputChange}
            margin="normal"
          />
        )}

        {/* Recipe Recommendations */}
        {formData.feedbackType.toLowerCase() === "recipe" && (
          <TextField
            fullWidth
            label="Recipe Recommendations"
            name="recipeRecommendations"
            value={formData.recipeRecommendations}
            onChange={handleInputChange}
            margin="normal"
          />
        )}

        {/* Ease of Use (Dropdown) */}
        <div>
          <Typography variant="h6" sx={{ mt: 2 }}>
            How easy was it to use our website?
          </Typography>
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Ease of Use</InputLabel>
            <Select
              name="easeOfUse"
              value={formData.easeOfUse}
              onChange={handleInputChange}
              label="Ease of Use"
            >
              <MenuItem value="">Select...</MenuItem>
              <MenuItem value="very_easy">Very Easy</MenuItem>
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="neutral">Neutral</MenuItem>
              <MenuItem value="difficult">Difficult</MenuItem>
              <MenuItem value="very_difficult">Very Difficult</MenuItem>
            </Select>
            {formData.easeOfUse === "" && (
              <FormHelperText>Please select an option</FormHelperText>
            )}
          </FormControl>
        </div>

        {/* Feature Rating (Resettable Rating) */}
        <div>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Rate our website features
          </Typography>
          <Rating
            name="featureRating"
            value={formData.featureRating}
            onChange={handleRatingChange}
            precision={0.5}
            emptyIcon={<span style={{ color: "grey" }}>☆</span>}
          />
        </div>

        {/* Suggestions */}
        <TextField
          fullWidth
          label="Any Suggestions?"
          name="suggestions"
          multiline
          rows={3}
          value={formData.suggestions}
          onChange={handleInputChange}
          margin="normal"
        />

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2, backgroundColor: "#2A9CA8" }}
        >
          Submit Feedback
        </Button>
      </Box>
    </Container>
  );
}
