Iteration 1 / 2 / 3

Members: Judy Wang, Yingying Feng

App Introduction: 
SpiritFlow provides you with valuable insights, guiding you through life's challenges through tarot cards reading. Uncover key words and thought-provoking questions that will help you navigate your day.
In addition, our app goes beyond readings and offers personalized movie recommendations to boost your luck and inner peace, letting you embrace a journey of self-discovery and reflection through our journaling feature, allowing you to monitor your energy flows over time.



Contributions:
Create React Native components to represent the functionality of the app we are building, designed and implemented the SignUp, Login page, Authentification as well as the User Profile page, including the camera function in user profile page, desined and implemented the styles for the app(Contributed by Yingying), designed and implemented the Home, Journal, AddNewJournal, Discovery page, firestore Database, and the map location function as well as the notification function(Contributed by Judy). Worked on other files together.

Contributions for Iter3:

Judy:
   - Work on the notification function;
   - Add a linear graph in the Journal Page
   - Add icons for buttons on buttom tab

Yingying:
   - Design and improve the overall appearance of the app
   - Add logout button on every single page so that user can logout anytime they want without going back to home page.


Iteration divided:
- External API use (Iter1)
- Authentication (Iter1)
- Camera use (Iter2)
- Location use(Iter2)
- Notification (Iter3)

==================================================================================================================

Firestore Database:
In our Firestore database, we've created two primary data collections: "Tarot Cards" and "Users," with an additional sub-collection under "Users" aptly named "Journals."
The rationale behind placing the "Journal" collection under the "User" collection is to establish a clear association between each journal and its creator. This ensures that when fetching an individual journal, the corresponding uid allows us to identify the user who created that specific journal. 

-----Tarot Cards-----
-fields:

Fortune_telling (string)
img (string)
keywords (string)
name (string)
questions_to_ask (string)

-Utilization:
The "Tarot Cards" collection serves a dual purpose. Firstly, by fetching three cards daily, we dynamically display them on the "Home" page, providing users with insightful daily energy guidance. Secondly, the associated keywords are employed to retrieve movie suggestions from an external API, enhancing user experience.

-Status: Fully functioning

-----Users-----
-fields:

email (string)
fullName (string)
uid (string)
Sub-collection: "Journals"

-Utilization:
The "Users" collection is integral to our system. The unique uid acts as the key to fetch individualized journals for each user, presenting detailed information on the "Journal" screen. Additionally, this identifier will later facilitate the retrieval of journal locations for the "discovery" page.

-CRUD Operations:
addUser(user)
deleteUser(uid)
editUser(uid, updatedUser)

-Status: Fully functioning

-----Journals (Sub-collection under User)-----
-fields:

date (timestamp)
energyRating (integer)
negativeThoughts (string)
positiveThoughts (string)


-Utilization:
This sub-collection is pivotal for users to create and manage their journals. The fields within the "Journal" collection are employed during the creation of a new journal on the "Add New" page. Users can input their positive and negative thoughts, select an energy rating, and seamlessly add a new journal to their collection.

-CRUD Operations:

addJournal(uid, journal)
deleteJournal(userId, journalId)
editJournal(journalId, updatedJournal)

-Status: Fully functioning

==================================================================================================================

External API use

