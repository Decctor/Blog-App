import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../services";
function Categories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((res) => setCategories(res));
  }, []);
  console.log(categories);
  return (
    <div className="bg-white rounded-lg py-4 px-5 mb-8">
      <h1 className="text-lg font-bold py-4 border-b border-gray-300">
        Categorias
      </h1>
      <div className="flex flex-col py-4">
        {categories &&
          categories.map((category) => (
            <div className="py-4 border-b border-gray-300">
              <Link href="/category">
                <p className="cursor-pointer text-gray-600">{category.name}</p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Categories;
