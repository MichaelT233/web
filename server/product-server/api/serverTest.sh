# test script for the product service rest api routes
baseUrl="http://localhost/product";
curl "${baseUrl}/item/0000"
printf "\n\n"
curl -g "${baseUrl}/many/'0000','0004','0019'"
printf "\n\n"
curl "${baseUrl}/category/Beauty"
printf "\n\n"
curl "${baseUrl}/featured"
printf "\n\n"
curl "${baseUrl}/search/chair"
printf "\n\n"