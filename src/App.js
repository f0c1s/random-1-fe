import React, { Component } from 'react'
import Header from './Header'
import ExperienceDisplay from './ExperienceDisplay'
import ExperienceInput from './ExperienceInput'
import './App.css'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: false,
            fetched: false,
            endpoint: 'http://localhost:54320/skills'
        }
        this.fetchSkills = this.fetchSkills.bind(this)
        this.onSave = this.onSave.bind(this)
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
    onSave() {
        this.fetchSkills()
    }
    componentDidMount() {
        this.fetchSkills()
    }
    render() {
        return (
            <div className="App">
                <Header />
                <ExperienceInput onSave={this.onSave} />
                <ExperienceDisplay skills={this.state.fetched} />
            </div>
        )
    }
}
