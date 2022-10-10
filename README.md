## API Documentation

List of Available Endpoints:

- `GET /matches`
- `GET /matches/matchId`
- `POST /matches/:matchId/join`
- `GET /matches/:matchId/participants`
- `PATCH /matches/:matchId/participants/:participantId`
- `GET /categories`

### GET /matches

#### Description

- Get all matches

Available Query Params

| Name     | Description                                                       |
|----------|-------------------------------------------------------------------|
| userId   | Get all matches based on given user id                            |
| status   | Get all matches based on approval status (0: pending, 1:approved) |
| location | Get all matches based on given location                           |
| category | Get all matches based on given category id |

> **_NOTE:_**  If you are using status then the userId is required.

#### Request :

- Method : GET
- Headers :
    - access_token : "string"

#### Response :

200 - OK

```json
[
  {
    "id": "integer",
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
    "UserId": "integer",
    "FieldId": "integer",
    "createdAt": "date",
    "updatedAt": "date",
    "Category": {
      "id": "integer",
      "name": "string",
      "image": "string"
    }
  }
]
```

### GET /matches/:matchId

#### Description

- Get match detail based on given match id

#### Request :

- Method : GET
- Headers :
    - access_token : "string"

#### Response :

200 - OK

```json

{
  "id": "integer",
  "name": "string",
  "type": "integer",
  "location": "string",
  "date": "date",
  "capacity": "integer",
  "currentCapacity": "integer",
  "duration": "string",
  "description": "string",
  "Category": {
    "name": "string",
    "image": "string"
  },
  "Field": {
    "name": "string",
    "phoneNumber": "string",
    "location": "string",
    "image": "string",
    "price": "integer",
    "openHour": "string",
    "closeHour": "string"
  }
}
```

> **_NOTE:_**  If type is equal to 0 then Field supposed to be null.

### POST /matches/:matchId/join

#### Description

- Join match based on given match id

#### Request :

- Method : POST
- Headers :
    - access_token : "string"
- Params :
    - matchId : "integer"

#### Response :

200 - OK

```json
{
  "id": "integer",
  "MatchId": "integer",
  "UserId": "integer",
  "status": "integer",
  "updatedAt": "date",
  "createdAt": "date"
}
```

400 - Bad Request

```json
{
  "message": "string"
}
```

### GET /matches/:matchId/participants

#### Description

- Get all pending participants based on given match id

#### Request :

- Method : POST
- Headers :
    - access_token : "string"
- Params :
    - matchId : "integer"

#### Response :

200 - OK

```json
[
  {
    "id": "integer",
    "MatchId": "integer",
    "UserId": "integer",
    "status": "integer",
    "updatedAt": "date",
    "createdAt": "date",
    "User": {
      "name": "string",
      "bio": "string"
    }
  }
]
```

### PATCH /matches/:matchId/participants/:participantId

#### Description

- Change joined user status

#### Request :

- Method : PATCH
- Headers :
    - access_token : "string"
- Params :
    - matchId : "integer",
    - participantId: "integer"

- Body :

```json
{
  "status": "integer"
}
```

| Status | Description |
|--------|-------------|
| 1      | Approved    |
| 2      | Rejected    |

#### Response :

200 - OK

```json
{
  "message": "string"
}
```

### GET /categories

#### Description

- Get all categories

#### Request :

- Method : GET

#### Response :

200 - OK

```json
[
  {
    "id": "integer",
    "name": "string",
    "image": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

### Global Error

#### Response :

401 - Unauthorized

```json
{
  "message": "Unauthorized"
}
```

403 - Forbidden

```json
{
  "message": "Forbidden"
}
```

500 - Internal Server Error

```json
{
  "message": "Internal Server Error"
}
```