(() => {
  const appContainer = $('#app');
  // const getPostsButton = $('<button>Get posts</button>');
  // const postList = $('<ul>');
  // getPostsButton.click(() => {
  //   const url = 'https://jsonplaceholder.typicode.com/posts';

  //   axios.get(url).then((resp) => {
  //     const postElements = [];
  //     resp.data.forEach((post) => {
  //       const postElement = $(`<li>${post.title}</li>`);
  //       postElements.push(postElement);
  //     });
  //     postList.append(postElements);
  //   });
  // });
  // appContainer.append(getPostsButton);
  // appContainer.append(postList);

  const showSpinner = () => {
    // ..to do
  };
  const hideSpinner = () => {
    // to do
  };

  const usersList = $('<ul>');
  appContainer.append(usersList);
  const getUsersButton = $('<button>Get users</button>');
  appContainer.append(getUsersButton);
  const pageInput = $('<input type="number">');
  appContainer.append(pageInput);

  getUsersButton.click(() => {
    const url = `https://reqres.in/api/users?page=${pageInput.val()}`;
    showSpinner();
    axios.get(url).then((resp) => {
      hideSpinner();
      const userElements = [];
      resp.data.data.forEach((user) => {
        const userElement = $(`<li>${user.email}</li>`);
        userElements.push(userElement);
      });
      usersList.empty().append(userElements);
    });
  });

})();