# Sprint 3 - *t23* - *Team Dave*

## Goal

### Build shorter trips! Create an UI that can handle user creating their own trip from scratch.
### Sprint Leader: *Khanh Nguyen Le*

## Definition of Done

* Sprint Review and Restrospectives completed (sprint3.md).
* Version in pom.xml should be `<version>3.0.0</version>`.
* Increment deployed for demo and testing as server-3.0.jar.
* Increment release `v3.0` created on GitHub with appropriate version number and name.
* Epics and Tasks updated in Zenhub.
* Finish tasks from Sprint2 and create an interface on the client that succesfully lets the user build a trip from scratch. This should produce a visual representation of the trips with the option of making them shorter.


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
#### Continuous Integration
* Travis successfully builds and tests all pull requests for master branch.
* All Java dependencies in pom.xml.  Do not load external libraries in your repo. 


## Plan

Our last sprint was not succesful, so in this sprint our team plans to complete what was not completed in sprint 2. We also plan to complete most of the tasks in sprint 3 because we recognize that it is unrealistic to finish what needed to completed in sprint 2 and now sprint 3. We expect to easily implement the server portion of this sprint because that was completed in sprint 2. However, our team has a lot to catch up on on the client side. 

Server diagram: team/sprint3/image1.jpeg
Client diagram:
UI sketch:



Epics planned for this sprint.

* *## epic title: description*
* #130 User: I want to make and save changes to the trip:  would like to add or remove destinations.
I want to choose a different starting location.
I want to revers the order of the trip.
I want to find possible destinations so I can add them.
I want to save the changes I make to the trip.
* #129 User: I want my trips to be shorter: Use nearest neighbor to build a shorter trip.
* #127 User: I want to design a trip from scratch so I can stop using the other tool: Create an empty itinerary.
* #75 User: I want a map and itinerary for my trip: I plan trips in the state of Colorado in another tool. The tool produces a file that conforms to the TFFI trip object. The trip is always a round trip. Show me a map and itinerary for the trip in the file that I can view on my phone.
* #71 User: I want to supply my own units for the distances: I should be able to define an arbitrary unit of measure to use in the itinerary.
* #81 TripCo: All clients and servers must interoperate: Each client must include a configuration option to change to server:port used for RESTful services



## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | 9 | 0 |
| Tasks |  8   | 0 | 
| Story Points |  18  | 0 | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 10/1 | 0 | 0 | N/A | 
| 10/3 | 0 | 0 | N/A |
| 10/5 | 0 | 2 | N/A |
| 10/10 | 0 | 6 | N/A |
| 10/12 | 6 | 3 | N/A |
| 10/15 | 7 | 3 | N/A |

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
