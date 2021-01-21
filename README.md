This node app is all about creating ***user: (student and faculty)***, ***deliverables*** and ***subscriptions*** of the ***subject***.

**CURD** is made for every action.\
Logged in users should have *token* in their header.

Subjects can only be added by ***super admin*** users. For this token is mentioned in **config.js** file. *Later on we can replace this file by .env file.*

Sample photos can be uploaded by using **'/upload'** route with POST method. And then its *reference* is submitted inside user document under **sampleImages** field.

**NOTE: **Postman exported collection is attached with this project.