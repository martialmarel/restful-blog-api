## Request
curl -i "http://localhost:3000/"

## GET /posts
curl -i "http://localhost:3000/posts"

## POST /posts
curl -i -X "POST" "http://localhost:3000/posts" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "name": "laborum laboriosam ut",
  "url": "http://mathéo.org",
  "text": "Tempora voluptatem dolorem et nihil."
}'

## PUT /posts/postId no data
curl -i -X "PUT" "http://localhost:3000/posts/33" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{}'

## PUT /posts/postId with data
curl -i -X "PUT" "http://localhost:3000/posts/1" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "url": "fake.com"
}'

## DELETE /posts/postId
curl -i -X "DELETE" "http://localhost:3000/posts/0" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{}'

## GET /posts/postId/comments
curl -i "http://localhost:3000/posts/0/comments" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{}'

## PUT /posts/postId/comments/commentId
curl -i -X "DELETE" "http://localhost:3000/posts/0/comments/3" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "text": "toto"
}'

## POST /posts/postId/comments
curl -i -X "POST" "http://localhost:3000/posts/0/comments" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "text": "Enim qui magnam laboriosam iure."
}'

## PUT /posts/postId/comments/commentId
curl -i -X "PUT" "http://localhost:3000/posts/0/comments/3" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "text": "toto"
}'
















