
POST
invoices
http://{{IP-or-Domain}}/user/api/index.php/api/index/invoice
Get invoices from user portal

body:

json
{"page":1,"count":10,"sortBy":"id","direction":"desc"}
AUTHORIZATION
Bearer Token
Token
<token>

Body
urlencoded
payload
<text encrypted by CryptoJS>

Example Request
invoices Example
curl
curl --location -g 'http://{{IP-or-Domain}}/user/api/index.php/api/index/invoice' \
--data-urlencode 'payload=<text encrypted by CryptoJS>'
200 OK
Example Response
Body
Headers (14)
View More
json
{
  "current_page": 1,
  "data": [
    {
      "id": 2,
      "invoice_number": "2020-1-2",
      "type": "custom",
      "amount": "0.00",
      "description": null,
      "paid": 0,
      "created_by": 1,
      "created_at": "2020-09-24 11:21:45",
      "payment_method": null,
      "due_date": "2020-09-24 11:21:45"
    }
  ],
  "first_page_url": "http://192.168.240.122/user/api/index.php/api/index/invoice?page=1",
  "from": 1,
  "last_page": 1,
  "last_page_url": "http://192.168.240.122/user/api/index.php/api/index/invoice?page=1",
  "next_page_url": null,
  "path": "http://192.168.240.122/user/api/index.php/api/index/invoice",
  "per_page": 10,
  "prev_page_url": null,
  "to": 1,
  "total": 1
}
POST
Change Subscription
http://{{IP-or-Domain}}/user/api/index.php/api/service
Changes subscription of the user

encoded param:

json
{"new_service":"2","current_password":true}
Note: If the subscription is changed to the same subscription id, the response will be empty with a 200 Request code

AUTHORIZATION
Bearer Token
Token
<token>

Body
urlencoded
payload
<text encrypted by CryptoJS>

Example Request
Change Subscription Example
curl
curl --location -g 'http://{{IP-or-Domain}}/user/api/index.php/api/service' \
--data-urlencode 'payload=<text encrypted by CryptoJS>'
200 OK
Example Response
Body
Headers (14)
json
{
  "status": 200,
  "message": "rsp_service_change_success"
}




POST
Redeem code
http://{{IP-or-Domain}}/user/api/index.php/api/redeem
Get the available subscriptions from SAS4

encoded parameters:

json
{"pin":"136154"}
AUTHORIZATION
Bearer Token
Token
<token>

Body
urlencoded
payload
<text encrypted by CryptoJS>

Example Request
Redeem code Example
curl
curl --location -g 'http://{{IP-or-Domain}}/user/api/index.php/api/redeem' \
--data-urlencode 'payload=<text encrypted by CryptoJS>'
200 OK
Example Response
Body
Headers (14)
json
{
  "status": 200,
  "message": "rsp_success"
}
POST
Activate user subscription
http://{{IP-or-Domain}}/user/api/index.php/api/user/activate
Activate user subscription and deduct from balance

encoded params:

json
{"uuid":"edad62f6-d324-7510-8c6a-90a9b4a3fee2","current_password":true}
The uuid is a rate-limit mechanism generated from client-side using uuid/guid functions at the load time of client-side interface so that if a user clicks activate multiple times it would all be sent using the same uuid and thus wouldn't activate multiple times.

AUTHORIZATION
Bearer Token
Token
<token>

Body
urlencoded
payload
<text encrypted by CryptoJS>

Example Request
Activate user subscription Example
curl
curl --location -g 'http://{{IP-or-Domain}}/user/api/index.php/api/redeem' \
--data-urlencode 'payload=<text encrypted by CryptoJS>'
200 OK
Example Response
Body
Headers (14)
json
{
  "status": 200,
  "message": "rsp_success"
}
POST
Activate Subscription Extension
http://{{IP-or-Domain}}/user/api/index.php/api/user/extend
Adds an extension to the user extension from the available extensions and returns 200 on success

encoded params:

json
{"profile_id":"3","current_password":true}
AUTHORIZATION
Bearer Token
Token
<token>

Body
urlencoded
payload
<text encrypted by CryptoJS>

Example Request
Activate Subscription Extension Example
curl
curl --location -g 'http://{{IP-or-Domain}}/user/api/index.php/api/user/extend' \
--data-urlencode 'payload=<text encrypted by CryptoJS>'
200 OK
Example Response
Body
Headers (14)
json
{
  "status": 200,
  "message": "rsp_success"
}
POST
Change password
http://{{IP-or-Domain}}/user/api/index.php/api/user
NOTE: The functionality is bugged and a quick fix is incoming the next patch

Changes the password

encoded params:

json
{"key":"password","value":"1234","current_password":true}
where value is the new password.

AUTHORIZATION
Bearer Token
Token
<token>

Body
urlencoded
payload
<text encrypted by CryptoJS>

Example Request
Change password Example
curl
curl --location -g 'http://{{IP-or-Domain}}/user/api/index.php/api/user' \
--data-urlencode 'payload=<text encrypted by CryptoJS>'
200 OK
Example Response
Body
Headers (14)
json
{
  "status": 200
}



GET
Get Extensions
http://{{IP-or-Domain}}/user/api/index.php/api/extensions/2
Returns a full list of the available subscriptions extensions

AUTHORIZATION
Bearer Token
Token
<token>

Example Request
Get Extensions Example
curl
curl --location -g 'http://{{IP-or-Domain}}/user/api/index.php/api/extensions/2'
200 OK
Example Response
Body
Headers (14)
View More
json
{
  "status": 200,
  "data": [
    {
      "name": "extension test",
      "id": 3,
      "price": 10
    },
    {
      "name": "Extension test 2",
      "id": 4,
      "price": 100
    }
  ]
}

