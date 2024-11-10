import React, { useState } from "react";
import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  Container,
  Paper,
  Button,
} from "@mui/material";

export default function Recoma() {
  const [selectedItem, setSelectedItem] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const expiredFoodTips = {
    "Expired Dairy": [
      "Compost if safe",
      "Use in pet food if viable",
      "Dispose to avoid odor",
    ],
    "Expired Bread": [
      "Make breadcrumbs if mold-free",
      "Turn into compost",
      "Dispose if moldy",
    ],
    "Expired Fruits": [
      "Use for compost",
      "Extract seeds if viable",
      "Dispose if rotten",
    ],
    "Expired Vegetables": [
      "Create compost or broth if safe",
      "Plant seeds if applicable",
      "Dispose if moldy",
    ],
    "Expired Meat": [
      "Dispose immediately to avoid bacteria",
      "Do not compost",
      "Consider pet use if safe",
    ],
    "Expired Grains": [
      "Check for pests before disposal",
      "Compost if mold-free",
      "Dispose securely",
    ],
  };

  const handleSelection = (event) => {
    const item = event.target.value;
    setSelectedItem(item);
    setRecommendations(
      expiredFoodTips[item] || ["No recommendations available for this item"]
    );
  };

  const clearSelection = () => {
    setSelectedItem("");
    setRecommendations([]);
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 4, mt: 5, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Expired Food Waste Management
        </Typography>

        {/* Dropdown to select expired food item */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Select Expired Food Item</InputLabel>
          <Select value={selectedItem} onChange={handleSelection}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {Object.keys(expiredFoodTips).map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Clear Selection Button */}
        <Button
          variant="outlined"
          color="secondary"
          onClick={clearSelection}
          sx={{ mt: 2 }}
          disabled={!selectedItem}
        >
          Clear Selection
        </Button>

        {/* Recommendations List */}
        {selectedItem && (
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Recommendations for {selectedItem}:
            </Typography>
            <List>
              {recommendations.map((tip, index) => (
                <ListItem key={index}>• {tip}</ListItem>
              ))}
            </List>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
