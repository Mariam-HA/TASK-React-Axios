import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { addPet } from "../api/pets";
// import Input from "./Input";

const Modal = ({ show, setShowModal }) => {
  const [petInfo, setPetInfo] = useState({});
  const queryClient = useQueryClient();

  const handleChange = (e) => {
    setPetInfo({ ...petInfo, [e.target.name]: e.target.value });
  };

  const mutation = useMutation({
    mutationFn: () => addPet(petInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  if (!show) return "";
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="inset-0 fixed  flex justify-center items-center flex-col z-20 overflow-hidden">
          <div className="bg-black absolute z-0 opacity-70 inset-0 "></div>
          <div className="relative z-10 flex flex-col gap-3 border-[3px] border-black rounded-md w-[95%] md:w-[40%] h-[300px] md:h-[30%] bg-white pt-[50px]">
            <input placeholder="name" name="name" onChange={handleChange} />
            <input placeholder="type" name="type" onChange={handleChange} />
            <input placeholder="image" name="image" onChange={handleChange} />
            <input
              placeholder="adopted"
              name="adopted"
              onChange={handleChange}
            />

            <button
              className="right-0 top-2 absolute w-[70px] border border-black rounded-md ml-auto mr-5 hover:bg-red-400"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Close
            </button>

            <button
              type="submit"
              className="w-[70px] border border-black rounded-md ml-auto mr-5 hover:bg-green-400"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Modal;

// const [name, setName] = useState("");
// const [type, setType] = useState("");
// const [image, setImage] = useState("");
// const [available, setAvailable] = useState(0);

// onChange={(e) => {
//   setName(e.target.value);
// }}
