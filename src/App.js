import React from 'react';
import { Route } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import { Header } from './components';
import { Home, Cart } from './pages';
// import { fetchPizzas } from './redux/actions/pizzas';

function App() {
  // const dispatch = useDispatch();

  // React.useEffect(() => {
  //   dispatch(fetchPizzas())
  // }, [dispatch]);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Route path="/" component={Home} exact />
        <Route path="/cart" component={Cart} exact />
      </div>
    </div>
  );
}
export default App;
// class App extends React.Component {
//   componentDidMount() {
//     axios.get('http://localhost:3000/db.json')
//       .then(({data}) => this.props.setPizzas(data.pizzas));
//   }
//
//   render() {
//     return (
//       <div className="wrapper">
//         <Header />
//         <div className="content">
//           <Route path="/" exact>
//             <Home pizzas={this.props.items} />
//           </Route>
//           <Route path="/cart" component={Cart} exact />
//         </div>
//       </div>
//     )
//   }
// }


// export default connect(mapStateToProps, mapDispatchToProps)(App);
