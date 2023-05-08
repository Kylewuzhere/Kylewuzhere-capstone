# capstone-23t2
Repo for Term 2 Capstone project 2023

## Connecting to the Database locally
The database for this project is hosted on Render, on the capstone-23t2@developersinstitute.co.nz account. Log in to render to see the database details.
Use the local database management tool pgAdmin to connect to the cloud hosted database. pgAdmin can be downloaded here: https://www.pgadmin.org/download/.
Once pgAdmin is downloaded, select "New Server". In the General tab, name it as you see fit. 
Now in the connection tab, complete the empty fields using the data from Render: 
```
Hostname/address: External Database URL (Change format from postgres://aaa:bbb@ccc.singapore-postgres.render.com/ddd to ccc.singapore-postgres.render.com) 
Port: Port
Maintenance database: Database
Username: Username
Password: Password
```

Once connected, you can locate the tables under "your-server-name" > Databases > structured_data > Schemas > Public > Tables.
