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
| Epics | 5 | 2 |
| Tasks | 7 | 7 | 
| Story Points | 13 | 14 | 

*Enter the `# Planned` at the beginning of the sprint, `# Completed` at the end of the sprint.*


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 9/14 | 0 | 4 | n/a | 
| 9/17 | 0 | 4 | n/a |
| 9/19 | 0 | 4 | n/a |
| 9/21 | 3 | 1 | n/a |
| 9/24 | 7 | 0 | n/a |

## Review

*An introductory paragraph describing the overall results of the sprint.*

#### Completed epics in Sprint Backlog 

*Describe the solution based on the completed epics and list the epics below.*

* All code shall be clean:
The code is clean. Lots of time were spent to make sure the code works.

* Error Handling:
The code is error-free. Lots of time were spent to make sure the code works.
#### Incomplete epics in Sprint Backlog 

*Describe capabilities not included in the release and list the epics below with an explanation.*

* User:I want a map and itinerary for my trip:
5 of 6 Issues completed and 11 of 13 Epic Points completed. This Epic came very close to completed. Itinerary and map for uploaded file is the only task left to be done. While file has been successfully uploaded to the server, implementation on opening the file, reading it and return output has yet to complete.

* User: I want to supply my own units for the distances:
80% of this Epic is done (additional user input box, dedicated variables when user choose this unit, calculation part according to user measurements input). An additional window should pops up prompting user to enter measurements to complete this Epic.

* TripCo: All clients and servers must interoperate:
70% completed. Port can be taken in as user input; there is also decicated field for it implied in the program. It is still needed to intergrate this registered port to RESTful services. The description for this Epic is pretty vague so the representation was mostly decided internally (input taken as string? What about security? How about group-button toggle? Is there any limitation in number of ports?...)

* TripCo: The solution must be responsive for mobile devices:
The solution might or might not be responsive for mobile devices. It is not stated how black box could be accessed through mobile devices to test this.


#### What went well

*Describe what went well during the sprint in general terms followed by a more detailed list.*

* Half of our team's power was lost during the last week of this Sprint due to valid reasons previously explained with instructors. All of Team Dave members still worked very hard to get in what they possibly can given the time they had. The team members who were away did not have access to a computer, but still regularly checked in to help. It is clear that teamwork positivity played a major role getting the group through this difficult Sprint.

#### Problems encountered and resolutions

*Describe what problems occurred during the sprint in general terms followed by a more detailed list.*

* As the Sprints went on, it is clear that the group is struggling to adapt to new tools being introduced in class (JS, ReactJS, Travis, etc.). Dave noticed this and reached out for a group meeting, which we appreciate, but will be postponed until the rest of the group get back; In the future, team Dave will make more proactive steps to reach out for help from instructors to combat these problems. Team members also should not be shy away from saying "I don't know how to do [...]" and let others help filling in the gap. In case no member has acquired knowledge for such task, everybody can go to office hour/ set up an appointment together.

## Retrospective

*An introductory paragraph for your retrospective.*

* Team Dave has grown accustomed to each member of the group, teamworking and course work during last month. Team communication and cooperation has improved as members are becoming more willing to step out and speak up about what they can and cannot do. We have had problems with vague instructions in the past, but we found the solutions: discuss internally and ask questions.

#### What we changed this sprint

*Articulate specifically what you will do differently based on the retrospective from the previous sprint before the sprint starts.*
We started a lot earlier this Sprint knowing that we would lose half of our power this week. Slack has become Team Dave's main method of communication, notification pops up every single day.

#### What we did well

*Articulate what went well at the end of the sprint.*
This Sprint was rough, but we got through it together.

#### What we need to work on

*Articulate things you could improve at the end of the sprint.*
Team Dave is pretty skewed right now in term of expertise. Sam has stepped up as a leader for this Sprint and successfully took on many fields outside of his comfort zone. Abby has been naturally good with presetup work (ZenHub, bot, repo admin). JoJo knows InteliJ better than the rest of the group. Le is naturally better at debugging codes and ReactJS (basically spending hours reading tutorials). We are pretty well-rounded together but each member should try to share their knowledge so each member can grow overall.

#### What we will change next sprint 

*Articulate at the end of the sprint.  Focus on one of things you need to work on.*
Team Dave should get everybody catch up on all the tools currently being presented in class, make sure everybody is comfortable with all of them.
