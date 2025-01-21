import { render, screen } from '@testing-library/react'
import Todo from './Todo'
import { expect, test } from 'vitest'

test('renders a todo', () => {
    const todo = {
        text: "this is a test",
        done: false
    }

    render(<Todo todo={todo} />)

    expect(screen.getByText('this is a test'))
})