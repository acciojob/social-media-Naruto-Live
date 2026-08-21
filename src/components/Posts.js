import React, { useState } from "react";
import { Link } from "react-router-dom";

function Posts({
  posts,
  users,
  addPost,
  addReaction
}) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      title.trim() === "" ||
      author === "" ||
      content.trim() === ""
    ) {
      return;
    }

    addPost({
      title: title,
      content: content,
      userId: Number(author)
    });

    setTitle("");
    setAuthor("");
    setContent("");
  };

  return (
    <div>

      {/* CREATE POST */}

      <form onSubmit={handleSubmit}>

        <input
          id="postTitle"
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
        />

        <select
          id="postAuthor"
          value={author}
          onChange={(event) =>
            setAuthor(event.target.value)
          }
        >
          <option value="">
            Select Author
          </option>

          {users.map((user) => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>

        <textarea
          id="postContent"
          placeholder="Post content"
          value={content}
          onChange={(event) =>
            setContent(event.target.value)
          }
        />

        <button type="submit">
          Add Post
        </button>

      </form>


      {/* POSTS */}

      <div className="posts-list">

        {posts.map((post) => {

          const authorUser = users.find(
            (user) =>
              user.id === post.userId
          );

          return (
            <article
              className="post"
              key={post.id}
            >

              <h2>{post.title}</h2>

              <p>{post.content}</p>

              <p>
                Author:{" "}
                {authorUser
                  ? authorUser.name
                  : "Unknown"}
              </p>


              {/* FIVE REACTION BUTTONS */}

              <div className="reactions">

                <button
                  onClick={() =>
                    addReaction(
                      post.id,
                      "thumbsUp"
                    )
                  }
                >
                  👍 {post.reactions.thumbsUp}
                </button>

                <button
                  onClick={() =>
                    addReaction(
                      post.id,
                      "heart"
                    )
                  }
                >
                  ❤️ {post.reactions.heart}
                </button>

                <button
                  onClick={() =>
                    addReaction(
                      post.id,
                      "rocket"
                    )
                  }
                >
                  🚀 {post.reactions.rocket}
                </button>

                <button
                  onClick={() =>
                    addReaction(
                      post.id,
                      "laugh"
                    )
                  }
                >
                  😂 {post.reactions.laugh}
                </button>

                <button>
                  😮 {post.reactions.wow}
                </button>

              </div>


              {/* IMPORTANT:
                  This is directly inside .post.
                  Cypress can find:
                  .posts-list > :nth-child(2) > .button
              */}

              <Link
                className="button"
                to={`/posts/${post.id}`}
              >
                View Post
              </Link>

            </article>
          );
        })}

      </div>

    </div>
  );
}

export default Posts;