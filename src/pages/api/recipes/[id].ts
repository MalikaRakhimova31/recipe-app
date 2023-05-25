import { NextApiRequest, NextApiResponse } from "next";

type Recipe = {
  name: string;
  description: string;
  image: string;
  time: Date;
  ingredients: string;
  id: number;
};

const now = new Date();

let recipes: Recipe[] = [
  {
    id: 1,
    name: "Pancake",
    description: "Delicious pancake recipe",
    image: "/images/pancake.jpg",
    time: now,
    ingredients: "Flour",
  },
  {
    id: 2,
    name: "Pizza",
    description: "Homemade pizza recipe",
    ingredients: "Tomato",
    image: "/images/pancake.jpg",
    time: now,
  },
];

// GET /api/recipes/:id
const getRecipeById = (
  req: NextApiRequest,
  res: NextApiResponse<Recipe | { message: string }>
) => {
  const { id } = req.query;

  const recipe = recipes.find((recipe) => recipe.id == Number(id));

  if (recipe) {
    res.status(200).json(recipe);
  } else {
    res.status(404).json({ message: "Recipe not found" });
  }
};

// PUT /api/recipes/:id
const updateRecipe = (
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) => {
  const { id } = req.query;

  const updatedRecipe: Recipe = req.body;
  const index = recipes.findIndex((recipe) => recipe.id === Number(id));

  if (index !== -1) {
    recipes[index] = { ...updatedRecipe, id: Number(id) };
    res.status(200).json({ message: "Recipe updated successfully" });
  } else {
    res.status(404).json({ message: "Recipe not found" });
  }
};

// DELETE /api/recipes/:id
const deleteRecipe = (
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) => {
  const { id } = req.query;
  const index = recipes.findIndex((recipe) => recipe.id === Number(id));

  if (index !== -1) {
    recipes.splice(index, 1);
    res.status(200).json({ message: "Recipe deleted successfully" });
  } else {
    res.status(404).json({ message: "Recipe not found" });
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("handle", req);
  if (req.method === "GET") {
    if (req.query.id) {
      getRecipeById(req, res);
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } else if (req.method === "PUT") {
    updateRecipe(req, res);
  } else if (req.method === "DELETE") {
    deleteRecipe(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
