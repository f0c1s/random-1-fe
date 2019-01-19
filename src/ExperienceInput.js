
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
    constructor(props) {
        super(props);
        this.state = {
            dirty: false,
            posted: false,
            saving: false,
            endpoint: 'http://localhost:54320/skills/',
            skill: null,
            experience: null

        }
        this.handleSave = this.handleSave.bind(this)
        this.handleExperienceChange = this.handleExperienceChange.bind(this)
        this.handleSkillChange = this.handleSkillChange.bind(this)
    }
    handleSave() {
        this.setState({ saving: true })
        const data = {
            name: this.state.skill,
            experience: this.state.experience
        }
        fetch(this.state.endpoint, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify(data)
        })
            .then(response => {
                console.log(response)
                this.setState({ dirty: false, posted: true, saving: false })
            })
            .catch(e => {
                console.error(`FAILED with reason: ${e}`)
            })
    }
    handleExperienceChange(e) {
        this.setState({
            dirty: true,
            experience: e.target.value
        })
    }
    handleSkillChange(e) {
        this.setState({
            dirty: true,
            skill: e.target.value
        })
    }
    render() {
        return (
            <section className="input grid">
                <div className="type grid-item">
                    <input class="input" id="skill-input" type="text" placeholder="React, Node, JavaScript, TypeScript ..." onChange={this.handleSkillChange} />
                </div>
                <div className="experience grid-item">
                    <select class="input" id="experience-input" defaultValue="Experience" onChange={this.handleExperienceChange}>
                        <option disabled value="Experience">Exerience</option>
                        {options.map(option => <option key={option} value={option}>{option}</option>)}
                    </select>
                </div>
                <div className="save grid-item">
                    <button class="input" id="save-input" onClick={this.handleSave} disabled={!this.state.dirty}>Add Skills</button>
                </div>
            </section>
        )
    }
}
