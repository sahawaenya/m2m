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
