import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import Container from "../Container/Container";
import { request } from "@/services/http-client";
import Link from "next/link";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RecipeProps } from "@/types/types";
import { useSelector } from "react-redux";

export default function MainPage() {
  const [search, setSearch] = useState("");
  const recipes = useSelector((state: any) => state.recipes.recipes);
  const [state, setState] = useState<RecipeProps[]>(recipes);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setState(
      recipes.filter((recipe: RecipeProps) =>
        recipe.name.includes(e.target.value)
      )
    );
  };

  return (
    <>
      <main className="min-h-[87vh]">
        <Container>
          <div className="w-full">
            <input
              className="w-full h-10 px-4 py-2 rounded-full text-slate-900 font-medium my-8"
              name="search"
              placeholder="Search Recipes"
              value={search}
              onChange={handleSearch}
            />
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-5xl">Recipes</h1>
            <Link href="/create-recipe">
              <div className="flex items-center gap-2 cursor-pointer">
                <AiOutlinePlusCircle color="white" size="1.7rem" />
                Add Recipe
              </div>
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-8">
            {state.length ? (
              state?.map((recipe: RecipeProps) => (
                <Card
                  name={recipe.name}
                  description={recipe.description}
                  ingredients={recipe.ingredients}
                  id={recipe.id}
                  image={recipe.image}
                  time={recipe.created_at}
                />
              ))
            ) : (
              <Link href="/create-recipe">
                <div className="flex gap-x-4 mt-10 bg-yellow-500 text-slate-900 font-bold text-md p-3 items-center justify-center rounded-md">
                  <AiOutlinePlusCircle
                    className="text-slate-900"
                    size="1.7rem"
                  />
                  Add Recipe
                </div>
              </Link>
            )}
          </div>
        </Container>
      </main>
    </>
  );
}
