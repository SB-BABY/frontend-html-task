import React from 'react'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./components/Sidebar";

library.add(fas, faMoon, faSun);

export default class App extends React.Component{
  render () {
      return (
          <Sidebar color='light' />
      )
  }
}
