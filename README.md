# gitapi-search-repositories
About
This is a sample GIT repository search RESTAPI

How to run?

Configure:
API context: src/config/congif.json--
basecontext
path

MongoDB--
url

$ npm install

$ npm start

API:

User Login:
/gitapi/validateuser

API expect JSON packet with parameters:      
username
password

Response -- status 200 with json packet username, userid, jwttoken

Search Git repository:
/gitapi/searchrepo

API Expect:
headers- authorization
body : sch, sch2, linkm userId

Response: Status 200  with JSON packet

Admin Reports:
/gitapi/reports
API Expect:
headers- authorization

Response: Status 200  with JSON packet


Test:
> npm install mocha --g
> mocha

