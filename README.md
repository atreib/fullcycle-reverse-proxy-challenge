# Reverse Proxy Challenge

## Steps

- First of all, we created our `docker-compose.yaml` file
- The first service to be set up was the mysql service
  - I started by creating a basic MySQL container and executing bash in it
  - Manually, I've created a database and table (and stored this queries on `database/migrations/setup.sql`)
  - Also, I had to give privileges and alter the root user password through our `setup.sql` file too
  - When I noticed that my MySQL service was up and running, I did a little research to learn how to automatically run a SQL file right after my database goes online
    - That was done by setting the volume: `./database/migrations/setup.sql:/docker-entrypoint-initdb.d/setup.sql`
- The second service to be set up was the node.js service (aka backend)
  - I've started by writing our application without using Node in my environment
    - I've created a node container with the `--rm` flag, with a volume mapping to my `/backend/src` folder and executing bash
    - After starting a new project with yarn, installing express and mysql libraries and writing our basic software, everything was mapped to our folder, so I killed this container
  - With our source code done, I created our backend Dockerfile (very default)
  - To sync our backend service with our database startup, I've used Dockerize
    - The set up of Dockerize can be found on its docs, the same for the dockerize command that we're running as our ENTRYPOINT
  - Just to check if our connection (MySQL x Node.js) was working properly, I'd added a `ports` property on our backend service, mapping its 3000 to my host 3000 (and accessing it to debug)
- The last service to be set was nginx, who is going to be our reverse proxy
  - I've started by creating our nginx Dockerfile (very default too, just a FROM, ENTRYPOINT and CMD, as its docs show)
  - Then, I've added the nginx service to our docker compose, forwarding the port 80 to our host's port 80
  - Another run to check if everything's working properly and voilá, the nginx default page opened in my host
  - With that, the last thing to be done was changing nginx settings to work as a reverse proxy, forwarding the requests to our nginx service and showing the response
    - This one was resolved through the beautiful art of google! The settings file can be found at `nginx/conf/default.conf`, overriding the `default.conf` from nginx
