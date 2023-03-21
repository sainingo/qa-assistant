import React from 'react'
import { render } from '@testing-library/react'
import PatientInformation from '../src/components/PatientInformation'
import { describe, it} from 'vitest'
import { MemoryRouter as Router } from 'react-router-dom';


describe('PatientInformation', () => {
    it('renders the PatientInformation component', () => {
        render(
        <Router>
        <PatientInformation />
        </Router>
        )
    })
});
