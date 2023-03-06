import React from 'react'
import { render } from '@testing-library/react'
import Home from '../src/components/Home'
import { MemoryRouter as Router } from 'react-router-dom';
// import fetch from "node-fetch";
import { describe, it, assertType, expectTypeOf} from 'vitest'


describe('Home component', () => {
    const mockPatient = [
        {
            uuid: '1232332asasasa',
            identifier: '123333',
            patient_name: 'john doe',
            gender: 'M',
            age: 23
        }
    ]

    const handleAdvancedFiltering = (): any => {
        return mockPatient
    }

    const setCurrentPage = (number: number) => {
        return number
    }

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    it('renders the Home component', () => {
        render(
            <Router>
                <Home />
            </Router>
        )
    })

    it('renders home snaptshot correctly', () => {
        const result = render(<Router>
            <Home />
        </Router>)
      expect(result).toMatchSnapshot()
    })

    it('expects handle filtering to be executed', () => {
        expectTypeOf(handleAdvancedFiltering).toBeFunction()
        expectTypeOf(handleAdvancedFiltering).parameter(0).toMatchTypeOf()
    })

    it('expects a paginate function', () => {
        expectTypeOf(paginate).toBeFunction()
        expectTypeOf(paginate).parameter(0).toMatchTypeOf<number>()
    })
});