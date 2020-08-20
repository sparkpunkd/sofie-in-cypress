describe('Test rundown', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('host')}/rundown/${Cypress.env('ro_id')}?studio=1`) 
  })
  const layers: Array<{ name: string, label: string}> = [
    { name: 'graphics_tag_left', label: 'Arkiv' },
    { name: 'live_transition0', label: 'Transition' },
    { name: 'camera0', label: 'Kam' },
    { name: 'graphics_fullskjerm', label: 'Grafikk' },
    { name: 'script', label: 'Manus' },
    { name: 'graphics_super', label: 'Super' },
    { name: 'vb', label: 'VB' },
    { name: 'vignett', label: 'Vignett' },

  ]
  const studio = 'studio0'
  // it('has required layers', () => {
  //   cy.wait(5000, { timeout: 6000 })
  //   cy.scrollTo('bottom', { duration: 10000, timeout: 30000 })
  //   cy.scrollTo('top')
  //   cy.wrap(layers).each((layer) => {
  //     cy.get(`[data-source-id="${studio}_${layer.name}"]`)
  //     .should('have.length.gte', 1)
  //     .first()
  //     .should('be.visible')
  //     .should('have.text', layer.label)        
  //   })
  // })
  it('receives hotkeys', () => {
    cy.waitUntil(() => cy.get('.header.rundown').should('be.visible'), {
      timeout: 10000
    })
    cy.roActivate()
    cy.wait(3000, { timeout: 4000 })
    cy.get('.header.rundown')
      .should('have.class', 'active')
    cy.wait(3000, { timeout: 4000 })
    cy.roTake()
    cy.wait(3000, { timeout: 4000 })
    cy.roHotkey(13, false, false, false, 2) // Numpad enter
    cy.wait(3000, { timeout: 4000 })
    cy.roDeactivate()
    cy.wait(3000, { timeout: 4000 })
    cy.get('.header.rundown')
      .should('have.class', 'not-active')
    cy.getCurrentTime().then((currentTime) => {
      Cypress.log({
        name: 'getCurrentTime',
        displayName: 'S-TIME',
        message: [`Current time is: ${currentTime}`],
      })
    })
    cy.screenshot({
      capture: 'runner'
    })
  })
})