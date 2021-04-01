# OAuth JWT

### how your app collaborates with OAuth provider

- OAuth is a standard that allows an app to access data from a third-party without providing credentials directly

[https://en.wikipedia.org/wiki/List_of_OAuth_providers](https://en.wikipedia.org/wiki/List_of_OAuth_providers)

### steps

1. redirect your app to OAuth login page (github, google, etc...)
2. Handle redirect from OAuth server
3. use code from OAuth server to POST a request to special auth token endpoint
4. get the auth token from the response
5. send the auth token in subsequent requests, either through the header or cookies

### JWT

- sections
1. header — type of token, signature algo

    ```jsx
    {"typ": "JWT", "alg": "HS256"}
    ```

2. payload —  data we want to store in the jwt
3. signature — header + payload + secret are hashed

### advantages of jwt

1. self-contained
2. scalability