Our application leverages the OMDb API (https://www.omdbapi.com/) to fetch movie recommendations based on keywords generated from three tarot cards. 

API key: 2e27f579
Append following to all of our API requests:
OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=2e27f579


The process involves the following steps:

Keywords Generation:
The application generates keywords from three tarot cards, such as "confession," "passion," and "suspicion."

Movie Retrieval:
The movieService module takes these keywords as parameters, forming a search query for movies.

Random Movie Selection:
Upon successful retrieval of movie data, the application checks if movies are found (data.Search is truthy and has length > 0).
If movies are available, it randomly selects one movie from the search results.

User Interaction:
Users can initiate this process by clicking the "Daily Movie for Divine Energy" button.

Displaying Results:
The selected movie is then displayed to the user, providing an entertaining and divinely inspired movie recommendation.

-Status: Fully functioning

==================================================================================================================

Camera use

In the user profile page, the camera icon in the page allows user to click and take a picture as user profile picture. Users are allowed to retake pictures if they are not satisfied with current picture.

-Status: Fully functioning

==================================================================================================================

Location use

In the "Add New Journal" feature, location services play a crucial role in enriching the user experience. The process is as follows:

Location Options:
Users are presented with two location options:
"Locate Me": Retrieves the real-time location of the user.


Integration with Firestore:
The chosen location information is then incorporated into the journal object before being stored in the Firestore database.

The 'Discovery' screen offers a panoramic view of journals created by users, each uniquely marked by location pins. The pins, distinguished by colors, discreetly reveal the energy level (ranging from black for level 1 to red for level 5) associated with each journal. This curated glimpse into shared experiences maintains user privacy by anonymously displaying only the energy levels and fake user names at specific locations, fostering a sense of community without divulging detailed journal content.

-Status: "Locate Me" Fully functioning

==================================================================================================================

Notification

In Home Page, the button "CLick for Daily Inspiration at 9AM!" allows users to click to set and receive reminder at daily 9 a.m..

-Status: Fully functioning
==================================================================================================================



ScreenShot:
1. Signup
   ![Signup 10 42 14 AM](https://github.com/judywangyq/spirit_flow/assets/97942454/664f8a14-2471-4665-bb96-4dc65b4b7375)
   ![Signup2](https://github.com/judywangyq/spirit_flow/assets/97942454/a88a485f-abd4-4ff5-b986-bb4f3a94d820)


2. SignIn
   ![SingIn](https://github.com/judywangyq/spirit_flow/assets/97942454/d01c7076-2d17-4568-af07-ff3b52d816e6)
   ![SignIn2](https://github.com/judywangyq/spirit_flow/assets/97942454/bdf336af-406d-41b3-8019-41a02aedb5b2)



3. Home (with notification)
   ![Home 2 13 25 PM](https://github.com/judywangyq/spirit_flow/assets/97942454/affe58e9-aaa4-4673-88cc-fc61f3d5015c)
   ![Home2 2 13 25 PM](https://github.com/judywangyq/spirit_flow/assets/97942454/4f1282bd-ed6f-4ce3-9209-8e2d80e1d92f)
   ![Home3 2 13 25 PM](https://github.com/judywangyq/spirit_flow/assets/97942454/aa85b3e1-6a19-4097-84f9-39c703fd7041)
   ![Home4 2 13 25 PM](https://github.com/judywangyq/spirit_flow/assets/97942454/ad7fd413-4116-4e32-8cc8-6fd9dd7eba4b)
   ![Home notification](https://github.com/judywangyq/spirit_flow/assets/97942454/c9216750-e7db-4502-a46f-530e979a868d)
   ![Notification Screenshot](https://github.com/judywangyq/spirit_flow/assets/97942454/4987b697-21b0-49c3-bd59-1d9da14cbb98)

5. UserProfile (with camera)
   ![UserProfile 2 13 25 PM](https://github.com/judywangyq/spirit_flow/assets/97942454/756c6273-d173-404c-bc2e-ca65ac553058)
   ![UserProfile2 2 13 25 PM](https://github.com/judywangyq/spirit_flow/assets/97942454/6e752657-ef4a-4f90-b345-97626ff7716f)
   ![Camera1](https://github.com/judywangyq/spirit_flow/assets/97942454/6a672381-80b2-4978-9322-c0ad9174758f)
   ![Camera2](https://github.com/judywangyq/spirit_flow/assets/97942454/f1bc05fa-515f-4160-b754-a0bfe6d54cf4)
   ![Camera3](https://github.com/judywangyq/spirit_flow/assets/97942454/bb830fc8-9d34-48e8-b6b5-4364c6ca5167)


6. Journal
   ![Journal 2 13 25 PM](https://github.com/judywangyq/spirit_flow/assets/97942454/cb44aa6b-cf43-475e-bf3e-a11f2d3e33a1)


7. AddNewJournal (with location)
   ![AddNewJournal 2 13 25 PM](https://github.com/judywangyq/spirit_flow/assets/97942454/666e3670-f347-4efc-8e0e-ccf34b0c8a37)
   ![AddNewJournal2 2 13 25 PM](https://github.com/judywangyq/spirit_flow/assets/97942454/a388c651-1fc5-4729-bd60-7a08a5ef944b)


9. Discovery
   ![Discovery](https://github.com/judywangyq/spirit_flow/assets/97942454/100955bd-b1e1-444f-b3c1-aeb81beadb8c)

   



