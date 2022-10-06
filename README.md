## API Documentation

List of Available Endpoints:

- `POST /admin/login`
- `GET /categories`
- `POST /categories` (Need Authorization : superadmin)
- `PUT /categories/:categoryId` (Need Authorization : superadmin)
- `DELETE /categories/:categoryId` (Need Authorization : superadmin)
- `GET /admins` (Need Authorization : superadmin)
- `POST /admins` (Need Authorization : superadmin)
- `DELETE /admins/:adminId` (Need Authorization : superadmin)
- `GET /schedules`
- `POST /schedules` (Need Authorization : admin)
- `PUT /schedules/:scheduleId` (Need Authorization : admin)
- `DELETE /schedules/:scheduleId` (Need Authorization : admin)
- `POST /login`
- `POST /register`
- `PATCH /verifyUser`
- `GET /events` (Need Authorization : user)
- `GET /events/:eventId` (Need Authorization : user)
- `PATCH /events/:eventId` (Need Authorization : user)
- `POST /events`  (Need Authorization : user)

- Auth Controller (Refaldy)
- Category Controller (Inez)
- Admin Controller (Refaldy)
- Schedule Controller (Khansa)
- Event Controller (Mirza)

### POST /admin/login

#### Description

- Login superadmin & admin

#### Request :

- Method : POST
- Body :

```json

{
  "username": "string",
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

### GET /categories

#### Description

- Fetch all categories

#### Request :

- Method : GET

#### Response :

200 - OK

```json
[
  {
    "id" : "integer",
    "name": "string"
  }
]
```

### POST /categories

#### Description

- Create new category

#### Request :

- Method : POST
- Header :
    - access_token : string
- Body :

```json

{
  "name": "string"
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