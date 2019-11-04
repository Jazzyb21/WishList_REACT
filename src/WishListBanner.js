import React, {Component} from 'react'

export class WishListBanner extends Component{
    render = () => 
    <h4 className="bg-success text-white text-center p-2">
        {this.props.name}'s Wish List
        ({this.props.tasks.filter(t => !t.done).length} items in Wish List)
    </h4>
}