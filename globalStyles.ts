import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
	body {
		background-color: ${({ theme }) => theme.body};
		color: ${({ theme }) => theme.text};
    font-family: Ubuntu, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
	}
`