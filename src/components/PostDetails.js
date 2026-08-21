import React, { useState } from "react";
import {
  useParams
} from "react-router-dom";

function PostDetails({
  posts,
  users,
  updatePost
}) {
  const { postId } = useParams();

  const post = posts.find(
    (item) =>
      item.id === Number(postId)
  );

  const [editing, setEditing] =
    useState(false);

  if (!post) {
    return (
      <h2>Post not found</h2>
    );
  }

  return (
    <PostContent
      post={post}
      users={users}
      editing={editing}
      setEditing={setEditing}
      updatePost={updatePost}
    />
  );
}

function PostContent({
  post,
  users,
  editing,
  setEditing,
  updatePost
}) {
  const [title, setTitle] =
    useState(post.title);

  const [content, setContent] =
    useState(post.content);

  const author = users.find(
    (user) =>
      user.id === post.userId
  );

  const saveChanges = () => {
    updatePost({
      ...post,
      title: title,
      content: content
    });

    setEditing(false);
  };

  return (
    <article className="post">

      {!editing ? (
        <>
          <h2>{post.title}</h2>

          <p>{post.content}</p>

          <p>
            Author:{" "}
            {author
              ? author.name
              : "Unknown"}
          </p>

          <button
            className="button"
            onClick={() =>
              setEditing(true)
            }
          >
            Edit
          </button>
        </>
      ) : (
        <>
          <input
            id="postTitle"
            value={title}
            onChange={(event) =>
              setTitle(
                event.target.value
              )
            }
          />

          <textarea
            id="postContent"
            value={content}
            onChange={(event) =>
              setContent(
                event.target.value
              )
            }
          />

          <button
            onClick={saveChanges}
          >
            Save
          </button>
        </>
      )}

    </article>
  );
}

export default PostDetails;