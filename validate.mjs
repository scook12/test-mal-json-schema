import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import fs from 'node:fs/promises'
 
const fileContents = await fs.readFile(process.argv[2], 'utf-8')
const jsonToValidate = JSON.parse(fileContents)
const schema = await fetch(jsonToValidate.$schema).then(res => res.json())
const ajv = new Ajv()
addFormats(ajv)
const isValid = ajv.validate(schema, jsonToValidate)
if (!isValid) {
  console.error(validator.errors)
  process.exit(1)
}
console.info(`File conforms to schema ${jsonToValidate.$schema}`)
