describe("Tickets", () => {
    beforeEach(() => cy.visit("https://bit.ly/2XSuwCW"));
    
    it("fills all the text input fields", () => {
        const firstName = "Bruno";
        const lastName = "Santos";
        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("brunosantos@gmail.com");
        cy.get("#requests").type("boa tarde");
        cy.get("#signature").type(`${firstName} ${lastName}`);
    })

    it("Select two tickets",() => {
        cy.get("#ticket-quantity").select("4");
    });

    it("Select 'vip' ticket type", () => {
        cy.get("#vip").check();
    });

    it("Selects 'Social Media' and 'Publication' checkbox", () => {
        cy.get("#publication").check();
        cy.get("#social-media").check();
    })

    it("Select 'friend', after unchek 'friend'", () => {
        cy.get("#friend").check();
        cy.get("#friend").uncheck();
    })

    it("Has 'TICKETBOX' header's heading", () => {
        cy.get("header h1").should("contain", "TICKETBOX");
    });

    it("alerts on invalid email", () => {
        cy.get("#email")
            .as("email")
            .type("carlosgmail.com");

        cy.get("#email.invalid").should("exist");

        cy.get("@email")
            .clear()
            .type("Bruno@gmail.com");
        
        cy.get("#email.invalid").should("not.exist");
    });

    it("fills and reset the form", () => {
        const firstName = "Bruno";
        const lastName = "Santos";
        const fullName = `${firstName} ${lastName}`;

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("brunosantos@gmail.com");
        cy.get("#ticket-quantity").select("4");
        cy.get("#vip").check();
        cy.get("#friend").check();
        cy.get("#requests").type("good afternoon");

        cy.get(".agreement p").should(
            "contain", `I, ${fullName}, wish to buy 4 VIP tickets.`
        );

        cy.get("#agree").click();
        cy.get("#signature").type(fullName);

        cy.get("button[type='submit']")
        .as("submitButton")
        .should("not.be.disabled");

        cy.get("button[type='reset']").click();

        cy.get("@submitButton").should("be.disabled");
    });

    it("fills mandatory fields using support command", () => {
        const customer = {
            firstName: "João",
            lastName: "Silva",
            email:"joao@gmail.com"
        };
        cy.fillsMandatoryFields(customer);

        cy.get("button[type='submit']")
        .as("submitButton")
        .should("not.be.disabled");

        cy.get("#agree").uncheck();

        cy.get("@submitButton").should("be.disabled");
    });
});