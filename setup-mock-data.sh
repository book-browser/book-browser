cat ./src/main/resources/data.sql | docker exec -i book-browser /bin/sh -c "mysql --database=book-browser -ubook-browser -pchangeit"

