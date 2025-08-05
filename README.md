# 🎬 Microservice A – Movie Search API

This is a Node.js + Express microservice that connects to a MongoDB database and allows clients to search for movie titles using a REST API.

---

## 📡 Communication Contract

### 🔹 Requesting Data

To request movie data, your program must send a `GET` request to the following endpoint:

http://localhost:3000/search?q=YourMovieTitle

- **Query parameter**: `q` (movie title substring, case-insensitive)
- **Example call (Node.js using Axios):**

```
const axios = require('axios');
const query = "Children";

axios.get(`http://localhost:3000/search?q=${encodeURIComponent(query)}`)
  .then(response => {
    console.log(response.data); // array of matching movie documents
  })
  .catch(console.error);

```


### 🔹 Receiving Data
The microservice responds with a JSON array of movie documents matching the title search. Example response:

```
json
Copy
Edit
[
  {
    "_id": "64abc123...",
    "title": "Children of Men",
    "year": 2006,
    "genres": ["Action", "Drama", "Sci-Fi"]
  },
  ...
]
If no match: returns []

If error: returns 500 with { error: "Server error" }

If query is missing: returns 400 with { error: "Query parameter q is required" }
```

