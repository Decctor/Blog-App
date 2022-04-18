import React, { useEffect, useState } from "react";
import { getComments } from "../services";
import moment from "moment";
function Comments({ slug }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getComments(slug).then((res) => setComments(res));
  }, []);
  return (
    <div className="bg-white px-8 py-6 mb-8 rounded-lg">
      <h1 className="text-xl font-bold py-2 border-b border-gray-200 mb-6">
        Comentários
      </h1>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div className="py-3 border-b border-gray-300">
            <h3 className="text-xl font-bold">Por: {comment.name}</h3>
            <p className="text-sm">
              {moment(comment.createdAt).format("MMM DD,YYYY")}
            </p>
            <p className="mt-3 font-semibold">{comment.comment}</p>
          </div>
        ))
      ) : (
        <p>Sem comentários :(</p>
      )}
    </div>
  );
}

export default Comments;
