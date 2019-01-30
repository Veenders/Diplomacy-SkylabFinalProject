import React, { Component } from 'react';

class Retreats extends Component {
    saveRetreats = () => {
        console.log('Save Retreats');
    }
    render() {
        return (
            <div className='Orders'>
                <div className='OrdersHeader'>
                    <h3>Retreats</h3>
                </div>
                <form className='OrdersBody' onSubmit={this.saveRetreats}>
                    
                    <button type="Submit">Save Orders</button>
                </form>
                
            </div>
        )
    }
}

export default Retreats;