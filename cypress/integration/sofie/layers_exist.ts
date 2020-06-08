describe('Test rundown', () => {
  beforeEach(() => {
    cy.visit('/rundown/G6xVUpdg91LOM2Hx2Dv4NpJFuaw_') 
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
  it('has required layers', () => {
    cy.wait(5000, { timeout: 6000 })
    cy.scrollTo('bottom', { duration: 10000, timeout: 30000 })
    cy.scrollTo('top')
    cy.wrap(layers).each((layer) => {
      cy.get(`[data-source-id="${studio}_${layer.name}"]`)
      .should('have.length.gte', 1)
      .first()
      .should('be.visible')
      .should('have.text', layer.label)        
    })

  })
})