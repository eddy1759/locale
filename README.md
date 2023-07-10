# Locale

This is a RESTful API built with Node.js and Express, which provides location data, specifically for regions, states and local governments in Nigeria.

This API uses a database of location data and a caching mechanism for better performance.

## Prerequisites

Node.js and npm installed on your local machine.

- I have hosted it on: Render : https://api-locale.onrender.com
- api documentation: https://api-locale.onrender.com/api-docs/

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/eddy1759/locale.git
   ```

2. Navigate into the project directory:

```bash
    cd locale
```

3. Install dependencies by running the following command:
   ```bash
   npm install
   ```
4. change the example.env as .env and populate file with required credentials

   ```bash
   mv example.env
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

---

## API Documentation

This section should provide information about the API endpoints and their usage.

1. **Get Regions**: `api/location/regions`

   Fetches the data of a specific region or all regions if no region name is provided. You can also specify whether you want to include Local Government Areas (LGAs) by setting the `lga` query parameter to `true`.

2. **Get States**: `api/location/states`

   Fetches the data of a specific state or all states if no state name is provided. You can also specify whether you want to include Local Government Areas (LGAs) by setting the `lga` query parameter to `true`.

3. **Get States By Id**: `api/location/states/:id`

   Fetches the data of a specific state according to the number/id. You can also specify whether you want to include Local Government Areas (LGAs) by setting the `lga` query parameter to `true`.

4. **Get Local Government**: `api/location/lga`

   Fetches the data of a specific or all local government.

5. **Get Distinct States**: `api/location/states/all`

   Fetches names of the states.

6. **Get Distinct Region**: `api/location/regions/all`

   Fetches names of the region.

7. **Register User**: `POST api/register`

   Registers a users.

8. **Login User**: `POST api/login`

   Login a users.

9. **Generate ApiKey**: `POST api/apiKey/`

   Generate a new apiKey for authenticated users.

10. **DELETE ApiKey**: `api/apiKey/`

Delete apiKey for authenticated users.

---

#### API USAGE

**POST /api/register**

_Description:_ Register a new user.
**Request Body:**

```
{
    "username": "example",
    "email": "example@example.com",
    "password": "password"
}
```

**Response:**

```
{
  "message": "Register Successfully"
}
```

---

**POST /login**

_Description:_ Login with existing user credentials.
**Request Body:**

```
{
  "email": "example@example.com",
  "password": "password"
}
```

**Response:**

```
{
  "status": true,
  "message": "User logged in successfully, Save the apiKey as you will only see it once",
  "token": "token",
  "apiKey": "apiKey"
}
```

The API uses session token for login authorization and an apiKey as request parameter for authorization, so you have to include your API key in the request params as follows:

```
?apiKey=`${apiKey}`
```

Here is an example of how to use the API:

**Request:**

```
GET locations/state?state_name=Abia&apiKey=${apiKey}
```

**Response:**

```
{
   "region": "South East",
   "state": "Abia",
   "capital": "Umuahia",
   metadata: {
      "slogan": "God's Own State",
      "landmass": "6,320 km2 (2,440 sq mi)",
      "population": "2,833,999",
      "dialect": "Igbo",
      "latitude": "5.524913",
      "longitude": "7.494296",
      "created_date": "27 August 1991",
      "created_by": "General Ibrahim Babangida",
   },
   "lgas": [
      "Aba North",
      "Aba South",
      "Arochukwu",
      "Bende",
      "Isuikwuato",
      "Osisioma-Ngwa",
      "Obioma-Ngwa",
      "Ohafia",
      "Ikwuano",
      "Umu-Nneochi",
      "Isiala Ngwa South",
      "Isiala Ngwa North",
      "Ugwunagbo",
      "Ukwa West",
      "Ukwa East",
      "Umuahia South",
      "Umuahia North"
   ],
}
```

---

## Contributing

If you would like to contribute to this project, please feel free to fork the repository, create a feature branch, and open a Pull Request!

---

## Contact

If you have any questions about this project, please feel free to open an issue or directly contact the project owner by accessing his [profile](https://github.com/eddy1759)

---
