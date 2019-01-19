import React, { Component } from 'react'
import './ExperienceDisplay.css'

class Experience extends Component {
    render() {
        return (
            <ol>
                {
                    this.props.skills.map((skill, pos) =>
                        <li key={skill.id} className="experience-tile grid">
                            <div className="position">{pos + 1}</div>
                            <div className="name">{skill.name}</div>
                            <div className="experience">{skill.experience}</div>
                        </li>
                    )
                }
            </ol>
        )
    }
}

export default class ExperienceDisplay extends Component {
    constructor(props) {
        super(props)
        this.fetchSkills = this.fetchSkills.bind(this)
        this.state = {
            fetching: false,
            fetched: false,
            endpoint: 'http://localhost:54320/skills'
        }
    }
    fetchSkills() {
        this.setState({ fetching: true })
        fetch(this.state.endpoint)
            .then(response => {
                response.json()
                    .then(value =>
                        this.setState({ fetched: value, fetching: false })
                    )
            })
            .catch(r => console.error(`FAILED with reason: ${r}`))
    }

    componentDidMount() {
        this.fetchSkills()
    }

    render() {
        return (
            <section className="display">
                {this.state.fetched.length > 0 ? <Experience skills={this.state.fetched} /> : ''}
            </section>
        )
    }
}
