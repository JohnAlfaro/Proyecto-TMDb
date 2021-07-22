import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Home } from "./components/home/Home";
import { MovieDetail } from "./components/moviedetail/MovieDetail";
import { Tendencia } from "./components/moviedetail/Tendencia";
import { Generos } from "./components/moviedetail/Generos";


export function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/tendencia" component={Tendencia} exact />
        <Route path="/generos" component={Generos} exact />
        <Route path="/movie/:id" component={MovieDetail} />
      </Switch>
    </main>
  );
}

export default App;
