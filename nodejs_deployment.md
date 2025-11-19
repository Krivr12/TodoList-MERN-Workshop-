# Instructions

1. Verify that Node and Git is installed with `node --version` and `git --version`
2. Install PM2 globally with `sudo npm install -g pm2` - verify if installed correctly, `pm2 --version`
3. Go to `/home/bitnami` and clone your repository with `git clone <your-repo-url>`
4. Go inside your project directory and go inside the backend directory to install node modules

    ```bash
    cd TodoList-MERN-Workshop-
    cd backend
    npm install
    ```

5. Create a .env file with `nano .env` and input the following

    ```bash
    MONGO_URI=
    PORT=

    UPSTASH_REDIS_REST_URL=
    UPSTASH_REDIS_REST_TOKEN=
    ```

6. Go to the frontend directory to install node modules and build the frontend files

    ```bash
    cd ../frontend
    npm install
    npm run build
    ```

7. Go back to your backend directory and serve your frontend from there using the `src/server.js` file and PM2

    ```bash
    sudo pm2 start src/server.js --name "todoapp"
    sudo pm2 save
    sudo pm2 startup
    ```

8. Check the logs for your application to make sure it's running correctly

    ```bash
    sudo pm2 logs todoapp
    ```

## Notes

- Change the content of `/backend/src/server.js`
- Learn more about PM2 to explain it further as well as other CLI commands
- Make sure to enable port 5001 in Lightsail instance Networking tab
- Access the app with port number on the public ipv4 address
- Study about the changes in the `/backend/src/server.js`
- Update the baseUrl in `frontend/src/axios.js`
- If there are changes in FE, re-run `npm run build`. If there are changes in BE, re-run `sudo pm2 restart todoapp`

## If you want port 80

- Stop apache `sudo /opt/bitnami/ctlscript.sh stop apache`
- Restart app `sudo pm2 restart todoapp`
