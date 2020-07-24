# gitapi-search-repositories
About
This is a sample GIT repository search RESTAPI

How to run?

Configure:
>API context: src/config/congif.json
>basecontext
>path

MongoDB:
>url

Run:
>$ npm install

>$ npm start

API:

>User Login:
Method: post
>/gitapi/validateuser

API expect JSON packet with parameters:      
>username
>password
(For admin use username : admin)
(For users use username : agent1 , agent2)

Response -- status 200 with json packet username, userid, jwttoken

Search Git repository:
Method: post
>/gitapi/searchrepo

API Expect:
>headers- authorization
>body : sch, sch2, link, userId

Response: Status 200  with JSON packet

Admin Reports:
>/gitapi/reports
>Method: post
API Expect:
>headers- authorization

Response: Status 200  with JSON packet


Test:
> npm install mocha --g


Run:
> mocha


