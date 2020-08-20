describe('Faking Atem', () => {
    it('asks a question, gets a response', () => {
      cy.visit('/?studio=1') 

      cy.task('atem', 'CPgI')
        .then(result => {
          cy.log('Received', result)
          cy.addContext(result)
        })
    })
  })