#!/bin/bash

mysql -h "localhost" -u "neardleadmin" "-p1186Sammy!" "neardlesessions" < "clear.sql" | grep -v 'mysql: [Warning] Using a password on the command line interface can be insecure.'
