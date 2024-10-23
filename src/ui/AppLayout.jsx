
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import styled from 'styled-components'

    const Main = styled.main`
    background-color: lightgreen;
    padding :4rem 4.8rem 6.4rem;
    background-color: var(--color-grey-50);
    `

    const StyledApplayout = styled.div`
        display: grid;
        grid-template-columns: 26rem 1fr;
        grid-template-rows: auto 1fr;
        height: 100vh;
    
    `
function AppLayout() {


  return (
    <StyledApplayout>
        <Header />
        <Sidebar />
        <Main>

        <Outlet />
        </Main>
    </StyledApplayout>
  )
}

export default AppLayout