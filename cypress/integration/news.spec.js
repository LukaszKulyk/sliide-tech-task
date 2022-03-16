import * as helpers from '../helpers/functions';
import Footer from '../utils/Footer';
import LoginPage from '../utils/LoginPage';
import NewsPage from '../utils/NewsPage';

describe('Verify news page after login.', () => {

    const username = Cypress.env("username")
    const password = Cypress.env("password")

    beforeEach(() => {
        cy.viewport('macbook-13');
        cy.visit('/');
    })

    it('Verify if user is able to see all news after login and in case there is internet connection.', () => {
        const loginPage = new LoginPage();

        loginPage.login(username, password);

        loginPage
            .verifyIfUrlIncludeProperPartAfterLogin('/news');


        //verify if news site is being opened after login
        const newsPage = new NewsPage();

        newsPage
            .verifyIfNewsPageIsBeingLoadedProperly();

        newsPage
            .verifyNumberOfAllNewsLinks(24);

        newsPage
            .verifyNumberOfAllNewsCardContents(24);

        newsPage
            .verifyNumberOfAllNewsCardImages(24);
    })

    it('Verify that in case of no internet connection proper message is being shown instead of news.', () => {

        //simulate no internet connection
        cy.intercept('GET', '*', {
            forceNetworkError: true
        }).as('noInternetConnection')

        const loginPage = new LoginPage();

        loginPage.login(username, password);

        const newsPage = new NewsPage();

        //verify if failed to load news message is being shown
        newsPage
            .getFailedToLoadNewsInfo()
                .should('have.text', 'Failed to load news')

        newsPage
            .getFailedToFetchInfo()
                .should('have.text', 'Failed to fetch')

        //verify footer
        const footer = new Footer();
        
        footer
            .verifyFooterContent()

    })

    it('Verify if news details can be properly opened after clicking view button.', () => {

        const loginPage = new LoginPage();

        loginPage.login(username, password);

        loginPage
            .verifyIfUrlIncludeProperPartAfterLogin('/news');


        //verify if news site is being opened after login
        const newsPage = new NewsPage();

        newsPage
            .verifyIfNewsPageIsBeingLoadedProperly();

        newsPage
            .verifyNumberOfAllNewsLinks(24);

        //generate random number which will be an id of an article to see
        const randomId = helpers.getRandomIntInRange(0, 24);

        //click view button of random selected news.
        newsPage
            .clickViewButtonByIdNumber(randomId)

        //verify if news are being displayed.
        newsPage
            .getImgNewsDetails()
                .should('exist')
                .and('be.visible');
    })
})