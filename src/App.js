import React, { Component, Fragment } from 'react';
import './App.css';
import { WishListBanner } from './WishListBanner';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AddNewItem } from './AddNewItem';
import { WishListRow } from './WishListRow';
import { VisibilityControl } from './VisibilityControl';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "Jasmyne",
      wishListItems: [
        { itemsWanted: "Ninja Foodi", recieved: false },
        { itemsWanted: "Food Proccesor", recieved: false },
        { itemsWanted: "Kitchen Aid", recieved: false },
        { itemsWanted: "Kives", recieved: true }
      ],
      showCompleted: true
    }
  }

  updateNewTextValue = (event) => {
    this.setState({
      newItemText: event.target.value
    });
  }

  AddNewItem = (addItem) => {
    if (!this.state.wishListItems.find(x => x.itemsWanted === addItem)) {
      this.setState(
        {
          wishListItems: [...this.state.wishListItems, { itemsWanted: addItem, recieved: false }]
        },
        () => localStorage.setItem("wishlist", JSON.stringify(this.state))
      );
    }
  }

  wishListTableRows = (recievedValue) => this.state.wishListItems.filter(
    item => item.recieved === recievedValue).map(item => <WishListRow key={item.recieved} item={item} callback={this.toggleWishList} />
    );


    componentDidMount = () => {
      let data = localStorage.getItem('wishlist');

      this.setState(data != null ? JSON.parse(data) :
      {
        userName: "Jasmyne",
      wishListItems: [
        { itemsWanted: "Ninja Foodi", recieved: false },
        { itemsWanted: "Food Proccesor", recieved: false },
        { itemsWanted: "Kitchen Aid", recieved: false },
        { itemsWanted: "Knives", recieved: true }
      ],
      showCompleted: true
      }
      );
    }

  toggleWishList = (wishlist) => this.setState({
    wishListItems: this.state.wishListItems.map(
      item => item.itemsWanted=== wishlist.itemsWanted ? { ...item, recieved: !item.recieved } : item
    )
  })


  render = () =>
    <div>
    <WishListBanner name={this.state.userName} tasks={this.state.wishListItems} />
    <div className="container-fluid">
      <AddNewItem callback={ this.AddNewItem }/>
      <table className="table table-striped table-bordered mt-2">
        <thead>
          <tr>
            <th>Wanted</th>
            <th>Recieved</th>
          </tr>
        </thead>
        <tbody>{this.wishListTableRows(false)}</tbody>
      </table>
      <div className="bg-secondary text-white text-center p-2">
        <VisibilityControl description="Items Recieved" isChecked={this.state.showCompleted} callback={(checked) => this.setState({ showCompleted: checked })} />
      </div>
      {this.state.showCompleted && 
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Wanted</th>
            <th>Recieved</th>
          </tr>
        </thead>
        <tbody>{this.wishListTableRows(true)}</tbody>
      </table>
      }
    </div>
  </div>
}