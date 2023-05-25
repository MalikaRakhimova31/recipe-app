import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import Container from "../Container/Container";
import { request } from "@/services/http-client";
import Link from "next/link";
import { AiOutlinePlusCircle } from "react-icons/ai";

interface StateProps {
  name: string;
  description: string;
  id: number;
  ingredients: string;
  created_at: string;
  image: string;
}
[];

export default function MainPage() {
  const [state, setState] = useState<StateProps[]>([]);
  useEffect(() => {
    request.get("/recipes").then((res) => {
      setState(res.data);
    });
  }, []);

  console.log("state", state);

  return (
    <>
      <main className="min-h-[87vh]">
        <Container>
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
              state?.map((recipe, id) => (
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
