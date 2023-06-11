import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { deletePetByid, getPetByid } from "../api/pets";

const PetItem = ({ pet }) => {
  const queryClient = useQueryClient();

  const { mutate: deleteThePet, isLoading } = useMutation({
    mutationFn: () => deletePetByid(pet.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });

  const handleDelete = () => {
    deleteThePet();
  };

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div className="w-[300px] h-[400px]  border border-black rounded-md flex flex-col justify-between items-center p-4">
      <h1 className="text-md font-bold">{pet.name}</h1>
      <img
        src={pet.image}
        alt={`${pet.name}-image`}
        className="w-[200px] rounded-md
      "
      />

      <Link to={`/pets/${pet.id}`}>
        <button className=" border border-black px-5 py-1 rounded-md hover:bg-[black] hover:text-white">
          View
        </button>
      </Link>
      <button
        onClick={handleDelete}
        className="w-[70px] border border-black rounded-md  hover:bg-red-400"
      >
        Delete
      </button>
    </div>
  );
};

export default PetItem;
