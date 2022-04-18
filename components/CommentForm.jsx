import React, { useEffect, useState } from "react";
import { submitComment } from "../services";
function CommentForm({ slug }) {
  const [error, setError] = useState(false);
  const [showSucessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: null,
    email: null,
    comment: null,
    storeData: false,
  });
  const handlePostSubmission = () => {
    setError(false);
    const { name, email, comment, storeData } = formData;
    if (!name || !email || !comment) {
      setError(true);
      return;
    }
    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("name");
      localStorage.removeItem("email");
    }

    submitComment(commentObj).then((res) => {
      if (res.createComment) {
        if (!storeData) {
          formData.name = "";
          formData.email = "";
        }
        formData.comment = "";
        setFormData((prevState) => ({
          ...prevState,
          ...formData,
        }));
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }
    });
  };
  return (
    <div className="bg-white px-8 py-6 shadow-lg flex flex-col rounded-lg mb-8 ">
      <h1 className="text-xl font-bold py-2 border-b border-gray-200 mb-6">
        Deixe seu comentário
      </h1>
      <div>
        <textarea
          className="p-4 outline-none w-full rounded-lg h-40 resize-none focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          name="comment"
          id="comment"
          value={formData.comment}
          placeholder="Digite aqui seu comentário"
          onChange={(e) =>
            setFormData((prevState) => ({
              ...prevState,
              [e.target.name]: e.target.value,
            }))
          }
        ></textarea>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Nome"
          name="name"
          value={formData.name}
          onChange={(e) =>
            setFormData((prevState) => ({
              ...prevState,
              [e.target.name]: e.target.value,
            }))
          }
        />
        <input
          type="email"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prevState) => ({
              ...prevState,
              [e.target.name]: e.target.value,
            }))
          }
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            type="checkbox"
            id="storeData"
            name="storeData"
            value={formData.storeData}
            checked={formData.storeData}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.checked,
              }))
            }
          />
          <label
            className="text-gray-500 ml-2 cursor-pointer"
            htmlFor="storeData"
          >
            Salve meu nome e email para futuros comentários
          </label>
        </div>
      </div>
      <div className="text-start my-5">
        <span
          onClick={handlePostSubmission}
          className="transition duration-500 ease transform hover:-translate-y-1 inline-block px-10 py-3 bg-pink-600 text-white rounded-full cursor-pointer text-md font-medium"
        >
          Postar comentário
        </span>
      </div>
      {error && (
        <p className="text-center text-red-500">
          Todos os campos são necessários!
        </p>
      )}
      {showSucessMessage && (
        <p className="text-center text-xl text-green-500">
          Comentário enviado para revisão !
        </p>
      )}
    </div>
  );
}

export default CommentForm;
