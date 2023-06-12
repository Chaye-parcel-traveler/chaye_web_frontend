import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'


 class Navbar extends Component {
    state = { activeItem: 'acceuil' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render(){
      const { activeItem } = this.state
  
      return (
        <Menu inverted>
          <Menu.Item 
             as='a' href="/acceuil"
            name='acceuil'
            active={activeItem === 'acceuil'}
            onClick={this.handleItemClick}
           
            
          />
          <Menu.Item
            as='a' href="/connexion"
            name='connexion'
            active={activeItem === 'connexion'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
          as='a' href="/inscription"
            name='inscription'
            active={activeItem === 'inscription'}
            onClick={this.handleItemClick}
          />
        <Menu.Item
          as='a' href="/allmembres"
            name='AllMembres'
            active={activeItem === 'allmembres'}
            onClick={this.handleItemClick}
          />
           <Menu.Item
          as='a' href="/deconnecter"
            name='déconnecter'
            active={activeItem === 'deconnecter'}
            onClick={this.handleItemClick}
          />
        </Menu>
        
      )
      }
      
}


export default Navbar