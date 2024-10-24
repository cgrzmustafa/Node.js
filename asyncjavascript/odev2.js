const posts = [
  { name: "Post 1", user: "User1" },
  { name: "Post 2", user: "User2" },
  { name: "Post 3", user: "User3" },
  { name: "Post 4", user: "User4" },
  { name: "Post 5", user: "User5" },
];

const listPosts = () => {
  posts.map((post) => {
    console.log(post.name);
  });
};

const addPost = (newPost) => {
  const promise1 = new Promise((resolve, reject) => {
    posts.push(newPost);
    resolve(posts);
    // reject("BIR HATA OLUSTU");
  });
  return promise1;
};

async function showPost() {
  try {
    await addPost({ name: "Post 6", user: "User6" });
    await addPost({ name: "Post 7", user: "User7" });
    listPosts();
  } catch (error) {
    console.log(error);
  }
}

showPost();
