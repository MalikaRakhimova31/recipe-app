import { request } from "@/services/http-client";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Container from "../Container/Container";
import Image from "next/image";
import {
  AiOutlinePlusCircle,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineHome,
} from "react-icons/ai";
import Link from "next/link";
import { toast } from "react-toastify";

interface Props {
  name: string;
  description: string;
  id: number;
  ingredients: string;
  created_at: Date;
  image: string;
}

export default function RecipeItem() {
  const [item, setItem] = useState<Props | undefined>();
  const { query, push } = useRouter();

  useEffect(() => {
    request.get(`/recipes/${query.id}`).then((res) => setItem(res.data));
  }, []);

  const handleDelete = () => {
    request.delete(`/recipes/${query.id}`).then(() => {
      toast.info("Successfully deleted", {
        toastId: "success2",
      });
      push("/");
    });
  };
  return (
    <>
      <Container>
        <div className="min-h-[87vh] my-4">
          <Link href="/">
            <AiOutlineHome size="1.5rem" className="mb-4" />
          </Link>
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-bold">{item?.name}</h2>
            <div className="flex items-center gap-x-8">
              <Link href="/create-recipe">
                <div className="flex items-center gap-2 cursor-pointer">
                  <AiOutlinePlusCircle color="white" size="1.7rem" />
                  Add
                </div>
              </Link>
              <Link href={`/edit-recipe/${query.id}`}>
                <div className="flex items-center gap-2 cursor-pointer">
                  <AiOutlineEdit color="white" size="1.7rem" />
                  Edit
                </div>
              </Link>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleDelete}
              >
                <AiOutlineDelete color="red" size="1.7rem" />
                Delete
              </div>
            </div>
          </div>
          <div className="my-8 rounded-lg overflow-hidden h-full w-full">
            <img
              src={item?.image}
              alt="Recipe image"
              style={{ objectFit: "cover", width: "100%", height: "480px" }}
            />
          </div>
          <p className="text-lg">{item?.description}</p>
          <h3 className="font-bold text-xl text-yellow-500 mt-8">
            Ingredients
          </h3>
          {item?.ingredients.includes("\n") ? (
            <ul className="flex flex-col gap-y-2 my-4 list-disc">
              {item?.ingredients?.split("\n").map((el) => (
                <li key={`recipe-item-${item?.id}`}>{el}</li>
              ))}
            </ul>
          ) : (
            <p className="text-lg">{item?.ingredients}</p>
          )}
        </div>
      </Container>
    </>
  );
}
