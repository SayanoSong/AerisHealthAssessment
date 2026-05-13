### C1:

Checking connection by:
GET https://api.xero.com/connections
Authorization: "Bearer " + access_token
Content-Type: application/json

### C2:

First, check if the request format is correct.
Then, check if there are network errors (ERROR_CONNECTION_RESET or Time Excess)
Next, check the response code, if the code is 400, there may be High volume threshold limit issues according to the Document, and C5 answer for 429. (https://developer.xero.com/documentation/api/accounting/invoices).
Moreover, the number of parameters or the URL's length may also cause the request failure. (https://developer.xero.com/documentation/api/accounting/requests-and-responses)

### C3:

GET https://api.xero.com/api.xro/2.0/Invoices
(I know there are many parameters available, just keep the answer clear.)

### C4:

GET https://api.xero.com/api.xro/2.0/Invoices/[identifier]

### C5:

If the invoice API returns 429, this can be classified into two situations based on the Xero documentation: the concurrent limit and the access limit. The backend can identify the specific reason by checking the X-DayLimit-Remaining, X-MinLimit-Remaining, and X-AppMinLimit-Remaining headers. If none of them have reached the limit, the reason should be the concurrent limit, and the backend can return the appropriate information to the user. If the minute limit or the daily limit has been reached, the backend can calculate and record the next accessible time using the data in the Retry-After HTTP header. If the user calls the API again for the same individual before the recorded time, the backend will respond quickly and may also save the App Minute Limit (if the failed request counts toward the App Minute Limit). Furthermore, if the App Minute Limit is reached, the position of the time record differs from that of the particular tenant access limit.
