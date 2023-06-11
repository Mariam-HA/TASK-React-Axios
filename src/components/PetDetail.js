import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { useParams } from "react-router-dom";
import { deletePetByid, getPetByid, updatePet } from "../api/pets";

const PetDetail = () => {
  const queryClient = useQueryClient();
  const { petId } = useParams();

  const { data: pet } = useQuery({
    queryKey: ["pet", petId],
    queryFn: () => getPetByid(petId),
  });

  const { mutate: deleteThePet, isLoading } = useMutation({
    mutationFn: () => deletePetByid(petId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pet"] });
    },
  });

  const { mutate: updateThePet } = useMutation({
    mutationFn: () => updatePet(petId, pet.name, pet.image, pet.type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pet"] });
    },
  });

  const handleDelete = () => {
    deleteThePet();
  };

  const handleUpdate = () => {
    updateThePet();
  };

  if (isLoading) return <h1> Loading..</h1>;

  if (!pet) {
    return <h1>There is no pet with the id: ${petId}</h1>;
  }

  return (
    <div className="bg-[#F9E3BE] w-screen h-[100vh] flex justify-center items-center">
      <div className="border border-black rounded-md w-[70%] h-[70%] overflow-hidden flex flex-col md:flex-row p-5">
        <div className="h-full w-full md:w-[35%]">
          <img
            src={pet.image}
            alt={pet.name}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="w-full md:w-[65%] h-full pt-[30px] flex flex-col p-3">
          <h1>Name: {pet.name}</h1>
          <h1>Type: {pet.type}</h1>
          <h1>adopted: {pet.adopted}</h1>

          <button
            onClick={handleUpdate}
            className="w-[70px] border border-black rounded-md  hover:bg-green-400 mb-5"
          >
            Adobt
          </button>

          <button
            onClick={handleDelete}
            className="w-[70px] border border-black rounded-md  hover:bg-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;

// const callApi = async () => {
//   const res = await getPetByid(petId);
//   setPet(res);
// };

// // const pet = petsData.find((pett) => pett.id == petId);
// const handleUpdate = () => {
//   updatePet(pet.id, pet.name, pet.image, pet.type, pet.adopted);
// };

// const handleDelete = () => {
//   deletePetByid(pet.id);
// };

// useEffect(() => {
//   callApi();
// }, []);
