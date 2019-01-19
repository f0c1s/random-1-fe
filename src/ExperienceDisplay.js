import React, { Component } from 'react'

class Experience extends Component {
    render() {
        return (
            <ol>
                {
                    this.props.skills.map(skill =>
                        <li id={skill.id} key={JSON.stringify(skill)} className="experience-tile">
                            <span className="name">{skill.name}</span>
                            <span className="experience">{skill.experience}</span>
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
            <div>
                {this.state.fetched.length > 0 ? <Experience skills={this.state.fetched} /> : ''}
            </div>
        )
    }
}
