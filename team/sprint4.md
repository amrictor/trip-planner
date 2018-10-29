# Sprint 4 - T23 - Team Dave

## Goal

### Interactive Maps and Shorter Trips!
### Sprint Leader: Abigail Rictor

## Definition of Done

* Sprint Review and Restrospectives completed (sprint4.md).
* Version in pom.xml should be `<version>4.0.0</version>`.
* Increment deployed for demo and testing as server-4.0.jar on the production server.
* Increment release `v4.0` created on GitHub with appropriate version number and name.
* Epics and Tasks updated in Zenhub.


## Policies

#### Test Driven Development
* Write method headers, javadoc, unit tests, and code in that order for all methods/functions.
* Unit tests are fully automated.
* Code coverage is at least 50%, 70% preferred.
#### Clean Code
* Code adheres to Google style guides for Java and JavaScript.
* Code Climate maintainability of A or B.
#### Configuration Management
* Always check for new changes in master to resolve merge conflicts locally before committing them.
* All changes are built and tested before they are committed.
* All commits with more than 1 line of change include a task/issue number.
* All pull requests include tests for the added or modified code.
* Master is never broken.  If broken, it is fixed immediately.
#### Continuous Integration / Delivery
* Travis successfully builds and tests all pull requests for master branch.
* All Java dependencies in pom.xml.  Do not load external libraries in your repo. 
* All pull requests are deployed on the development server.
* The development server is never broken.  If broken, it is fixed immediately.


## Plan

In Sprint 4, we plan to complete tasks that were not completed last sprint. 
This would include 2 opt, reversing a trip, removing items from a trip, choosing origin of the trip and testing for the front end.
For the server, we plan to write tests and update the tffi to include KML, filter for the search results, attributes and other API updates.
For the client, we plan to write tests, to implement filter buttons for search query and what is shown for plan, and to implement the KML map. 

Server diagram:
![Server](https://github.com/csu18fa314/t23/blob/master/Resources/SP4/serverdiagram.jpg)

Client Diagram:
![Client](https://github.com/csu18fa314/t23/blob/master/Resources/SP4/client%20diagram.jpg)

UI Sketch:
![UI](https://github.com/csu18fa314/t23/blob/master/Resources/SP4/UI%20SP4.jpg)



Epics planned for this sprint.

* *128 TripCo: All code must be tested: minimum 50% coverage, preferred 70% coverage*
* *129 User: I want my trips to be shorter: Use nearest neighbor to build a shorter trip.*
* *130 User: I want to make and save changes to the trip: I would like to add or remove destinations,I want to choose a different starting location, I want to reverse the order of the trip, I want to find possible destinations so I can add them, I want to save the changes I make to the trip.*
* *227 User: I want to choose what information is displayed in the itinerary and map: allow additional attribut/evalue pairs to be captured for destinations whether they are entered manually or obtained from a database; allow the user to select attributes to display in the itinerary, including the latitude and longitude.*
* *228 User: I want to view my trip in other tools: Use a mapping tool to draw the map and allow the user to zoom and pan; Let me save the map (svg or kml) to a file so I can view it in other tools.*
* *229 User: I want to plan trips worldwide: Use a new database that contains a list of destinations worldwide; Allow the user to filter search requests.*
* *230 User: I'd like even shorter trips: Use 2-opt to improve the nearest neighbor tours.*


## Metrics

| Statistic | Planned | Completed |
| --- | ---: | ---: |
| Epics | 8 | *total* |
| Tasks |  17   | *total* | 
| Story Points |  31  | *total* | 

*Enter the `# Planned` at the beginning of the sprint.  Include a discussion of planning decisions based on the planned number of story points versus how many were completed in previous sprints.*

*Enter the `# Completed` at the end of the sprint.  Include a discussion about any difference in the number planned versus completed tasks and story points.*


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 10/22 | 0 | 2 | N/A |
| 10/24 | 1 | 2 | N/A |
| 10/26 | 0 | 0 | N/A |
| 10/29 | 3 | 1 | N/A |

*Add a new row for the scrum session after each lecture. *

## Review

*An introductory paragraph describing the overall results of the sprint.*

#### Completed Epics in Sprint Backlog 

*Describe the solution based on the completed epics and list the epics below.*

* *## epic title: comments*
* 

#### Incomplete Epics in Sprint Backlog 

*Describe capabilities not included in the release and list the epics below with an explanation.*

* *## epic title: explanation*
*

#### What Went Well

*Describe what went well during the sprint in general terms followed by a more detailed list.*

* *something*
*

#### Problems Encountered and Resolutions

*Describe what problems occurred during the sprint in general terms followed by a more detailed list.*

* *something*
*

## Retrospective

*An introductory paragraph for your retrospective.*

#### What we changed this sprint

*Articulate specifically what you will do differently based on the retrospective from the previous sprint before the sprint starts.*

#### What we did well

*Articulate what went well at the end of the sprint.*

#### What we need to work on

*Articulate things you could improve at the end of the sprint.*

#### What we will change next sprint 

*Articulate the one thing you will change for the next sprint and how you will accomplish that.*
