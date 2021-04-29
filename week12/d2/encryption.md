# cryptography / authentication

### encryption methods

- symmetric encryption
    - we use a single key for both encryption / decryption
- assymetric encryption
    - we use a public / private key combination for the purpose of encryption / decryption
- hashing
    - produce same length result
    - lossy, meaning the process is irreversible
    - good hashing algos are slow
        - PBKDF2, bcrypt, Argon2

### authentication vs. authorization

- authentication is the who (login)

- authorization is the what (what privileges does user have)

*// typical assymetric encryption*

*// 1. user makes initial request to the server*

*// 2. server responds with a public key*

*// 3. any subsequent requests to the server will be encrypted with this public key*

*// 4. server uses the private key to decrypt data*

# Go through the crypto and bcrypt files
* make sure to place these files in the breaddit project and go over them with students.  the files can be found in the crypto:auth folder 
* make sure that you give a high level over view of what base 64 encoding is

# Start breaddit auth
* make sure that you add a hashedPw column to the users table
* talk about what the heck a cookie is.
* setup the session module that will allow you to create a cookie
* finish auth for project