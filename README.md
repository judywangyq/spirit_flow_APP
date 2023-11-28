Iteration 1

Members: Judy Wang, Yingying Feng

App Introduction: 
SpiritFlow provides you with valuable insights, guiding you through life's challenges through tarot cards reading. Uncover key words and thought-provoking questions that will help you navigate your day.
In addition, our app goes beyond readings and offers personalized movie recommendations to boost your luck and inner peace, letting you embrace a journey of self-discovery and reflection through our journaling feature, allowing you to monitor your energy flows over time.



Contributions:
Create React Native components to represent the functionality of the app we are building, designed and implemented the SignUp, Login page, Authentification as well as the User Profile page(Contributed by Yingying), designed and implemented the Home, Journal, AddNewJournal, Discovery, and firestore Database(Contributed by Judy). Worked on other files together.




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



ScreenShot:
1. Signup
   <img width="436" alt="image" src="https://github.com/judywangyq/spirit_flow/assets/97942454/ea7e45d8-dbf7-4fe9-9149-0614d0405fa0">


   
2. SignIn
   <img width="410" alt="image" src="https://github.com/judywangyq/spirit_flow/assets/97942454/7ffe6965-a174-464d-8cfa-c97ffaf3c1d3">



3. Home
   <img width="424" alt="image" src="https://github.com/judywangyq/spirit_flow/assets/97942454/edd43070-b67d-4375-86c9-ca049e17daaa">
   
   <img width="423" alt="image" src="https://github.com/judywangyq/spirit_flow/assets/97942454/6ee162c4-1da0-47c2-b2b2-0235f68e18ce">
   
   <img width="417" alt="image" src="https://github.com/judywangyq/spirit_flow/assets/97942454/34f6953b-6791-41dd-bbeb-91b2661e605b">
   
   <img width="417" alt="image" src="https://github.com/judywangyq/spirit_flow/assets/97942454/9ca726fb-ea36-4ccb-9f80-198736822b48">



4. UserProfile
   <img width="432" alt="image" src="https://github.com/judywangyq/spirit_flow/assets/97942454/6e05e5da-df60-496a-97b0-ffaa85cd68d6">
   
   <img width="422" alt="image" src="https://github.com/judywangyq/spirit_flow/assets/97942454/9ae16d49-6f6f-4d1e-88f5-2551878440c3">



5. Journal
   <img width="415" alt="image" src="https://github.com/judywangyq/spirit_flow/assets/97942454/637676e5-69ee-4b2b-b663-bde9d8e6a5e5">


   
6. AddNewJournal
   <img width="432" alt="image" src="https://github.com/judywangyq/spirit_flow/assets/97942454/74a178da-4fdc-4a9f-8849-520c9a19b94b">
   
   <img width="412" alt="image" src="https://github.com/judywangyq/spirit_flow/assets/97942454/57c7d33b-1731-438c-82d8-b541cd5ec4f5">
   
   <img width="431" alt="image" src="https://github.com/judywangyq/spirit_flow/assets/97942454/aa897500-2744-4418-9078-a6726a0f4d6c">



7. Discovery
   <img width="426" alt="image" src="https://github.com/judywangyq/spirit_flow/assets/97942454/1abce4bb-11be-4cb1-a42b-497e722f4750">

   


