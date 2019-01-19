import React, { Component } from 'react'
import './ExperienceDisplay.css'

class Experience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: 'http://localhost:54320/skills/',
            onDelete: props.onDelete
        }
        this.handleDelete = this.handleDelete.bind(this)
    }
    handleDelete(id) {
        fetch(this.state.endpoint + id, {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrer: "no-referrer"
        })
            .then(response => {
                this.state.onDelete();
            })
            .catch(e => {
                console.error(`DELETE FAILED with reason: ${e}`)
            })
        this.props.onDelete()
    }
    render() {
        return (
            <ol>
                {
                    this.props.skills.map((skill, pos) =>
                        <li key={skill.id} className={"experience-tile grid" + (pos < 5 ? " first-five" : '')}>
                            <div className="position">{pos + 1}</div>
                            <div className="name">{skill.name}</div>
                            <div className="experience">{skill.experience}</div>
                            <button onClick={() => this.handleDelete(skill.id)} className="onHoverDelete">X</button>
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
                        <Experience skills={this.props.skills} onDelete={this.props.onUpdate} /> :
                        ''
                }
            </section>
        )
    }
}
