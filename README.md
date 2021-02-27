# Web Project - Covid-19 mental health
**AFKS group**
Rania FEKIH - Anis KHALILI - Nouamane AZZOUZI - Yury SILVESTROV-HENOCQ

**Demo deployment link**
https://priceless-euclid-ede6dd.netlify.app/

## How to start the project
Run the following commands to start the backend:

    $ git clone https://github.com/si5-web-project/covid19-visualization
    $ cd covid19-visualization/backend
    $ npm install
    $ npm run start
    
Open a new terminal in covid19-visualization folder and run the following commands to start the frontend:

    $ cd frontend
    $ npm install
    $ npm run start

(to run backend tests):

    $ cd backend
    $ npm run start
    $ npm run test
  
  ## Who did what
  **Rania** :
  - Contact form
  - Graph page of a region
  - New cases data parsing and saving it in database
  - Creation of an API allowing to get new cases statistics

 **Anis** :
  - Authentication page
  - Display mode "List"
  - Mental health data parsing and saving it in database
  - Creation of an API allowing to get mental health statistics
  - Backend tests

 **Nouamane** :
  - Dark/light theme
  - Creation of an API allowing to get current cases in the world
  - Component displaying current cases in the world which refreshes every minute
  - Heroku project deployment

 **Yury** :
 - Date slider
 - Display mode "Map"
 - Region color variation based on the number of cases
 - Dynamic smiley representing mental health in the region
 - User's region detection
 
