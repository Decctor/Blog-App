import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCategories } from "../services";
function Header() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((res) => setCategories(res));
  }, []);
  return (
    <div className="flex justify-between items-center py-6 mb-8 border-b border-blue-400">
      <Link href="/">
        <h1 className="text-4xl text-white font-bold cursor-pointer">
          Decctor Blog
        </h1>
      </Link>

      <div>
        <ul className="flex gap-4 max-w-xl flex-wrap">
          {categories &&
            categories.map((category) => (
              <Link key={category.name} href={`/category/${category.slug}`}>
                <li className="text-white font-bold cursor-pointer">
                  {category.name}
                </li>
              </Link>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Header;
