# DotCloud

## TechStack

- Typescript
- Postgres

## Features

- Authentication [2 layer]
- Create Organisation
    - Invite People
    - Custom Key Access
    - Permission Revoke
- Create Project
    - IP Blocking
    - CRUD Keys
    - Project Token

## Tables

1. User [uid]
    1. Username
    2. Password
    3. Email
    4. Phone
2. Organisations [oid]
    1. Owner - uid
    2. Name
    3. Collaborators - [uid]
3. Projects [pid]
    1. uid
    2. oid
    3. Collaborators - [uid]
    4. token
4. Key Value
    1. puid
    2. uid
    3. collaborators - uid
    4. key
    5. value
5. Deadline
    1. uid
    2. kuid
    3. deadline

## Routes

1. Authentication
2. Project
    1. CRUD Project
    2. Invite Peeps → Email
    3. Add Keys
    4. Edit Access
3. Organisations
    1. CRUD Org
    2. Invite Peeps → Email
    3. CRUD Project
4. Keys
    1. Fetch Key/Keys 
    2. Fetch Full keys
    3. CRUD
