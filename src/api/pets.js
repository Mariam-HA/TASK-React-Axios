import instance from "./index";

const getPets = async () => {
  const pets = await instance.get("pets");
  return pets;
};

const addPet = async (name, image, type, adopted) => {
  const res = await instance.post("pets", {
    name: name,
    image: image,
    type: type,
    adopted: adopted,
  });
  return res;
};

const updatePet = async (petId, name, image, type, adopted) => {
  await instance.put(`pets/${petId}`, {
    name: name,
    image: image,
    type: type,
    adopted: 1,
  });
};
const getPetByid = async (id) => {
  const res = await instance.get(
    `https://pets-react-query-backen.herokuapp.com/pets/${id}`
  );
  return res.data;
};
const deletePetByid = async (id) => {
  const res = await instance.delete(`pets/${id}`);
  return res.data;
};

export { getPets, addPet, updatePet, getPetByid, deletePetByid };
