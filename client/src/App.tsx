import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ApiService from './ApiService';
import { CssBaseline, Grid } from '@material-ui/core';
import { DishList, MenuList, OrderList, DishForm, MenuForm, OrderForm, MenuItemById, Home, TopNav, BotNav, ClientBye, MenuSaved, GetStarted, DishSaved } from './components/Index';



type data = {
  title: string;
  description: string;
  price: number;
}


type dish = {
  id: string;
  title: string;
  description: string;
  image: null; 
  createdAt: 'string';
  updatedAt: 'string';
  price: number;

}

type menu = {
  id: string;
  title: string;
  description: string;
  image: null;
  createdAt: string;
  updatedAt: string;
  price: number;
  Dishes: dish[];
}

type order = {
  id: string;
  clientName: string;
  clientAddress: string;
  clientPhone: string;
  comments: string;
  Dishes: dish[];
  
}

type parsedMenu = {
  title: string;
  DishId: number[];
}

type parsedOrder = {
  clientName: string;
    clientAddress: string;
    clientPhone: string;
    comments: string;
    DishId: number[];
}


function App() {
  const [dishes, setDishes] = useState<dish[] | []>([]);
  const [menus, setMenus] = useState<menu[] | []>([]);
  const [orders, setOrders] = useState<order[] | []>([]);
  const [selectedDishes, setSelectedDishes] = useState<dish[] | []>([]);
  const [chosenMenu, setChosenMenu] = useState<menu[] | []>([]);
  // const [tab, setTab] = useState(0);

  //DISHES
  useEffect(() => {
    ApiService.getDishes().then((data) => setDishes(data));
  }, []);

  const addNewDish = (body: data) => {
    ApiService.addDish(body).then((dish) =>
      setDishes((prevDishes) => [...prevDishes, dish])
    );
  };

  //MENUS
  useEffect(() => {
    ApiService.getMenus().then((data) => setMenus(data));
  }, []);

  const createNewMenu = (body:parsedMenu) => {
    ApiService.createMenu(body).then((menu) =>
      setMenus((prevMenus) => [...prevMenus, menu])
    );
  };

  // const deleteOneMenu = (id) => {
  //   ApiService.deleteMenu(id).then(
  //     setMenus(menus.filter((menu) => menu.id !== id))
  //   );
  // };

  //ORDERS
  useEffect(() => {
    ApiService.getOrders().then((data) => setOrders(data));
  }, []);

  const createNewOrder = (body:parsedOrder) => {
    ApiService.createOrder(body).then((order) =>
      setOrders((prevOrders) => {
        console.log('orders -> ', [...prevOrders, order]);
        return [...prevOrders, order];
      })
    );
  };

  //STYLE
  const containerStyle = {
    height: 'calc(100vh - 112px)',
    overFlow: 'auto',
    textAlign: 'center' as 'center',
  };

  return (
    <Router>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500&display=swap');
      </style>
      <div className="App">
        <Grid container direction="column">
          <TopNav />
          <div style={containerStyle} className="content">
            <Switch>
              <Route exact path="/menu">
                <MenuList menus={menus} />
              </Route>
              <Route exact path="/add_dish">
                <DishForm addNewDish={addNewDish} />
              </Route>
              <Route exact path="/dish">
                <DishList dishes={dishes} />
              </Route>
              <Route exact path="/create_menu">
                <MenuForm
                  dishes={dishes}
                  createNewMenu={createNewMenu}
                  selectedDishes={selectedDishes}
                  setSelectedDishes={setSelectedDishes}
                 
                />
              </Route>
              <Route exact path="/order">
                <OrderList orders={orders}  />
              </Route>
              <Route exact path="/create_order">
                <OrderForm
                  createNewOrder={createNewOrder}
                  menus={menus}
                  chosenMenu={chosenMenu}
                  setChosenMenu={setChosenMenu}
                />
              </Route>
              <Route exact path="/menu/:id">
                <MenuItemById menus={menus} />
              </Route>
              <Route exact path="/get_started" component={GetStarted}></Route>
              <Route exact path="/" component={Home} />
              <Route exact path="/dish_saved" component={DishSaved} />
              <Route exact path="/menu_saved" component={MenuSaved} />
              <Route exact path="/bye" component={ClientBye} />
            </Switch>
          </div>
          <BotNav />
        </Grid>
        <CssBaseline />
      </div>
    </Router>
  );
}

export default App;