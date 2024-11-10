// RecipeOfTheDay.js
import React, { useState, useEffect } from "react";
import {
  IconButton,
  Modal,
  Paper,
  Typography,
  List,
  ListItem,
  Box,
  Fade,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CloseIcon from "@mui/icons-material/Close";

const RecipeOfTheDay = () => {
  const [recipe, setRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recipeDatabase = [
    {
      name: "Pasta Carbonara",
      ingredients: [
        "200g spaghetti",
        "100g pancetta",
        "2 eggs",
        "50g parmesan",
      ],
      cookingTime: "20 minutes",
      instructions: "1. Cook pasta\n2. Fry pancetta\n3. Mix eggs and cheese",
    },
    {
      name: "Chicken Curry",
      ingredients: [
        "500g chicken",
        "2 onions",
        "curry spices",
        "400ml coconut milk",
      ],
      cookingTime: "40 minutes",
      instructions:
        "1. Cook onions\n2. Add chicken\n3. Add spices and coconut milk",
    },
  ];

  useEffect(() => {
    const generateDailyRecipe = () => {
      const today = new Date();
      const seed =
        today.getFullYear() * 10000 +
        (today.getMonth() + 1) * 100 +
        today.getDate();
      const recipeIndex = seed % recipeDatabase.length;
      setRecipe(recipeDatabase[recipeIndex]);
    };

    generateDailyRecipe();

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const timeUntilMidnight = tomorrow - now;

    const timer = setTimeout(() => {
      generateDailyRecipe();
      setInterval(generateDailyRecipe, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);

    return () => clearTimeout(timer);
  }, []);

  if (!recipe) return null;

  return (
    <>
      <IconButton
        sx={{
          position: "fixed",
          bottom: 20,
          left: 20,
          zIndex: 1000,
        }}
        onClick={() => setIsModalOpen(true)}
        color="primary"
      >
        <RestaurantIcon />
      </IconButton>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        closeAfterTransition
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={isModalOpen}>
          <Paper
            sx={{
              maxWidth: 500,
              width: "90%",
              maxHeight: "90vh",
              overflow: "auto",
              p: 3,
              position: "relative",
            }}
          >
            <IconButton
              onClick={() => setIsModalOpen(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ color: "black" }}
            >
              Recipe of the Day
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                {recipe.name}
              </Typography>

              <Typography variant="body1" gutterBottom>
                Cooking Time: {recipe.cookingTime}
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Ingredients:
              </Typography>
              <List>
                {recipe.ingredients.map((ingredient, index) => (
                  <ListItem key={index}>
                    <Typography variant="body1">{ingredient}</Typography>
                  </ListItem>
                ))}
              </List>

              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Instructions:
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{ whiteSpace: "pre-line" }}
              >
                {recipe.instructions}
              </Typography>
            </Box>
          </Paper>
        </Fade>
      </Modal>
    </>
  );
};

export default RecipeOfTheDay;
