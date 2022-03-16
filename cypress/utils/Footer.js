class Footer {
    getFooterMainMessage() {
        return cy.get("footer h6.MuiTypography-h6");
    }

    getFooterBelowMessage() {
        return cy.get("footer p.MuiTypography-subtitle1");
    }

    verifyFooterContent() {
        return this.getFooterMainMessage()
                    .should('exist')
                    .and('have.text', "You're all caught up!")
                    .then(() => {
                        this.getFooterBelowMessage()
                            .should('exist')
                            .and('have.text', "Go give yourself a pat on the back.")
                    })
    }
}

export default Footer;