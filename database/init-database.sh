#!/bin/sh
set -e

echo "${POSTGRES_DB}-app"

mysql -uroot --database "$MYSQL_DATABASE" -pexample <<-EOSQL
  GRANT FILE ON *.* TO 'book-browser'@'%';
EOSQL