describe('Faking Caspar', () => {
    it('asks a question, gets a response', () => {
      cy.visit('/?studio=1') 

      cy.task('caspar', '202 PLAY OK')
        .then(result => {
          cy.log('Received', result)
          cy.addContext(result)
        })
    })
  })