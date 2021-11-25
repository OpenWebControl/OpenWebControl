# OpenWebControl
> OpenWebControl is the first open source webhosting panel written in NodeJS, MySQL and Pterodactyl Panel

## What is OpenWebControl
OpenWebControl is the free and open source Direct Admin, cPanel and Plesk alternative

## Documontation
Check the [Wiki](../../wiki) here!

## Progress
- [ ] **Basic**
  - [x] Creating express webserver
  - [x] **Add config files**
      - [x] Basic Config
      - [x] MySQL Config
      - [x] Pterodactyl config
  - [x] Connect to MySQL
  - [ ] **API**
    - [ ] Auth / User
      - [x] Login
         - [x] Check user in database
         - [x] New session
         - [x] Send session ID to client
      - [ ] Logout
         - [ ] Delete session from database
         - [ ] Delete cookie from client
         - [ ] Redirect client to login page
      - [x] Check session
         - [x] Check if session is valid
         - [x] Delete session if expired
      - [ ] Change password
      - [ ] Change email
      - [ ] Get user details
      - [ ] Get user usage
     - [ ] **Files**
        - [ ] List files
        - [ ] Edit file
        - [ ] Create file
        - [ ] Delete files
        - [ ] New directory
        - [ ] Delete directory
        - [ ] Change permissions
     - [ ] **Emails**
        - [ ] List emails
        - [ ] New email
        - [ ] Delete email
     - [ ] **DataBases**
        - [ ] List databases
        - [ ] Add database
        - [ ] Delete database
- [ ] **Backend**
  - [ ] NGINX
      - [ ] Add proxy (to Pterodactyl container)
      - [ ] Remove proxy
      - [ ] Cron job to restart NGINX every hour
   - [ ] Pterodactyl
      - [ ] Add server
      - [ ] Delete server
      - [ ] Add user
      - [ ] Delete user


## Technologies used
- MySQL
- NGINX
- NodeJS
- Express
- Pterodactyl panel
