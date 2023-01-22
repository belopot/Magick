import { SpellRunner, GraphData, Spell as SpellType } from '@magickml/engine'
import { app } from '../app'

export type RunSpellArgs = {
  spellName: string
  inputs?: Record<string, unknown>
  inputFormatter?: (graph: GraphData) => Record<string, unknown>
}

export const runSpell = async ({
  spellName,
  inputs,
  inputFormatter,
}: RunSpellArgs) => {

  let spell = await app.service('spells').find({ query: { name: spellName } }) as any

  const graph = spell.graph as unknown as GraphData

  const formattedInputs = inputFormatter ? inputFormatter(graph) : inputs

  const spellToRun = {
    // TOTAL HACK HERE
    ...spell,
  }

  // Initialize the spell runner
  const spellRunner = new SpellRunner({})

  // Load the spell in to the spell runner
  await spellRunner.loadSpell(spellToRun as unknown as SpellType)

  // Get the outputs from running the spell
  const outputs = await spellRunner.defaultRun(formattedInputs)

  return { outputs, name: spell.name }
}
