import React from "react";
import {
  Link,
  useParams
} from "react-router-dom";

function UserPosts({
  users,
  posts
}) {
  const { userId } = useParams();

  const user = users.find(
    (item) =>
      item.id === Number(userId)
  );

  const userPosts = posts.filter(
    (post) =>
      post.userId === Number(userId)
  );

  return (
    <div>

      <h2>
        {user
          ? user.name
          : "User"}
      </h2>

      {userPosts.map((post) => (
        <article
          className="post"
          key={post.id}
        >

          <h2>{post.title}</h2>

          <p>{post.content}</p>

          <Link
            className="button"
            to={`/posts/${post.id}`}
          >
            View Post
          </Link>

        </article>
      ))}

    </div>
  );
}

export default UserPosts;