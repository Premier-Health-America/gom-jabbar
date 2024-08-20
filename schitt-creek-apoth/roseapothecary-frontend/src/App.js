

import "./App.css"
import VirtualizedTable from "./components/VirtualizedTable";
import SearchVirtualizedTable from "./components/SearchVirtualizedTable";
import { useState } from "react";

function App(){
  // const [pageNum, setPageNum] = useState(1)

  // function handleSearch(e){

  // }
  // const{
  //   customerInfo,
  //   hasMore,
  //   loading,
  //   error
  // } = SearchVirtualizedTable(pageNum)
  return <VirtualizedTable />
  // return(
  //   <>
  //    <input type = "text"></input>
  //   <div>Hello</div>
  //   </>
   
  // )
}
export default App;
