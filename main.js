// AXIOS GLOBAL (if custom headers are to be automated then we can use this)
axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.yJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// GET REQUEST
function getTodos() {
  axios
  .get('https://jsonplaceholder.typicode.com/todos?_limit=5')  //,{params : {limit:4}})
  //   ({                                                         this can be also done    
  // method : 'get',
  //   url : 'https://jsonplaceholder.typicode.com/todos?_limit=5',

  //   // params : {             used to pass in the parameters like limit
  //   //   _limit : 5
  //   // }
  // })

  .then((toDo) => showOutput(toDo))
  .catch((err) => console.log(err))
}

// POST REQUEST
function addTodo() {
  axios({
    method : 'post',
    url : 'https://jsonplaceholder.typicode.com/todos',
    data : {
      title:'New ToDO 1',
    completed : false
    }
  })


//   // .post('https://jsonplaceholder.typicode.com/todos',
//   // {
//   //   title:'New ToDO 1',
//   //   completed : false
//   // })


  .then( (toDo) => showOutput(toDo))
  .catch( (err) => console.log(err))
}

// PUT/PATCH REQUEST

function updateTodo() {
  axios({
    method : 'patch',
    url : 'https://jsonplaceholder.typicode.com/todos/2',
    data : {
      title:'Updated toDO 1',
      completed : true
    }
  })

  // .post('https://jsonplaceholder.typicode.com/todos',
  // {
  //   title:'New ToDO 1',
  //   completed : false
  // })

  .then( (toDo) => showOutput(toDo))
  .catch( (err) => console.log(err))
}

// DELETE REQUEST
function removeTodo() {
  axios( {
    method : 'delete',
    url : 'https://jsonplaceholder.typicode.com/todos/4'
  })

  // .delete('https://jsonplaceholder.typicode.com/todos/2')
  .then( (toDel) => showOutput(toDel))
  .catch( (err) => console.error(err));
}

// SIMULTANEOUS DATA
function getData() {
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/comments?_limit=5'),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
  ])

  .then(
    // console.log(arr[0]);
    // console.log(arr[1]);
    // showOutput(arr[0]);

    axios.spread((comment, posts) => {
      showOutput(comment);
    })
  )
  .catch( err => console.error(err))
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers : {
      'Content-Type' : "application/json",
      Authorization : 'somePassword'
    }
  }

  axios
  .post('https://jsonplaceholder.typicode.com/todos',
    {
      title : 'Latest ToDo task',
      completed : true
    }
    , config
  )
  .then(post => showOutput(post))
  .catch(err => console.error(err))
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method : 'post',
    url : 'https://jsonplaceholder.typicode.com/todos',
    data : {
      title : 'Task Tranformation of Requests',
      completed : false
    },
    transformResponse : axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase();
      return data;
    })
  };

  axios(options) // this will create a get request to the changes mad i.e. post in this case
  .then( res => showOutput(res)) 
  .catch( err => console.error(err));
}

// ERROR HANDLING and validateStatus (can be used to bypass the 404 error)
function errorHandling() {
  axios
  .get('https://jsonplaceholder.typicode.com/todoss?_limit=5',{validateStatus : function (status){
    return status < 500; 
  }})
  .then( res => showOutput(res)) 
  .catch( err => {
    
    if(err.response){
      // server responded with a status other than 200 range
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);

      if(err.response.status == 404){
        alert('Error : Page Was Not Found !!!')
      }
    }

    else if(err.request){
      // request was made but no response
      console.error(err.request);
    }
    else {
      console.error(err.message);
    }
  });
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();

  axios
  .get('https://jsonplaceholder.typicode.com/todos',
  {cancelToken : source.token})
  .then( res => showOutput(res))
  .catch(thrown => {
    if(axios.isCancel(thrown)){
      console.log('Request Cancelled', thrown.message);
    }
  });

  if(true) {
    source.cancel('Request Cancelled');
  }
}

// INTERCEPTING REQUESTS & RESPONSES
// this is a logger used to know the requests being carried out at the server
axios.interceptors.request.use(config => {
    console.log(`${config.method.toUpperCase()} request is sent to ${
      config.url
    } at ${new Date()}`);

    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

// USING TIMEOUT IN ANY REQUEST
// timeOut will create a limit till which the request can be executed
function getTodos() {
  axios
  .get('https://jsonplaceholder.typicode.com/todos?_limit=5'
  )
  .then((toDo) => showOutput(toDo))
  .catch((err) => console.error(err))
}

// AXIOS INSTANCES
// const axiosInstance = axios.create({
//   baseURL : 'https://jsonplaceholder.typicode.com/'
// })
// axiosInstance.get('todos?_limit=5')
// .then( res => showOutput(res));


// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);

document.getElementById('cancel').addEventListener('click', cancelToken);