# Sprint 2 - t23 - Team Dave

## Goal

### A mobile, responsive map and itinerary!
### Sprint Leader: Sam Westra

## Definition of Done

* Sprint Review and Restrospectives completed (sprint2.md).
* Version in pom.xml should be `<version>2.0.0</version>`.
* Increment deployed for demo and testing.
* Increment release `v2.0` created on GitHub with appropriate version number and name.


## Policies

#### Test Driven Development
* Write method headers, javadoc, unit tests, and code in that order.
* Unit tests are fully automated.
#### Configuration Management
* Code adheres to Google style guides for Java and JavaScript.
* Code Climate maintainability of A or B.
* Always check for new changes in master to resolve merge conflicts locally before committing them.
* All changes are built and tested before they are committed.
* All commits with more than 1 line of change include a task/issue number.
* All pull requests include tests for the added or modified code.
* Master is never broken.  If broken, it is fixed immediately.
#### Continuous Integration
* Continuous integration successfully builds and tests all pull requests for master branch.
* All Java dependencies in pom.xml.  Do not load external libraries in your repo. 


## Plan

*An introductory paragraph describing what you expect to accomplish this sprint with a list of epics that will achieve the goal.*

* #75 User: I want a map and itinerary for my trip: I plan trips in the state of Colorado in another tool. The tool produces a file that conforms to the TFFI trip object. The trip is always a round trip. Show me a map and itinerary for the trip in the file that I can view on my phone.
* #71 User: I want to supply my own units for the distances: I should be able to define an arbitrary unit of measure to use in the itinerary.
* #81 TripCo: All clients and servers must interoperate: Each client must include a configuration option to change to server:port used for RESTful services
* #82 TripCo: The solution must be responsive for mobile devices: The solution should be designed/optimized for a mobile environment, but still work well in a desktop environment.
* #79 All code shall be clean!: Review all teammates code to be clean and consistent.

* We decided to have Sam work on user-defined units because he's already familiar with the distance class. Abby will work on displaying the map because she spent time researching the task and seems to have the most clear understanding of the work needed.  Josette will work on the planning tool, which will need to interact with Abby's work. Because they will both be gone during deployment week, they will be working to finish earlier, so it's best that the collaborative elements are going at the same pace. Le will work to add a configuration option to allow interoperability between client and server. We want all of our members to practice clean code and will review each other. Likewise, all UI tasks will be done with consideration for mobile interface and reviewed by teammates.


## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | 5 | *value* |
| Tasks | 7 | *value* | 
| Story Points | 13 | *value* | 

*Enter the `# Planned` at the beginning of the sprint, `# Completed` at the end of the sprint.*


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 9/14 | 0 | 4 | n/a | 
| 9/17 | 0 | 4 | n/a |
| 9/19 | 0 | 4 | n/a |

## Review

*An introductory paragraph describing the overall results of the sprint.*

#### Completed epics in Sprint Backlog 

*Describe the solution based on the completed epics and list the epics below.*

* *## epic title: comments*
* 

#### Incomplete epics in Sprint Backlog 

*Describe capabilities not included in the release and list the epics below with an explanation.*

* *## epic title: explanation*
*

#### What went well

*Describe what went well during the sprint in general terms followed by a more detailed list.*

* *something*
*

#### Problems encountered and resolutions

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

*Articulate at the end of the sprint.  Focus on one of things you need to work on.*
