Installera mysql databas som en dockercontainer:
docker run --name xw_mysql -e MYSQL_ROOT_PASSWORD=matsxw -e 'MYSQL_ROOT_HOST=%' -e MYSQL_DATABASE=xwdb -e MYSQL_USER=user -e MYSQL_PASSWORD=password -p 3306:3306 -d mysql:latest

Klona ned projektet från github:
git clone https://github.com/mhema42/exam_work_2.git

backend:
öppna projektet som klonades i vscode
i vscode skapa en mapp i roten som ska heta .vscode
i den mappen skapar du en fil som heter launch.json
i filen du skapat klistrar du in nedanstående kod

{
   // Use IntelliSense to learn about possible attributes.
   // Hover to view descriptions of existing attributes.
   // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
   "version": "0.2.0",
   "configurations": [
       {
           "type": "java",
           "name": "Launch Current File",
           "request": "launch",
           "mainClass": "${file}"
       },
       {
           "type": "java",
           "name": "Launch XworkApplication",
           "request": "launch",
           "mainClass": "com.example.xwork.XworkApplication",
           "projectName": "xwork",
           "env": {
               "DB_PASSWORD": "password"
           }
       }
   ]
}

öppna exempelvis mappen entity i src/main/java
välj någon av entiteterna och kör java projektet

frontend:
öppna ett terminalfönster
gå till mappen frontend och kör: npm install
efter installationen kör: npm start