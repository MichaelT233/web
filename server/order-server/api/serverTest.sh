baseUrl="http://localhost/cart";
curl -X POST "${baseUrl}/create/test"
printf "\n"
curl "${baseUrl}/read/test"
printf "\n"
curl -X PUT "${baseUrl}/additem/test/0000/2"
printf "\n"
curl "${baseUrl}/read/test"
printf "\n"
curl -X PUT "${baseUrl}/inc/test/0000"
printf "\n"
curl "${baseUrl}/read/test"
printf "\n"
curl -X PUT "${baseUrl}/dec/test/0000"
printf "\n"
curl "${baseUrl}/read/test"
printf "\n"
curl -X PUT "${baseUrl}/deleteitem/test/0000"
printf "\n"
curl "${baseUrl}/read/test"
printf "\n"
curl -X DELETE "${baseUrl}/delete/test"
printf "\n"