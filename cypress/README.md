#### Running tests ####

To run all tests just write in CLI this command 'npx cypress run' or 'npx cypress open' to open cypress.


#### Failing test in login.spec.js ####

One of created tests are failing. It has been done by purpose because according to test scenarios one case does not work at all and needs to be fixed. Test was done for the future to verify if fix has been done properly.


#### About the solution ####

I have decided to use aversion of Component Object Pattern in my project structure. I know that it is not the only possible way but I think it is good approach for small projects like this.

In my daily work I would also consider adding few data-test-id locators to the components but I assumed that I have no permission/possibilty to do this in this project. That is why I have not done it but I believe it would make this tests easier to maintenance in the future.


#### Manual tests and bugs found ####

All found bugs have been reported on github in project issues.

Bugs which are not reported because I assumed it is only a project for technical verification and we can skip this kind of issues:
* hardcoded username and password
* missing logout feature