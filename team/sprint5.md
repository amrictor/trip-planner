# Sprint 5 - t23 - Team Dave

## Goal

### Wrap It Up!
### Sprint Leader: Josette Grinslade

## Definition of Done

* Sprint Review and Restrospectives completed (sprint5.md).
* Version in pom.xml should be `<version>5.0.0</version>`.
* Increment deployed for demo and testing as server-5.0.jar on the production server.
* Increment release `v5.0` created on GitHub with appropriate version number and name.
* Epics and Tasks updated in Zenhub.


## Policies

#### Test Driven Development
* Write method headers, javadoc, unit tests, and code in that order for all methods/functions.
* Unit tests are fully automated.
* Code coverage is at least 50%, 70% preferred.
#### Clean Code
* Code Climate maintainability of A or B.
* Code adheres to Google style guides for Java and JavaScript.
#### Configuration Management
* Always check for new changes in master to resolve merge conflicts locally before committing them.
* All changes are built and tested before they are committed.
* All commits with more than 1 line of change include a task/issue number.
* All pull requests include tests for the added or modified code.
* All tests pass.
* Master is never broken.  If broken, it is fixed immediately.
#### Continuous Integration / Delivery
* Travis successfully builds and tests on all pull requests for master branch.
* All Java dependencies in pom.xml.  Do not load external libraries in your repo. 
* All pull requests are deployed on the development server.
* The development server is never broken.  If broken, it is fixed immediately.


## Plan

For this final sprint we expect to wrap up our project. We will complete things that we did not in the last sprint,
specifically letting the user choose which attributes to display on the intinerary. We plan to complete the new features
added this sprint like 3-opt, concurrency on the server and an interactive map. We will clean up our code, our UI and write
extensive tests for the front and backend.

*Include any design diagrams prepared during sprint planning (user interface, component diagram, component/state/hierarchy, etc.) with a short paragraph for each.

Server diagram:
![Server](https://github.com/csu18fa314/t23/blob/master/Resources/SP5/sp5server.jpeg)

Epics planned for this sprint.

* 334 User: I want trip planning to be fast.
* 332 User: I want the shortest maps possible.
* 331 User: Make the system easier to use.
* 330 User: I want an interactive map.
* 128 TripCo: All code must be tested
* 228 User: I want to view my trip in other tools.
* 333 User: I want to know who to thank for this application
* 227 User: I want to choose what information is displayed in the itinerary and map.


## Metrics

| Statistic | Planned | Completed |
| --- | ---: | ---: |
| Epics | 8 | *total* |
| Tasks |  18   | *total* | 
| Story Points |  35  | *total* | 

*Enter the `# Planned` at the beginning of the sprint.  Include a discussion of planning decisions based on the planned number of story points versus how many were completed in previous sprints.*

*Enter the `# Completed` at the end of the sprint.  Include a discussion about any difference in the number planned versus completed tasks and story points.*


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 11/12 | 0 | 0 | n/a |
| 11/16 | 0 | 2 | n/a |
| 11/26 | 1 | 2 | n/a |
| 11/28 | 2 | 4 | n/a |
| 11/30 | 6 | 3 | n/a |
| 12/3 | 7 | 3 | n/a  |
| 12/5 | 8 | 2 | n/a |

## Review

*An introductory paragraph describing the overall results of the sprint.*
For our final and fifth sprint our team complete several epics and tasks assigned to us. We completed our tasks from the last sprint and improve our user interface. We implemented more features to filter by in our search, like countries, on the server and front end, created an interactive map for our users, stopped real time planning, created filters for viewing the intinerary, implemented 3-opt, and finally installed tests for the server and client. 

#### Completed Epics in Sprint Backlog 

*Describe the solution based on the completed epics and list the epics below.*

* #227 User: I want to choose what information is displayed in the itinerary and map.
* #332 User: I want the shortest trips possible.
* #331 User: Make the system easier to use.
* #330 User: I want an interactive map.

#### Incomplete Epics in Sprint Backlog 

*Describe capabilities not included in the release and list the epics below with an explanation.*

* #334 User: I want trip planning to be fast.
* #128 Tripco: All code must be tested.
* #228 User: I want to view my trip in other tools.

#### What Went Well

*Describe what went well during the sprint in general terms followed by a more detailed list.*

Our team succesfully create a functional and intuitive website for our users. We were succesful implement 3-opt and creating an interface that was easy to use, especially our search, intinerary and tabs. We also were able to implement more testing for client and server side. This was a great improvement from last sprint, our code coverage went up. 

#### Problems Encountered and Resolutions

*Describe what problems occurred during the sprint in general terms followed by a more detailed list.*

This sprint went relatively smoothly, but it being the last sprint there was a lot that need to be done. We spent a lot of time refactoring the code and making sure we tie up loose ends. 

## Retrospective

*An introductory paragraph for your retrospective.*
After a long and tiring sprint our team was able to complete our sprint with a product that we are proud of. We succesfully collaborated together to finish the sprint with something that we are all happy with. We struggled to stay on top of communication at times but our team worked very well together this sprint.

#### What we changed this sprint

*Articulate specifically what you will do differently based on the retrospective from the previous sprint before the sprint starts.*
We worked on our product consistently this sprint which we had failed to do well in our past sprints. We improved our communication and also worked together on some tasks to create our finished product. We also broke up epics into more tasks with smaller estimates so that we could incremently develop better.

#### What we did well

*Articulate what went well at the end of the sprint.*
We succesfully worked together to complete our final product that is fuctional and aesthetically pleasing.

#### What we need to work on

*Articulate things you could improve at the end of the sprint.*
We need to work on making sure that we work on our tasks daily so that when it comes to the deadline we are not trying to still get things together.

#### What we will change next sprint 

*Articulate the one thing you will change for the next sprint and how you will accomplish that.*
Even though this is our last sprint, if we were to continue working, on the next sprint we would want to change the code that needs to be clean and to make sure that our tests are extensive enough. 
