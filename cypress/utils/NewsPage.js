class NewsPage {

    getNewsHeader() {
        return cy.get('header > div > h6');
    }

    getNewspaperIcon() {
        return cy.get("[data-testid='NewspaperIcon']");
    }

    getTodaysTopNews() {
        return cy.get("main h1");
    }

    getAllNewsLinks() {
        return cy.get("main div a");
    }

    getAllNewsCardContents() {
        return cy.get("div.MuiCardContent-root");
    }

    getAllNewsCardImages() {
        return cy.get("img[id^=article_image_]");
    }

    getImgNewsDetails() {
        return cy.get("body > img")
    }

    //failed to load news section
    getNewsFailed() {
        return cy.get('div#news_failed')
    }

    getFailedToLoadNewsInfo() {
        return cy.get('div#news_failed p:first-child')
    }

    getFailedToFetchInfo() {
        return cy.get('div#news_failed p:last-child')
    }

    verifyIfImageIsBeingShown() {
        return this.getImgNewsDetails()
                    .should('exist')
                    .and('be.visible');
    }

    verifyNumberOfAllNewsLinks(expectedNumberOfNews) {
        return this.getAllNewsLinks()
                    .its('length')
                    .should('eq', expectedNumberOfNews);
    }

    verifyNumberOfAllNewsCardContents(expectedNumberOfNews) {
        return this.getAllNewsCardContents()
                    .its('length')
                    .should('eq', expectedNumberOfNews);
    }

    verifyNumberOfAllNewsCardImages(expectedNumberOfNews) {
        return this.getAllNewsCardImages()
                    .its('length')
                    .should('eq', expectedNumberOfNews);
    }

    verifyIfNewsPageIsBeingLoadedProperly() {
        return this.getNewsHeader()
                    .should('have.text', 'News')
                    .then(() => {
                        this.getNewspaperIcon()
                            .should('exist')
                            .and('be.visible');
                    })
                    .then(() => {
                        this.getTodaysTopNews()
                            .should('have.text', 'Todays top news');
                    })
    }

    clickViewButtonByIdNumber(numberInID) {
        const button = cy.get(`main div a#article_link_${numberInID}`)
                        .should(button => {
                            expect(button).to.exist;
                            expect(button).to.contain('View');
                        });
        button.click();
    }

}

export default NewsPage;