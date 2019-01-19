import React, { Component } from 'react'
import './ExperienceDisplay.css'

class Experience extends Component {
    render() {
        return (
            <ol>
                {
                    this.props.skills.map((skill, pos) =>
                        <li key={skill.id} className={"experience-tile grid" + (pos < 5 ? " first-five" : '')}>
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
    render() {
        return (
            <section className="display">
                {
                    this.props.skills && this.props.skills.length > 0 ?
                        <Experience skills={this.props.skills} /> :
                        ''
                }
            </section>
        )
    }
}
