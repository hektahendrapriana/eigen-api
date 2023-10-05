# api-v2

This project : [API UPSCALE](https://github.com/hektahendrapriana/upscale).

### `git clone https://github.com/hektahendrapriana/eigen-api.git `

After finish, go to folder and then run this :

### `npm install`

Wait until installations finish and then
> **copy to .env**

*   NODE_ENV="development"
*   PORT=8080
*   JWT_SECRET="7D6425FAC26477182B78C8F2F39CE"
*   JWT_EXPIRATION_IN_MINUTES=1440
*   MONGO_URI="mongodb://localhost:27017/eigen?directConnection=true"
*   BECKEND_URL=http://localhost:8080/api
*   USE_REDIS=false
*   REDIS_HOST=127.0.0.1
*   REDIS_PORT=6379
*   MJ_API_KEY="a45126939c9654f1ee368d2203ad5d10"
*   MJ_API_SECRET="fdd85cd7b7edb1afb50eebfbc563169a"


## Available Scripts

In the project directory, you can run for development:

### `npm run dev`

Runs the app in the development mode.\

### `npm start`

Runs the app in the production mode with compability pm2.\


Open [http://localhost:8080/eigen-api/members](http://localhost:8080/eigen-api/members) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Parameters

### `filter and fields`
This parameters can be use for search data.\
filter : keywords you want to search.\
fields : name of field(s) you want to search (array fields separate by comma).\

example : http://localhost:8080/eigen-api/members?filter=an&fields=name

### `sort and order`
This parameters can be use for sorting results.\
sort : name of field.\
order : 1 for asc and -1 for desc.\

example : http://localhost:8080/eigen-api/members?filter=an&fields=name&sort=name&order=1

### `page and limit`
This parameters can be use for limit and pagination.\
limit : number of limit (format Number).\
page : page you want to select (format Number).\

example : http://localhost:8080/eigen-api/members?filter=an&fields=name&sort=name&order=1&limit=100&page=1



Open [http://localhost:8080/eigen-api/books](http://localhost:8080/eigen-api/books) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Parameters

### `filter and fields`
This parameters can be use for search data.\
filter : keywords you want to search.\
fields : name of field(s) you want to search (array fields separate by comma).\

example : http://localhost:8080/eigen-api/books?filter=har&fields=title,author

### `sort and order`
This parameters can be use for sorting results.\
sort : name of field.\
order : 1 for asc and -1 for desc.\

example : http://localhost:8080/eigen-api/books?filter=har&fields=title,author&sort=title&order=1

### `page and limit`
This parameters can be use for limit and pagination.\
limit : number of limit (format Number).\
page : page you want to select (format Number).\

example : http://localhost:8080/eigen-api/books?filter=har&fields=title,author&sort=title&order=1&limit=100&page=1


Open [http://localhost:8080/eigen-api/borrows](http://localhost:8080/eigen-api/borrows) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Parameters

### `filter and fields`
This parameters can be use for search data.\
filter : keywords you want to search.\
fields : name of field(s) you want to search (array fields separate by comma).\

example : http://localhost:8080/eigen-api/borrows?status=Borrow

### `sort and order`
This parameters can be use for sorting results.\
sort : name of field.\
order : 1 for asc and -1 for desc.\

example : http://localhost:8080/eigen-api/borrows?status=Borrow&sort=_id&order=1

### `page and limit`
This parameters can be use for limit and pagination.\
limit : number of limit (format Number).\
page : page you want to select (format Number).\

example : http://localhost:8080/eigen-api/borrows?status=Borrow&sort=_id&order=1&limit=100&page=1


### `COLLECTIONS`
Collections MongoDB on folder collections DB

Collections POSTMAN on folder POSTMAN COLLECTIONS


## Use Case

- Members can borrow books with conditions
    - [ ]  Members may not borrow more than 2 books
    - [ ]  Borrowed books are not borrowed by other members
    - [ ]  Member is currently not being penalized
```tsx
POST http://localhost:8080/eigen-api/borrows/
body data: 
{
  "member_id": "651bf3753dc51a979f9b6db0",
  "book_id": "651bf3423dc51a979f9b6da8"
}
```
- Member returns the book with conditions
    - [ ]  The returned book is a book that the member has borrowed
    - [ ]  If the book is returned after more than 7 days, the member will be subject to a penalty. Member with penalty cannot able to borrow the book for 3 days

```tsx
PATCH http://localhost:8080/eigen-api/borrows/651de5a6ca218dc724cb5129
if you want using manual date, put the body data :
{
  "returnDate": "2023-10-08"
}
but if you not set the body data, date will get from today
```
- Check the book
    - [ ]  Shows all existing books and quantities
    - [ ]  Books that are being borrowed are not counted

```tsx
GET http://localhost:8080/eigen-api/books/available
```
- Member check
    - [ ]  Shows all existing members
```tsx
GET http://localhost:8080/eigen-api/members/
```
    - [ ]  The number of books being borrowed by each member

```tsx
GET http://localhost:8080/eigen-api/borrows/?status=Borrow
```
