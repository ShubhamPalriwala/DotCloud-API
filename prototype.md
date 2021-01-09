## Tech Stack
- Typescript
- Mongo

## Tables:

### User:
- uid 
- username
- email
- password
- isVerified

### Project:

- uid
- puid
- projname
- projtoken
- createdAt
- updatedAt

### KeyValue:
- puid
- uid
- key
- value
- createdAt
- updatedAt

## Routes:

### User:
- POST /signup
- POST /login

### Project:
- POST /project
- PUT /project
- DELETE /project
- POST /puid/keyvalue
- PUT /puid/keyvalue
- GET /projtoken

Query Params:
```
key:
- keyname

type: 
- JSON
- CSV 
- Array
```


