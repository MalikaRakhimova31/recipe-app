import React from "react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

interface Props {
  name: string | undefined;
  description: string;
  image: string;
  time: string | undefined;
  ingredients: string;
  id: number;
}

export default function Card(props: Props) {
  const { name, description, image, time, ingredients, id } = props;
  return (
    <>
      <Link href={`/recipe/${id}`}>
        <div className="cursor-pointer hover:border-yellow-400 duration-300 rounded-lg border border-slate-400 overflow-hidden h-80 flex flex-col justify-between gap-y-4">
          <div className="relative h-full w-full">
            <Image
              src={image}
              alt="recipe-img"
              loading="lazy"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex flex-col items-start gap-2 p-4">
            <h3 className="text-md">{name}</h3>
            <p
              className="text-sm overflow-hidden line-clamp-3 whitespace-normal"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <div className="text-sm text-gray-400 font-semibold">
              Created at: {dayjs(time).format("DD-MM-YYYY")}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
