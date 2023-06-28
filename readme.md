Application is deployed at Render.  https://e-school-dx1a.onrender.com/

I  design and develop this application using ReactJS for the frontend, NestJS for the backend, and PostgreSQL as the database management system (DBMS). I used Boostrap for stylng components.

The purpose of this application is to assist teachers in monitoring and managing their classes by providing features such as grade tracking, homework management, student notes, and class administration. Here's an overview of the application's functionality:

Ensure that your PostgreSQL database is properly set up and the connection details are provided in the backend's .env file. The .env file should include the necessary information, such as the database host, port, username, password, and database name. Make sure the backend can access the database using the provided credentials.

Additionally, if your frontend requires an API key for any external services, you can include it in a .env file in the frontend directory. For example, if you have a API_KEY that needs to be used in your frontend code, you can include it in the .env file like this:
```
API_KEY=your_api_key_here
```

Remember to add the .env file to your .gitignore file to prevent sensitive information from being committed to your version control system.

Make sure to replace "your_api_key_here" with the actual API key you need to use in your frontend.

Once everything is set up, you should be able to access the frontend at http://localhost:3000 and the backend at http://localhost:4000, allowing teachers to use the application and students to access their respective features.

Features:

User Registration and Authentication:

Professors can register themselves by providing their details (name, email, password, etc.).
After registration, a confirmation email is sent to the professor's email address.
The professor needs to confirm the email to proceed with authentication.
Authentication will be implemented using JWT (JSON Web Tokens) for secure access to protected endpoints.

Class Management:

Professors can create new classes by providing class details (name, city, etc.).
Multiple teachers can be associated with the same class.
Each class will have a unique identifier.

Student Management:

Professors can add students to their classes by providing student details (name, email, etc.).
Before adding students, professors must register the class they belong to.
Multiple professors can add students to the same class.
Each student will have a unique identifier.

News Management:

Professors can post news updates in the form of text or uploaded files.
News updates will be displayed to the students in their respective classes.
Students will be able to view the news updates on the application's dashboard.

Grade Tracking:

Professors can assign grades to students for their assignments, exams, etc.
Students will be able to view their grades for each class on their dashboard.

Homework Management:

Professors can upload homework assignments or test results for students to download.
Students can access and download the homework assignments for their respective classes.

Student Notes:

Professors can add notes about students, such as performance, behavior, etc.
Students will be able to view their respective notes on their dashboard.

Communication:

Students will have the option to send emails to their professors through the application.
Professors will receive the emails in their registered email address.

By implementing these features using ReactJS for the frontend, NestJS for the backend, and PostgreSQL as the DBMS, the application will provide an efficient and user-friendly platform for teachers to monitor and manage their classes effectively.