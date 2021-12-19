
## Routes

| HTTP Method | URL                | Request Body                               | Success status  | Error status  | Description       |
| ----------- | ------------------ | ----------------------------------------- | --------------- | ------------- | ------------------ |
| POST        | `/signUp`          | {email, password,role}                    | 201             | 400           | Checks if fields not empty and user not exists, then create user with encrypted password, and store user in session   |
| POST        | `/login`           | {userName, email, password}               | 201             | 404           | Checks if fields not empty  and user not exists, and if password matches (404), then stores user in session           |
| POST        | `/logout`          | {empty}                                   | 200             | 400           | logout the user               |
| GET         | `/getAllUsers`     |                                           | 200             | 400           | Get all users                 |
| POST        | `/addPost`         | {title, images, description, isDel, date} | 201             | 400           | service provider create posts|
| PUT         | `/updPost`         | {title, images, description}              | 200             | 400           | service provider edit post                   |
| DELETE      | `/delPost`         | {empty}                                   | 200             | 400           | service provider delete post               |
| GET         | `/getAllPosts`     |                                           | 200             | 400           | all get all posts         |
| GET         | `/getOnePost`      |  {id}                                     | 200             | 400           | all get one post by id    |
| POST        | `/createRole`      |  {role, permission}                       | 201             | 400           | create role (admin, service provider, users|
| GET         | `/getRoles`        |                                           | 200             | 400           | admin get all roles    |
| POST        | `/addComment`      | {Post, user, isDel}                       | 201             | 400           | add Comment   |
| PUT         | `/updComment`      | {id}                                      | 200             | 400           | update Comment   | 
| DELETE      | `/delComment`      | {id}                                      | 200             | 400           | delete Comment   | 
| GET         | `/getComment`      |                                           | 200             | 400           | Get all comments   | 
| POST        | `/like`            | {post, user}                              | 201             | 400           | Add like   | 
| Post        | `/follow`          | {from, to}                                | 200             | 400           | follow user  | 
 

## UML Diagram:

still doing it ....


## Models

- roles model

| key        | type   | options          | default value |
| -----------| ------ | ---------------- | ------------- |
| role       | String | required, unique | n/a           |
| permission | Array  | required         | n/a           |



- user model

| key        | type            | options          | default value |
| ---------- | --------------- | ---------------- | ------------- |
| userName   | String          | required, unique | n/a           |
| email      | String          | required, unique | n/a           |
| password   | String          | required         | n/a           |
| role       | Schema <role>   | required         | n/a           |
| avatar     | string          | required         | n/a           |
| follwing   |                 | required         | n/a           |
| followers  |                 | required         | n/a           |
| isDel      | Boolean         | n/a              | false         |

  
- post model

| key        | type            | options          | default value |
| ---------- | --------------- | ---------------- | ------------- |
| Title      | String          | required         | n/a           |
| Images     | Array           | required         | n/a           |
| Description| String          | required         | n/a           |
| isDel      | Boolean         | n/a              | false         |
| Date       | new Date        | required         | n/a           |
| user       | Schema <user>   | required         | n/a           |
  

- comment model 
  
| key        | type            | options          | default value |
| ---------- | --------------- | ---------------- | ------------- |
| Post       | Schema <post>   | required         | n/a           |
| Description| String          | required         | n/a           |
| isDel      | Boolean         | n/a              | false         |
| Date       | new Date        | required         | n/a           |
| user       | Schema <user>   | required         | n/a           |
  
  
- ratting model 
  
| key        | type            | options          | default value |
| ---------- | --------------- | ---------------- | ------------- |
| Post       | Schema <post>   | required         | n/a           |
| user       | Schema <user>   | required         | n/a           | 
  
- Like model 
  
| key        | type            | options          | default value |
| ---------- | --------------- | ---------------- | ------------- |
| Post       | Schema <post>   | required         | n/a           |
| user       | Schema <user>   | required         | n/a           |

## ER Diagram:
  
![ERD drawio (3)](https://user-images.githubusercontent.com/92248041/146686377-5d3bdcae-3d76-4c84-be3c-9be02dc71666.png)

 ## Links:
https://trello.com/b/p0lIavji/mprawanbadr

## Client Repo:
https://github.com/MP-Project-Rawan-Badr/client

## Slides:
The url to your presentation slides

## Deploy:

