import React, { Component } from 'react'
import Header from './Header'
import ExperienceDisplay from './ExperienceDisplay'
import ExperienceInput from './ExperienceInput'
import './App.css'

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <ExperienceInput />
                <ExperienceDisplay />
            </div>
        )
    }
}
