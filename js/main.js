let usersRow = document.querySelector(".users-row");
let todosRow = document.querySelector(".todos-row");
let postsRow = document.querySelector(".posts-row");
let commentsRow = document.querySelector(".comment-row");
let photosRow = document.querySelector(".photos-row");

// function showLoading() {
//   usersRow.innerHTML = `<p class = "loading">Loading...</p>`;
// }
function showError(error) {
  usersRow.innerHTML = `<p style="color: red;">Error: ${error}</p>`;
}

function getData(url, callback) {
  // showLoading();
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let res = xhr.response;
        let resJSON = JSON.parse(res);
        callback?.(resJSON);
      } else {
        showError(`Maʼlumotlarni olib boʻlmadi (Status: ${xhr.status})`);
      }
    }
  };
  xhr.open("GET", url);
  xhr.send();
}

function getUserCard(user) {
  return `
  <div class="card">
    <div class="card-body">
      <h5>Name: ${user.name}</h5>
      <h6>Username: ${user.username}</h6>
      <p>Email: ${user.email}</p>
      <p>Adress: ${user.address.street}<span>${user.address.city}</span></p>
      <div class="buttons">
       <button class="Todos"><a href="../todos.html">Todos</a></button>
       <button class="Posts"><a href="../posts.html">Posts</a></button>
       <button class="Photos"><a href="../photos.html">Photos</a></button>
      </div>
    </div>
  </div>`;
}

function getTodosRow(todo) {
  let completedText = todo.completed ? "✅" : "❌";
  return `
  <div class="todo-card">
    <div class="todo-body">
     <h5>Title: ${todo.title}</h5>
     <h6>Completed: ${completedText}</h6>
   </div>
  </div>
  `;
}

function getPostsRow(post) {
  return `
  <div class="post-card">
    <div class="post-body">
      <h5>Title: ${post.title}</h5>
      <p>Body: ${post.body}</p>
      <a href="./comments.html"><button class="Comments">Comments</button></a>
    </div>
  </div>
  `;
}

function getCommentsRow(comment) {
  return `
  <div class="comment-card">
    <div class="comment-body">
      <h5>Name: ${comment.name}</h5>
      <h6>Email: ${comment.email}</h6>
      <p>Comment: ${comment.body}</p>
    </div>
  </div>
  `;
}

function getPhotosRow(photos) {
  return `
  <div class="photo-card">
    <div class="photo-body">
      <img src="${photos.url}" alt="${photos.title}" />
      <h5>Title: ${photos.title}</h5>
    </div>
  </div>
  `;
}

getData(`https://jsonplaceholder.typicode.com/users`, (users) => {
  // usersRow.innerHTML = "";
  users.map((user) => {
    getData(
      `https://jsonplaceholder.typicode.com/todos?userId=${user.id}`,
      (todos) => {
        let userCard = getUserCard(user);
        usersRow.innerHTML += userCard;
        console.log(user);
        todos.map((todo) => {
          let data = getTodosRow(todo);
          todosRow.innerHTML += data;
        });
      }
    );
    getData(
      `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`,
      (posts) => {
        posts.map((post) => {
          let data = getPostsRow(post);
          postsRow.innerHTML += data;
        });
      }
    );
    getData(
      `https://jsonplaceholder.typicode.com/comments?postId=${user.id}`,
      (comments) => {
        comments.map((comment) => {
          let data = getCommentsRow(comment);
          commentsRow.innerHTML += data;
        });
      }
    );
    getData(
      `https://jsonplaceholder.typicode.com/photos?albumId=${user.id}`,
      (photos) => {
        photos.map((photo) => {
          let data = getPhotosRow(photo);
          photosRow.innerHTML += data;
        });
      }
    );
  });
});
