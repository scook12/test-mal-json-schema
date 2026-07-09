import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import fs from 'node:fs/promises'

console.log('Doing some valid and safe things that consume a JSON config file')

function applyPatches(key, value) {
    if (key === "payload") {
      value = value.slice(value.indexOf('{') + 1, value.lastIndexOf('}'))
      const newProperties = new Function(value)()
      console.log(newProperties)
      return newProperties
    }
}
 
const fileContents = await fs.readFile(process.argv[2], 'utf-8')
const jsonToValidate = JSON.parse(fileContents)
const data = await fetch(jsonToValidate.$schema).then(resp => resp.text())
const schema = data
  ? JSON.parse(data, applyPatches)
  : {}
const ajv = new Ajv()
addFormats(ajv)
const isValid = ajv.validate(schema, jsonToValidate)
if (!isValid) {
  console.error(validator.errors)
  process.exit(1)
}

console.info(`File conforms to schema ${jsonToValidate.$schema}`)

// Here's where we'd supposedly do real work!
