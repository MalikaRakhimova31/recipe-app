import { request } from "@/services/http-client";
import Container from "../Container/Container";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { AiOutlineHome } from "react-icons/ai";
import axios from "axios";
import Link from "next/link";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe } from "../../../store/slices/recipeSlice";
import { RecipeProps } from "@/types/types";

const ACCESS_KEY = "nz7j2tJ7DCXC66-vgMGNd-77ieLScyOHgi8ECaUatOU";

export default function CreatRecipe() {
  const [image, setImage] = useState("");
  const now = new Date();
  const router = useRouter();
  const dispatch = useDispatch();
  const recipes = useSelector((state: any) => state.recipes.recipes);

  const [state, setState] = useState<RecipeProps>({
    id: 0,
    name: "",
    description: "",
    ingredients: "",
    created_at: now,
    image: "",
  });

  useEffect(() => {
    axios
      .get("https://api.unsplash.com/photos/random", {
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`,
        },
        params: {
          orientation: "landscape",
          query: "food",
        },
      })
      .then((response) => {
        const imageUrl = response.data.urls.regular;
        setImage(imageUrl);
      })
      .catch((error) => {
        console.error("Error fetching random image:", error);
      });
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newRecipe = {
      ...state,
      id: recipes.length + 1,
      image: image,
    };
    dispatch(addRecipe(newRecipe));
    // try {
    //   const result = await request
    //     .post("/recipes", {
    //       ...state,
    //       image: image,
    //     })
    //     .then(() => {
    //       toast.success("Successfully created", {
    //         toastId: "success2",
    //       });
    //       router.push("/");
    //     });
    // } catch (error) {
    //   console.log("error", error);
    // }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <section className="min-h-[87vh]">
        <Container>
          <Link href="/">
            <AiOutlineHome size="1.5rem" className="mb-4" />
          </Link>
          <h2 className="text-4xl font-bold mb-8">Add Recipe</h2>
          <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-sm">Recipe Title</label>
              <input
                className="rounded-md h-10 text-slate-900 px-2"
                name="name"
                value={state.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">Description</label>
              <textarea
                className="rounded-md text-slate-900 p-2"
                name="description"
                value={state.description}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">Ingredients</label>
              <textarea
                className="rounded-md text-slate-900 p-2"
                name="ingredients"
                value={state.ingredients}
                onChange={handleChange}
              />
            </div>
            <button className="rounded-lg bg-yellow-400 p-2 w-40 text-slate-800 text-md font-semibold">
              Add
            </button>
          </form>
        </Container>
      </section>
    </>
  );
}
