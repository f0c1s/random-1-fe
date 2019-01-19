
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
            skillDirty: false,
            experienceDirty: false,
            posted: false,
            saving: false,
            endpoint: 'http://localhost:54320/skills/',
            skill: '',
            experience: 'Experience',
            onSave: props.onSave

        }
        this.handleSave = this.handleSave.bind(this)
        this.handleExperienceChange = this.handleExperienceChange.bind(this)
        this.handleSkillChange = this.handleSkillChange.bind(this)
        this.shouldSave = this.shouldSave.bind(this)
    }
    handleSave() {
        this.setState({ saving: true })
        const data = {
            name: this.state.skill,
            experience: this.state.experience
        }

        this.shouldSave() && fetch(this.state.endpoint, {
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
                this.setState({ skillDirty: false, posted: true, saving: false })
                this.setState({skill: ''})
                this.state.onSave();
            })
            .catch(e => {
                console.error(`FAILED with reason: ${e}`)
            })
    }
    handleExperienceChange(e) {
        this.setState({
            experienceDirty: true,
            experience: e.target.value
        })
    }
    handleSkillChange(e) {
        this.setState({
            skillDirty: true,
            skill: e.target.value
        })
    }
    shouldSave() {
        return this.state.skillDirty && this.state.experienceDirty
    }
    render() {
        return (
            <section className="input grid">
                <div className="type grid-item">
                    <input className="input" id="skill-input" type="text" placeholder="React, Node, JavaScript, TypeScript ..." onChange={this.handleSkillChange} value={this.state.skill} />
                </div>
                <div className="experience grid-item">
                    <select className="input" id="experience-input" defaultValue="Experience" onChange={this.handleExperienceChange}>
                        <option disabled value="Experience">Experience</option>
                        {options.map(option => <option key={option} value={option}>{option}</option>)}
                    </select>
                </div>
                <div className="save grid-item">
                    <button className="input" id="save-input" onClick={this.handleSave} disabled={!this.shouldSave()}>Add Skills</button>
                </div>
            </section>
        )
    }
}
