# Receipt Processor
## Solution
This solution is implemented in Deno + typescript.
As specified in the challenge I've created a docker image to run the server.
   
By default server runs on port 8000.

For the database I'm using the built-in in memory KV-store Deno provides.


## Steps to run:
1. Build the docker image.
  ```bash
  docker compose -f docker-compose.yml build 
  ```
2. Run the image using  `docker composer up`

## Testing
I've written test cases for each of the point calculation rules, and also implemented the examples provided as testcases.
To run the tests,
1. Open a shell into the container.
   
   ```docker exec -it [container_id] bash```
2. Run: ` deno test`
   