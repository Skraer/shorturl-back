Запуск бекенда
```
npm run start:test
```

***************************
Эндпоинты  

- POST api/v1/register

body:
```
{
  login: string
  password: string
}
```
return:
```
{
  _id: string,
  login: string,
  password: string
}
```
(Выдаст ошибку, если логин уже зарегистрирован)
***************************
- POST api/v1/login

body:
```
{
  login: string
  password: string
}
```
return:
```
{
  _id: string,
  login: string,
  password: string
}
```
(выдаст ошибку при неверном пароле, или несуществующем логине)
***************************
- GET api/v1/users

return:
```
{
  _id: string
  login: string
}[]
```
***************************
- GET api/v1/short/all

return:
```
{
  _id: string
  hash: string
  createdAt: string
  origin: string
}[]
```
***************************
- GET api/v1/short/:hash

return:
```
{
  _id: string
  hash: string
  createdAt: string
  origin: string
}
```
***************************
- GET api/v1/short/id/:id

return:
```
{
  _id: string
  hash: string
  createdAt: string
  origin: string
}
```
***************************
- POST api/v1/short

body:
```
{
  origin: string
}
```
return:
```
{
  _id: string
  hash: string
  createdAt: string
  origin: string
}
```
***************************
- PUT api/v1/short/update-hash/:id

return:
```
{
  _id: string
  hash: string
  createdAt: string
  origin: string
}
```
***************************
- PUT api/v1/short/update-origin/:id

body:
```
{
  origin: string
}
```

return:
```
{
  _id: string
  hash: string
  createdAt: string
  origin: string
}
```
***************************
- DELETE api/v1/short/:id

return:
```
{
  _id: string
  hash: string
  createdAt: string
  origin: string
}
```
