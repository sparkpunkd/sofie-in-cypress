describe('The Home Page', () => {
    it('successfully loads', () => {
      cy.visit('/?studio=1') 

      cy.contains('TORSDAG').click()

      cy.wait(10000)
      cy.get('.first-row').rightclick().contains('actions')
      //cy.contains('Evaluation').scrollIntoView()
    })
  })