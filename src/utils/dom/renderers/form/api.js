/* eslint-disable no-unused-vars */
//const inputTemplate = {
//  label: '',
//  placeholder: '',
//  type: '', // text, textarea, select, file, range, checkbox, radio
//  value: '',
//  options: {}, // For select. checkbox, radio
//  config: {}, // Input specific config (currently only for range)
//  validator() { // Promise based validation definition
//    return Promise.resolve()
//  },
//  attributes: {}, // Custom input attributes
//  classes: '',
//  events: {} // Attach custom events to each input (change, keyup, focus, hover)
//}

import { getForm } from '../../getters';
import { swalClasses } from '../../../classes';

export const appendControl = (name, controlObject) => {
  // TODO
}

export const prependControl = (name, controlObject) => {
  // TODO

}

export const addControlAfter = (name, controlObject) => {
  // TODO

}

export const addControlBefore = (name, controlObject) => {
  // TODO

}

export const removeControl = (name) => {
  // TODO

}

/**
 * Add multiple controls to the form
 *
 * @param {Array} controlObjects
 */
export const addControls = (controlObjects) => {
  // TODO: Make sure control objects are valid and defaults are present
  // TODO: Perform async input options before adding
  // TODO: Add validators
  // TODO: Add events
  controlObjects.forEach(addControl)
}

/**
 * Add a single control to the form
 *
 * @param {Object} controlObject
 */
export const addControl = (controlObject) => {
  const form = getForm();

  const formControl = makeFormControl(controlObject);

  form.appendChild(formControl)
}

/**
 * Add html attributes to the input
 *
 * @param {HTMLElement} input
 * @param {Object} attributeObjects
 *
 * @return {*}
 */
export const addAttributesToInput = (input, ...attributeObjects) => {
  const attributes = attributeObjects.reduce((carry, object) => {
    return Object.assign(carry, object)
  }, {})

  Object.keys(attributes).forEach((attribute) => {
    if (attributes[attribute]) {
      input[attribute] = attributes[attribute]
    }
  })

  return input
}

/**
 * Make a base input
 *
 * @param type
 * @param name
 * @param attributes
 * @return {*}
 */
export const makeBaseInput = ({ type, name, attributes }) => {
  let input = document.createElement('input')

  input = addAttributesToInput(input, attributes, { type, name })

  return input;
}

/**
 * Make a basic input type
 * @param {Object} controlObject
 * @return {HTMLElement}
 */
export const makeBasicInput = (controlObject) => {
  const input = makeBaseInput(controlObject)

  let className = swalClasses.input

  if (['checkbox', 'radio'].includes(controlObject.type)) {
    className = swalClasses[controlObject.type]
  }

  addAttributesToInput(input, {
    placeholder: controlObject.placeholder,
    value: controlObject.value,
    className,
  })

  return input
}

/**
 * Make a single form control on the form
 * @param controlObject
 * @return {HTMLElement}
 */
export const makeFormControl = (controlObject) => {
  // Create a container for a single form control
  const container = document.createElement('div');
  container.className = swalClasses['form-control'];

  // Add a label if supplied
  if (controlObject.label) {
    const labelElement = makeLabel(controlObject)
    container.appendChild(labelElement)
  }

  // Generate the input markup. This will depend on input type
  let controlInput

  switch (controlObject.type) {
    case 'textarea':
      controlInput = makeTextarea(controlObject)
      break;
    case 'checkbox':
      controlInput = makeCheckboxes(controlObject)
      break;
    case 'radio':
      controlInput = makeRadios(controlObject)
      break;
    default:
      // Catch non-special types
      controlInput = makeBasicInput(controlObject)
  }

  // Add it to the container
  container.appendChild(controlInput)

  return container;
}

/**
 * Make a label element
 * @param controlObject
 * @return {HTMLElement}
 */
export const makeLabel = (controlObject = {}) => {
  const labelElement = document.createElement('label')

  if (controlObject.label) {
    labelElement.innerHTML = controlObject.label
  }
  if (controlObject.name) {
    labelElement.htmlFor = controlObject.name
  }

  return labelElement
}

/**
 * Generate the checkbox options
 * @param controlObject
 * @return {HTMLElement}
 */
export const makeCheckboxes = (controlObject) => {
  // Set up a container for our individual checkboxes
  const container = document.createElement('div')
  container.className = swalClasses[controlObject.type]

  // Add a checkbox for each option
  Object.keys(controlObject.options).forEach((option) => {
    container.appendChild(makeCheckbox(controlObject, option))
  })

  return container
}

/**
 * Generate the markup for a single checkbox
 * @param controlObject
 * @param option
 * @return {HTMLElement}
 */
export const makeCheckbox = (controlObject, option) => {
  // Make a container for the checkbox. A label
  // can be clicked and will select the control
  const labelElement = makeLabel()

  // Generate the checkbox markup
  const checkbox = makeBasicInput(controlObject)

  // Value can be provided as an array or as a single value
  if (
    (controlObject.value instanceof Array && controlObject.value.includes(option))
    || controlObject.value === option
  ) {
    checkbox.checked = true
  }

  // Add the checkbox element
  labelElement.appendChild(checkbox)

  // Create a span to hold the checkbox label
  const labelSpan = document.createElement('span')
  labelSpan.innerHTML = controlObject.options[option]
  labelElement.appendChild(labelSpan)

  return labelElement
}

/**
 * Generate the radio options
 * @param controlObject
 * @return {HTMLElement}
 */
export const makeRadios = (controlObject) => {
  const container = document.createElement('div')
  container.className = swalClasses[controlObject.type]

  Object.keys(controlObject.options).forEach((option) => {
    container.appendChild(makeRadio(controlObject, option))
  })

  return container
}

/**
 * Generate the markup for a single radio
 * @param controlObject
 * @param option
 * @return {HTMLElement}
 */
export const makeRadio = (controlObject, option) => {
  // Make a container for the radio. A label
  // can be clicked and will select the control
  const labelElement = makeLabel()

  // Generate the radio markup
  const radio = makeBasicInput(controlObject)

  if (controlObject.value === option) {
    radio.checked = true
  }

  labelElement.appendChild(radio)

  // Create a span to hold the checkbox label
  const labelSpan = document.createElement('span')
  labelSpan.innerHTML = controlObject.options[option]
  labelElement.appendChild(labelSpan)

  return labelElement
}

/**
 * Generate a textarea
 * @param controlObject
 * @return {HTMLElement}
 */
export const makeTextarea = (controlObject) => {
  const textarea = document.createElement('textarea')

  addAttributesToInput(textarea, controlObject.attributes, {
    placeholder: controlObject.placeholder,
    value: controlObject.value,
    className: swalClasses.textarea,
  })

  return textarea
}

