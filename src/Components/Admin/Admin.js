import React from 'react'
import {Outlet } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

// import { GreenButton, RedButton, VioletButton } from '../styles/Button.style'
function Admin() {
    return (
        <React.Fragment>
         <Menu inverted>
              <Menu.Item
                as='a' href="/allmembres"
                name='AllMembres'
                active={activeItem === 'allmembres'}
                onClick={this.handleItemClick}
          /></Menu>
            <Outlet />
        </React.Fragment>
    )
}

export default Admin