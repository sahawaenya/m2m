- `POST /login`
- `POST /register`
- `GET /fields`
- `POST /matches `
- `DELETE /matches/:matchId`

### POST /login

#### Description

- Login user

#### Request :

- Method : POST
- Body :

```json
{
  "email": "string",
  "password": "string"
}
```

#### Response :

200 - OK

```json
{
  "access_token": "string"
}
```

401 - Unauthorized

```json
{
  "message": "string"
}
```

### POST /register

#### Description

- Register user

#### Request :

- Method : POST
- Body :

```json
{
  "email": "string",
  "password": "string",
  "name": "string",
  "bio": "string"
}
```

#### Response :

201 - OK

```json
{
  "message": "string"
}
```

400 - Bad Request

```json
{
  "message": "string"
}
```

### GET /fields

#### Description

- fetch fields data

#### Request :

- Method : GET

#### Response :

200 - OK

```json
{
  "id": "string",
  "name": "string",
  "phoneNumber": "string",
  "location": "string",
  "image": "string",
  "price": "integer",
  "CategoryId": "integer",
  "status": "integer",
  "openHour": "string",
  "closeHour": "string",
  "createdAt": "date",
  "updatedAt": "date",
  "Category": "object"
}
```

### POST /matches

#### Description

- Create new match

#### Request :

- Method : POST
- Headers:

```json
{
  "access_token": "string"
}
```

- Body :

```json
{
  "name": "string",
  "location": "string",
  "date": "date",
  "CategoryId": "integer",
  "capacity": "integer",
  "currentCapacity": "integer",
  "status": "integer",
  "duration": "string",
  "type": "integer",
  "description": "string",
  "FieldId": "integer"
}
```

#### Response :

200 - OK

```json
{
  "message": "string"
}
```

400 - Bad Request

```json
{
  "message": "string"
}
```

401 - Unauthorized

```json
{
  "message": "string"
}
```

### DELETE /matches/:matchId

#### Description

- Delete match that created by user(only user who create match can delete particular match)

#### Request :

- Method : Delete
- Headers :

```json
{
  "access_token": "string"
}
```

#### Response :

200 - OK

```json
{
  "message": "string"
}
```

401 - Unauthorized

```json
{
  "message": "string"
}
```

404 - Not Found

```json
{
  "message": "string"
}
```
