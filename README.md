# README for Thunder Client Collection: Sciflare

## Overview
This README provides information about the Thunder Client collection "Sciflare". This collection contains various API requests organized into folders for authentication, user management, and organization management. The collection is designed to help you test and interact with APIs efficiently.

## Collection Structure
The collection is divided into three main folders:

1. **Auth**
2. **User**
3. **Organization**

Each folder contains specific requests relevant to its category.

### Auth Folder
This folder contains requests related to authentication.

1. **Auth Signup**
   - **Method**: POST
   - **URL**: `{{baseurl}}/auth/signup`
   - **Description**: Registers a new user.
   - **Body**:
     ```json
     {
       "companyName": "Example Company",
       "firstName": "John",
       "lastName": "Doe",
       "email": "johndoe@example.com",
       "password": "examplePassword123"
     }
     ```

2. **Login**
   - **Method**: POST
   - **URL**: `{{baseurl}}/auth/login`
   - **Description**: Logs in a user and returns access and refresh tokens.
   - **Body**:
     ```json
     {
       "email": "johndoe@example.com",
       "password": "examplePassword123",
       "organizationId": "exampleOrganizationId"
     }
     ```
   - **Tests**: Sets environment variables for `accessToken`, `refreshToken`, `organizationId`, and `userId`.

3. **RefreshToken**
   - **Method**: POST
   - **URL**: `{{baseurl}}/auth/refresh`
   - **Description**: Refreshes the access token.
   - **Headers**:
     ```json
     {
       "Authorization": "Bearer <your-token>"
     }
     ```

### User Folder
This folder contains requests related to user management.

1. **Get User**
   - **Method**: GET
   - **URL**: `{{baseurl}}/users/?organizationId=exampleOrganizationId`
   - **Description**: Retrieves users based on the organization ID.

2. **Create User**
   - **Method**: POST
   - **URL**: `{{baseurl}}/users/`
   - **Description**: Creates a new user.
   - **Body**:
     ```json
     {
       "organizationId": "{{organizationId}}",
       "firstName": "Jane",
       "lastName": "Doe",
       "email": "janedoe@example.com",
       "password": "examplePassword123"
     }
     ```

3. **Update User**
   - **Method**: PATCH
   - **URL**: `{{baseurl}}/users/exampleUserId`
   - **Description**: Updates user details.
   - **Body**:
     ```json
     {
       "firstName": "Jane",
       "lastName": "Doe",
       "email": "janedoe@example.com",
       "password": "examplePassword123"
     }
     ```

4. **Get By Id**
   - **Method**: GET
   - **URL**: `{{baseurl}}/users/exampleUserId`
   - **Description**: Retrieves a user by ID.

5. **Delete User**
   - **Method**: DELETE
   - **URL**: `{{baseurl}}/users/exampleUserId`
   - **Description**: Deletes a user.

### Organization Folder
This folder contains requests related to organization management.

1. **Get Organization**
   - **Method**: GET
   - **URL**: `{{baseurl}}/organization/exampleOrganizationId`
   - **Description**: Retrieves organization details by ID.

2. **Patch Org**
   - **Method**: PATCH
   - **URL**: `{{baseurl}}/organization/exampleOrganizationId`
   - **Description**: Updates organization details.
   - **Body**:
     ```json
     {
       "companyName": "New Example Company"
     }
     ```

## Global Settings
- **Authorization Header**:
  ```json
  {
    "name": "Authorization",
    "value": "Bearer {{accessToken}}"
  }

## How to Use
1. Import the Collection: Open Thunder Client in VS Code, and import the Sciflare collection.
2. Set Base URL: Replace {{baseurl}} with the actual base URL of your API.
3. Set Environment Variables: Configure environment variables for accessToken, refreshToken, organizationId, and userId as required.
4. Execute Requests: Run the requests in the specified order to test the different API endpoints.

## Contact
For any issues or questions regarding this collection, please contact [aghilanbaskar@gmail.com](mailto:aghilanbaskar@gmail.com).
