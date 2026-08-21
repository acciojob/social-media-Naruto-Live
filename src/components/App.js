import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams
} from "react-router-dom";

const initialUsers = [
  {
    id: 1,
    name: "Naruto",
    username: "naruto"
  },
  {
    id: 2,
    name: "Sasuke",
    username: "sasuke"
  },
  {
    id: 3,
    name: "Sakura",
    username: "sakura"
  }
];

const initialPosts = [
  {
    id: 1,
    title: "Learning React",
    content: "React is really interesting.",
    userId: 1,
    reactions: {
      thumbsUp: 0,
      heart: 0,
      rocket: 0,
      laugh: 0,
      wow: 0
    }
  },
  {
    id: 2,
    title: "My second post",
    content: "This is another post.",
    userId: 2,
    reactions: {
      thumbsUp: 0,
      heart: 0,
      rocket: 0,
      laugh: 0,
      wow: 0
    }
  },
  {
    id: 3,
    title: "Hello everyone",
    content: "Welcome to GenZ.",
    userId: 3,
    reactions: {
      thumbsUp: 0,
      heart: 0,
      rocket: 0,
      laugh: 0,
      wow: 0
    }
  }
];

function App() {
  const [users] = useState(initialUsers);
  const [posts, setPosts] = useState(initialPosts);
  const [notifications, setNotifications] = useState([]);

  const addPost = (post) => {
    setPosts((prev) => [
      ...prev,
      {
        ...post,
        id: Date.now(),
        reactions: {
          thumbsUp: 0,
          heart: 0,
          rocket: 0,
          laugh: 0,
          wow: 0
        }
      }
    ]);
  };

  const updatePost = (updatedPost) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === updatedPost.id
          ? updatedPost
          : post
      )
    );
  };

  const reactToPost = (postId, reaction) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) {
          return post;
        }

        return {
          ...post,
          reactions: {
            ...post.reactions,
            [reaction]: post.reactions[reaction] + 1
          }
        };
      })
    );
  };

  const refreshNotifications = () => {
    setNotifications([
      {
        id: 1,
        message: "New notification"
      },
      {
        id: 2,
        message: "Someone reacted to your post"
      }
    ]);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <h1>GenZ</h1>

        <nav>
          <Link to="/">Posts</Link>
          <Link to="/users">Users</Link>
          <Link to="/notifications">
            Notifications
          </Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <Home
                posts={posts}
                users={users}
                addPost={addPost}
                reactToPost={reactToPost}
              />
            }
          />

          <Route
            path="/users"
            element={
              <Users
                users={users}
                posts={posts}
              />
            }
          />

          <Route
            path="/users/:userId"
            element={
              <UserPosts
                users={users}
                posts={posts}
                reactToPost={reactToPost}
              />
            }
          />

          <Route
            path="/posts/:postId"
            element={
              <PostDetails
                posts={posts}
                users={users}
                updatePost={updatePost}
              />
            }
          />

          <Route
            path="/notifications"
            element={
              <Notifications
                notifications={notifications}
                refreshNotifications={
                  refreshNotifications
                }
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


/* =========================
   HOME
========================= */

function Home({
  posts,
  users,
  addPost,
  reactToPost
}) {
  return (
    <div>
      <CreatePost
        users={users}
        addPost={addPost}
      />

      <Posts
        posts={posts}
        users={users}
        reactToPost={reactToPost}
      />
    </div>
  );
}


/* =========================
   CREATE POST
========================= */

function CreatePost({ users, addPost }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !author ||
      !content.trim()
    ) {
      return;
    }

    addPost({
      title,
      content,
      userId: Number(author)
    });

    setTitle("");
    setAuthor("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="postTitle"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        placeholder="Post title"
      />

      <select
        id="postAuthor"
        value={author}
        onChange={(e) =>
          setAuthor(e.target.value)
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
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        placeholder="Post content"
      />

      <button type="submit">
        Add Post
      </button>
    </form>
  );
}


/* =========================
   POSTS
========================= */

function Posts({
  posts,
  users,
  reactToPost
}) {
  return (
    <div className="posts-list">
      {posts.map((post) => {
        const user = users.find(
          (u) => u.id === post.userId
        );

        return (
          <Post
            key={post.id}
            post={post}
            user={user}
            reactToPost={reactToPost}
          />
        );
      })}
    </div>
  );
}


/* =========================
   SINGLE POST
========================= */

function Post({
  post,
  user,
  reactToPost
}) {
  const navigate = useNavigate();

  const goToPost = () => {
    navigate(`/posts/${post.id}`);
  };

  return (
    <article className="post">
      <h2>{post.title}</h2>

      <p>{post.content}</p>

      <p>
        Author: {user ? user.name : "Unknown"}
      </p>

      <div className="reactions">

        <button
          onClick={() =>
            reactToPost(
              post.id,
              "thumbsUp"
            )
          }
        >
          👍 {post.reactions.thumbsUp}
        </button>

        <button
          onClick={() =>
            reactToPost(
              post.id,
              "heart"
            )
          }
        >
          ❤️ {post.reactions.heart}
        </button>

        <button
          onClick={() =>
            reactToPost(
              post.id,
              "rocket"
            )
          }
        >
          🚀 {post.reactions.rocket}
        </button>

        <button
          onClick={() =>
            reactToPost(
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

      <button
        className="button"
        onClick={goToPost}
      >
        View Post
      </button>
    </article>
  );
}


/* =========================
   USERS
========================= */

function Users({ users, posts }) {
  return (
    <div>
      <h2>Users</h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


/* =========================
   USER POSTS
========================= */

function UserPosts({
  users,
  posts,
  reactToPost
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
        {user ? user.name : "User"}
      </h2>

      <div>
        {userPosts.map((post) => (
          <article
            className="post"
            key={post.id}
          >
            <h2>{post.title}</h2>

            <p>{post.content}</p>

            <button
              className="button"
              onClick={() =>
                window.location.href =
                  `/posts/${post.id}`
              }
            >
              View Post
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}


/* =========================
   POST DETAILS / EDIT
========================= */

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

  const [title, setTitle] =
    useState(
      post ? post.title : ""
    );

  const [content, setContent] =
    useState(
      post ? post.content : ""
    );

  if (!post) {
    return <h2>Post not found</h2>;
  }

  const user = users.find(
    (item) => item.id === post.userId
  );

  const savePost = () => {
    updatePost({
      ...post,
      title,
      content
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
            {user ? user.name : "Unknown"}
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
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <textarea
            id="postContent"
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
          />

          <button
            onClick={savePost}
          >
            Save
          </button>
        </>
      )}

    </article>
  );
}


/* =========================
   NOTIFICATIONS
========================= */

function Notifications({
  notifications,
  refreshNotifications
}) {
  return (
    <section className="notificationsList">

      <button
        className="button"
        onClick={refreshNotifications}
      >
        Refresh Notifications
      </button>

      {notifications.map(
        (notification) => (
          <div key={notification.id}>
            {notification.message}
          </div>
        )
      )}

    </section>
  );
}

export default App;




























// // the other one 
// import React, { useState } from "react";
// import {
//   BrowserRouter,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

// import Posts from "./Posts";
// import Users from "./Users";
// import UserPosts from "./UserPosts";
// import PostDetails from "./PostDetails";
// import Notifications from "./Notifications";

// const initialUsers = [
//   {
//     id: 1,
//     name: "Naruto",
//     username: "naruto"
//   },
//   {
//     id: 2,
//     name: "Sasuke",
//     username: "sasuke"
//   },
//   {
//     id: 3,
//     name: "Sakura",
//     username: "sakura"
//   }
// ];

// const initialPosts = [
//   {
//     id: 1,
//     title: "Learning React",
//     content: "React is really interesting.",
//     userId: 1,
//     reactions: {
//       thumbsUp: 0,
//       heart: 0,
//       rocket: 0,
//       laugh: 0,
//       wow: 0
//     }
//   },
//   {
//     id: 2,
//     title: "My second post",
//     content: "This is another post.",
//     userId: 2,
//     reactions: {
//       thumbsUp: 0,
//       heart: 0,
//       rocket: 0,
//       laugh: 0,
//       wow: 0
//     }
//   },
//   {
//     id: 3,
//     title: "Hello everyone",
//     content: "Welcome to GenZ.",
//     userId: 3,
//     reactions: {
//       thumbsUp: 0,
//       heart: 0,
//       rocket: 0,
//       laugh: 0,
//       wow: 0
//     }
//   }
// ];

// function App() {
//   const [users] = useState(initialUsers);
//   const [posts, setPosts] = useState(initialPosts);
//   const [notifications, setNotifications] = useState([]);

//   const addPost = (newPost) => {
//     setPosts((currentPosts) => [
//       ...currentPosts,
//       {
//         ...newPost,
//         id: Date.now(),
//         reactions: {
//           thumbsUp: 0,
//           heart: 0,
//           rocket: 0,
//           laugh: 0,
//           wow: 0
//         }
//       }
//     ]);
//   };

//   const updatePost = (updatedPost) => {
//     setPosts((currentPosts) =>
//       currentPosts.map((post) =>
//         post.id === updatedPost.id
//           ? updatedPost
//           : post
//       )
//     );
//   };

//   const addReaction = (postId, reaction) => {
//     setPosts((currentPosts) =>
//       currentPosts.map((post) => {
//         if (post.id !== postId) {
//           return post;
//         }

//         return {
//           ...post,
//           reactions: {
//             ...post.reactions,
//             [reaction]:
//               post.reactions[reaction] + 1
//           }
//         };
//       })
//     );
//   };

//   const refreshNotifications = () => {
//     setNotifications([
//       {
//         id: 1,
//         message: "New notification received."
//       },
//       {
//         id: 2,
//         message: "Someone reacted to your post."
//       }
//     ]);
//   };

//   return (
//     <BrowserRouter>
//       <div className="App">

//         <h1>GenZ</h1>

//         <nav className="navigation">
//           <Link to="/">Posts</Link>
//           <Link to="/users">Users</Link>
//           <Link to="/notifications">
//             Notifications
//           </Link>
//         </nav>

//         <Switch>

//           <Route exact path="/">
//             <Posts
//               posts={posts}
//               users={users}
//               addPost={addPost}
//               addReaction={addReaction}
//             />
//           </Route>

//           <Route exact path="/users">
//             <Users users={users} />
//           </Route>

//           <Route path="/users/:userId">
//             <UserPosts
//               users={users}
//               posts={posts}
//             />
//           </Route>

//           <Route path="/posts/:postId">
//             <PostDetails
//               posts={posts}
//               users={users}
//               updatePost={updatePost}
//             />
//           </Route>

//           <Route path="/notifications">
//             <Notifications
//               notifications={notifications}
//               refreshNotifications={
//                 refreshNotifications
//               }
//             />
//           </Route>

//         </Switch>

//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;