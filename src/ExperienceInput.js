
import React, { Component } from 'react'
import './ExperienceInput.css'

const options = [
    '< 1 year',
    '1 - 3 years',
    '3 - 5 years',
    '5 - 7 years',
    '7+ years'
]

export default class ExperienceInput extends Component {
  render() {
    return (
      <section className="input grid">
        <div className="type grid-item">
            <input type="text" placeholder="React, Node, JavaScript, TypeScript ..." />
        </div>
        <div className="experience grid-item">
            <select defaultValue="Experience">
                <option disabled value="Experience">Exerience</option>
                {options.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
        </div>
        <div className="save">
            <button>Add Skills</button>
        </div>
      </section>
    )
  }
}
