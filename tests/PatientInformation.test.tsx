import React from 'react'
import { render } from '@testing-library/react'
import PatientInformation from '../src/components/PatientInformation'
import { describe, it} from 'vitest'


describe('PatientInformation', () => {
    it('renders the PatientInformation component', () => {
        render(<PatientInformation />)
    })
});