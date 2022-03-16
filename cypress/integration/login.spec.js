import LoginPage from '../utils/LoginPage';
import NewsPage from '../utils/NewsPage';
import Footer from '../utils/Footer';

describe('Verify login feature', () => {

    const username = Cypress.env("username")
    const password = Cypress.env("password")

    beforeEach(() => {
        cy.viewport('macbook-13');
        cy.visit('/');
    })

    it('Verify that it is not possible to login with wrong username and correct password and verify helper text for username input field.', () => {

        const loginPage = new LoginPage();

        //wrong username and correct password
        loginPage.login('pa55word', password);

        //verify helper text
        loginPage
            .verifyUserNameHelperText('Wrong username')
            
        loginPage
            .getPasswordHelperText().should('not.exist')

    })

    it('Verify that it is not possible to login with correct username and wrong password and verify helper text for password input field', () => {
        
        const loginPage = new LoginPage();

        //correct username and wrong password - too short password
        loginPage.login(username, 'pass');

        //verify helper text
        loginPage
            .getUserNameHelperText()
                .should('not.exist')
            
        loginPage
            .verifyPasswordHelperText('Minimum 8 characters length');

        //correct username and wrong password - proper length but wrong password
        loginPage.login(username, 'passwordtest');

        //verify helper text
        loginPage
            .getUserNameHelperText()
                .should('not.exist')
            
        loginPage
            .verifyPasswordHelperText('Password incorrect');
    })

    it('Verify if user can login with proper username and password', () => {
        
        const loginPage = new LoginPage();

        //correct user name and password
        loginPage.login(username, password);

        loginPage
            .verifyIfUrlIncludeProperPartAfterLogin('/news');

        const newsPage = new NewsPage();

        //verify if user is being logged and news are being displayed.
        newsPage
            .verifyIfNewsPageIsBeingLoadedProperly();

        newsPage
            .verifyNumberOfAllNewsLinks(24);

        //verify footer
        const footer = new Footer();

        footer
            .verifyFooterContent()
    })

    it('Verify if after refreshing the page user is still being logged in and all news are being displayed.', () => {
        const loginPage = new LoginPage();

        //correct user name and password
        loginPage.login(username, password);

        loginPage
            .verifyIfUrlIncludeProperPartAfterLogin('/news');


        //verify if news site is being opened after login
        const newsPage = new NewsPage();

        newsPage
            .verifyIfNewsPageIsBeingLoadedProperly();

        newsPage
            .verifyNumberOfAllNewsLinks(24);

        //reload the page
        cy.reload()

        //verify if user is still logged in.
        newsPage
            .verifyIfNewsPageIsBeingLoadedProperly();

        newsPage
            .verifyNumberOfAllNewsLinks(24);

    })
})



//to be done
/*
* split login.spec.js file into two files: login and news - done
* add untils/pages folder with two files for login and news locators (Page Object Pattern) - done
* add helpers with file which contains all functions - done
* add user name and password as global variables - done
* scenario 1.d to be done
* manual tests
* make sure that all tests are done properly
* write a note that normally i would use teh repo to add data test id but I decided to do this assuming that I do not have access to the code.
*/