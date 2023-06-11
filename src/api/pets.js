import instance from "./index";

const getPets = async () => {
  const pets = await instance.get("pets");
  return pets.data;
};

const addPet = async (petInfo) => {
  const res = await instance.post("/pets", petInfo);
  console.log(res.data);
};

// const updatePet = async (petId, petInfo) => {
//   const res = await instance.put(`pets/${petId}`, petInfo);
//   return res.data;
// };
const updatePet = async (petId, name, image, type) => {
  const res = await instance.put(`pets/${petId}`, {
    name: name,
    image: image,
    type: type,
    adopted: 1,
  });
  console.log(res.data);
  // return res.data;
};

const getPetByid = async (id) => {
  const res = await instance.get(`pets/${id}`);
  return res.data;
};

const deletePetByid = async (id) => {
  const res = await instance.delete(`pets/${id}`);
  return res.data;
};

export { getPets, addPet, updatePet, getPetByid, deletePetByid };
