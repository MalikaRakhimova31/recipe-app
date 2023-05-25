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

// GET /api/recipes
const getRecipes = (req: NextApiRequest, res: NextApiResponse<Recipe[]>) => {
  res.status(200).json(recipes);
};

// POST /api/recipes
const createRecipe = (
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) => {
  const newRecipe: Recipe = req.body;
  newRecipe.id = recipes.length + 1;
  recipes.push(newRecipe);

  res.status(201).json({ message: "Recipe created successfully" });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("handle", req);
  if (req.method === "GET") {
    if (!req.query.id) {
      getRecipes(req, res);
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } else if (req.method === "POST") {
    createRecipe(req, res);
  }
}
