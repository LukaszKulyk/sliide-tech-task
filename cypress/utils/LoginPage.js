class LoginPage {

    getUserNameInput() {
        return cy.get("input#username");
    }

    getPasswordInput() {
        return cy.get("input#password");
    }

    getLoginButton() {
        return cy.get("button#login_button");
    }

    getUserNameHelperText() {
        return cy.get("p#username-helper-text");
    }

    getPasswordHelperText() {
        return cy.get("p#password-helper-text");
    }

    fillUserName(username) {
        const field = this.getUserNameInput();
        field.clear();
        field.type(username);

        return this;
    }

    fillPassword(password) {
        const field = this.getPasswordInput();
        field.clear();
        field.type(password);

        return this;
    }

    clickLoginButton() {
        const button = this.getLoginButton()
                        .should(button => {
                            expect(button).to.exist;
                            expect(button).to.contain('Sign In');
                        });
        button.click();
    }

    login(username, password) {
        this.fillUserName(username);
        this.fillPassword(password);
        this.clickLoginButton()
    }

    verifyUserNameHelperText(properText) {
        return this.getUserNameHelperText()
                    .should('have.text', properText);
    }

    verifyPasswordHelperText(properText) {
        return this.getPasswordHelperText()
                    .should('have.text', properText);
    }

    verifyIfUrlIncludeProperPartAfterLogin(urlPart) {
        cy.url().should('include', urlPart)
    }

}

export default LoginPage;