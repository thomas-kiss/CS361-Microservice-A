# 🎬 Microservice A – Movie Search API

This is a Node.js + Express microservice that allows clients to search for movie titles in the embedded_movies MongoDB collection from the sample_mflix database.using a simple search API.

---

## Communication Contract

### Requesting Data

To request movie data, your program must send a `GET` request to the following endpoint:

http://server-address:port/search?q=search-term

* Replace server-address with the server hosting the microservice (e.g., localhost).

* Replace port with the listening port (default is 3000).

* Replace search-term with your desired movie title keyword(s) (movie title substring, case-insensitive).
  
**Example call (Node.js using Axios):** 

```js
const axios = require('axios');

const query = "Perfect";
axios.get(`http://localhost:3000/search?q=${encodeURIComponent(query)}`)
  .then(response => {
    console.log(response.data);
  })
  .catch(console.error);

```


### Receiving Data
The microservice responds with a JSON array of movie documents matching the title search. Example response:

```json
[
  {
    "title": "Perfect Days",
    "year": 2023,
    "runtime": 126,
    "genres": ["Drama"],
    "cast": ["Kōji Yakusho"],
    "plot": "A janitor in Tokyo leads a quiet life finding perfection in small daily routines.",
    "directors": "Wim Wenders"
  },
]
```

If no match: returns []

If error: returns 500 with { error: "Server error" }

If query is missing: returns 400 with { error: "Query parameter q is required" }


### UML Sequence Diagram

<img width="1488" height="2224" alt="image" src="https://github.com/user-attachments/assets/3cf89d0a-4763-4eb2-9f53-d0c04d7c7e06" />




