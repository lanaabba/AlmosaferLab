/// <reference types="Cypress" />
Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
  Cypress.Commands.add('visitWebsite', () => {
    cy.visit('https://www.almosafer.com/en');
    cy.get('.cta__saudi').click();
  });
  describe('visit website', () => {
    it('Search for and select a city', () => {
        cy.visitWebsite();
        cy.get('#uncontrolled-tab-example-tab-hotels').click()        
        let englishCities = ["dubai", "jeddah", "Amman"];
        let RandomEnglish = Math.floor(Math.random() * englishCities.length);
  
        cy.get('[data-testid="AutoCompleteInput"]').type(englishCities[RandomEnglish]);
        cy.get('[data-testid="AutoCompleteResultsList"]')
        .find("li")
        .eq(0)
        .click();
        cy.get('.sc-1vkdpp9-5').click()
        cy.wait(15000);
        cy.get('[data-testid="HotelSearchResult__sort__LOWEST_PRICE"]').click();
        cy.get('.Price__Value').first().invoke('text').then((firstPrice) => {
          cy.get('.Price__Value').last().invoke('text').then((lastPrice) => {

              const FirstPriceValue = parseFloat(firstPrice);
              const LastPriceValue = parseFloat(lastPrice);
              expect(FirstPriceValue).to.be.lessThan(LastPriceValue);
          });
      });




    });
  });