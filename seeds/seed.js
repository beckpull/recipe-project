const sequelize = require('../config/connection');
const { User, Recipe, Comment, Ingredient, Instruction } = require('../models');

const userData = require('./userData.json');
const recipeData = require('./recipeData.json');
const commentData = require('./commentData.json');
const ingredientData = require('./ingredientData.json'); // New ingredient data
const instructionData = require('./instructionData.json'); // New instruction data

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const recipe of recipeData) {
    await Recipe.create({
      ...recipe,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  const ingredients = await Ingredient.bulkCreate(ingredientData);
  const instructions = await Instruction.bulkCreate(instructionData);

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
