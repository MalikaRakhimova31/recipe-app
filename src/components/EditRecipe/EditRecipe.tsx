import { request } from "@/services/http-client";
import Container from "../Container/Container";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";

const ACCESS_KEY = "nz7j2tJ7DCXC66-vgMGNd-77ieLScyOHgi8ECaUatOU";

interface Props {
  name: string;
  description: string;
  id: number;
  ingredients: string;
  created_at: Date;
  image: string;
}

export default function EditRecipe() {
  const now = new Date();
  const router = useRouter();
  const [state, setState] = useState({
    name: "",
    description: "",
    ingredients: "",
    created_at: now,
    image: "",
  });

  useEffect(() => {
    request.get(`/recipes/${router.query.id}`).then((res) => {
      setState({ ...res.data });
    });
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await request
        .put(`/recipes/${router.query.id}`, {
          ...state,
        })
        .then(() => {
          toast.success("Successfully edited", {
            toastId: "success2",
          });
          router.push("/");
        });
    } catch (error) {
      console.log("error", error);
    }
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
          <h2 className="text-4xl font-bold mb-8">Edit Recipe</h2>
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
              Edit
            </button>
          </form>
        </Container>
      </section>
    </>
  );
}
