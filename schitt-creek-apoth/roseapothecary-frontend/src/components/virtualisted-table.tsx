// // import { AgGridReact } from '@ag-grid-community/react';
// // import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';
// // import { ModuleRegistry } from  '@ag-grid-community/core';
// // import "@ag-grid-community/styles/ag-grid.css";
// // import "@ag-grid-community/styles/ag-theme-quartz.css";

// // import React, {useState, useEffect, useMemo, useCallback, StrictMode} from 'react';
// // import axios from 'axios';

// // import {Table, AutoSizer, CellMeasurer, CellMeasurerCache} from 'react-virtualized';
// // import Box from '@mui/material/Box';
// // import Tab from '@mui/material/Tab';
// // import { TabContext, TabPanel, TabList } from '@mui/lab';

// import { ModuleRegistry } from '@ag-grid-community/core';
// import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';
// import { AgGridReact } from '@ag-grid-community/react';
// import '@ag-grid-community/styles/ag-grid.css';
// import '@ag-grid-community/styles/ag-theme-quartz.css';
// import React, { StrictMode, useCallback, useMemo, useState } from 'react';


// ModuleRegistry.registerModules([InfiniteRowModelModule]);
// function App() {

//     const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
//     const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

//     const [columnDefs, setColumnDefs] = useState([
//         // this row shows the row index, doesn't use any data from the row
//         {
//             headerName: 'ID',
//             maxWidth: 100,
//             // it is important to have node.id here, so that when the id changes (which happens
//             // when the row is loaded) then the cell is refreshed.
//             valueGetter: 'node.id',
//             cellRenderer: (props) => {
//                 if (props.value !== undefined) {
//                     return props.value;
//                 } else {
//                     return <img src="https://www.ag-grid.com/example-assets/loading.gif" />;
//                 }
//             },
//         },
//         { field: 'athlete', minWidth: 150 },
//         { field: 'age' },
//         { field: 'country', minWidth: 150 },
//         { field: 'year' },
//         { field: 'date', minWidth: 150 },
//         { field: 'sport', minWidth: 150 },
//         { field: 'gold' },
//         { field: 'silver' },
//         { field: 'bronze' },
//         { field: 'total' },
//     ]);
//     const defaultColDef = useMemo(() => {
//         return {
//             flex: 1,
//             minWidth: 100,
//             sortable: false,
//         };
//     }, []);

//     const onGridReady = useCallback((params) => {
//         fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
//             .then((resp) => resp.json())
//             .then((data) => {
//                 const dataSource = {
//                     rowCount: undefined,
//                     getRows: (params) => {
//                         console.log('asking for ' + params.startRow + ' to ' + params.endRow);
//                         // At this point in your code, you would call the server.
//                         // To make the demo look real, wait for 500ms before returning
//                         setTimeout(function () {
//                             // take a slice of the total rows
//                             const rowsThisPage = data.slice(params.startRow, params.endRow);
//                             // if on or after the last page, work out the last row.
//                             let lastRow = -1;
//                             if (data.length <= params.endRow) {
//                                 lastRow = data.length;
//                             }
//                             // call the success callback
//                             params.successCallback(rowsThisPage, lastRow);
//                         }, 500);
//                     },
//                 };
//                 params.api.setGridOption('datasource', dataSource);
//             });
//     }, []);

//     return (
//         <div style={containerStyle}>
//             <div
//                 style={gridStyle}
//                 className={
//                     "ag-theme-quartz-dark"
//                 }
//             >
//                 <AgGridReact
//                     columnDefs={columnDefs}
//                     defaultColDef={defaultColDef}
//                     rowBuffer={0}
//                     rowSelection={'multiple'}
//                     rowModelType={'infinite'}
//                     cacheBlockSize={100}
//                     cacheOverflowSize={2}
//                     maxConcurrentDatasourceRequests={1}
//                     infiniteInitialRowCount={1000}
//                     maxBlocksInCache={10}
//                     onGridReady={onGridReady}
//                 />
//             </div>
//         </div>
//     );

  // const [gridApi, setGridApi] = useState(null);


  //   const [productsRowData, setProductsRowData] = useState([]);
  //   // const [customerInfoLoaded, setCustomerInfoIsLoaded] = useState(false);
  //   // const [customerInfoRowData, setCustomerInfoRowData] = useState([]);
  //   const [customerOrdersRowData, setCustomerOrdersRowData] = useState([]);

  //   // const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  //   // const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  //   const [value, setValue] = useState(0);
  //   // const [activateTab, setActivateTab] = useState(false);


  //   const handleChange = (event, newValue) => {
  //     setValue(newValue);
  //   };

  // const productsDefs = [{
  //   headerName: "Product Name",
  //   field: "product_name"
  // },
  // {
  //   headerName: "Price",
  //   field: "price",
  //   filter: "agNumberColumnFilter"
  // },
  // {
  //   headerName: "Category",
  //   field: "category"
  // },
  // {
  //   headerName: "Artisanal Flair",
  //   field: "artisanal_flair"
  // },
  // {
  //   headerName: "Last Stocked",
  //   field: "date_last_stocked"
  // },
  // {
  //   headerName: "Shelf Life",
  //   field: "shelf_life"
  // },];
  
  
  // const [customerOrdersDefs, setOrdersDefs] = [{
  //   headerName: "Order ID",
  //   field: "order_id"
  // },
  // {
  //   headerName: "Customer Id(s)",
  //   field: "customer_id"
  // },
  // {
  //   headerName: "Order Time",
  //   field: "order_time"
  // },
  // {
  //   headerName: "Product(s) Ordered",
  //   field: "product_ordered"
  // },
  // {
  //   headerName: "Customer Mood",
  //   field: "customer_mood"
  // },
  // {
  //   headerName: "Number Of Customers",
  //   field: "number_customers"
  // },
  // {
  //   headerName: "Bill Split",
  //   field: "bill_split"
  // },
  // {
  //   headerName: "Customer Feedback",
  //   field: "customer_feedback"
  // },];

  // const customerInfoDefs = useState([

  //   // this row shows the row index, doesn't use any data from the row
  //   {
  //     headerName: 'ID',
  //     maxWidth: 100,
  //     // it is important to have node.id here, so that when the id changes (which happens
  //     // when the row is loaded) then the cell is refreshed.
  //     valueGetter: 'node.id',
  //     cellRenderer: (props) => {
  //         if (props.value !== undefined) {
  //             return props.value;
  //         } else {
  //             return <img src="https://www.ag-grid.com/example-assets/loading.gif" />;
  //         }
  //     },
  // },

  //   {
  //   headerName: "Customer Name",
  //   field: "name"
  // },
  // {
  //   headerName: "Customer Type",
  //   field: "customer_type"
  // },
  // {
  //   headerName: "Product Preference",
  //   field: "product_preference"
  // },
  // {
  //   headerName: "Favourite Scent",
  //   field: "favourite_scent"
  // },]);

  //   const defaultColDef = useMemo( () => ({
  //       sortable: false,
  //       filter: true,
  //       flex: 1,
  //       minWidth: 100,
  //   }), []);

  //   const onGridReady = useCallback((params) => {
  //     fetch('http://localhost:8000/api/customer-info/')
  //         .then((resp) => resp.json())
  //         .then((data) => {
  //             const dataSource = {
  //                 rowCount: undefined,
  //                 getRows: (params) => {
  //                     console.log('asking for ' + params.startRow + ' to ' + params.endRow);
  //                     // At this point in your code, you would call the server.
  //                     // To make the demo look real, wait for 500ms before returning
  //                     setTimeout(function () {
  //                         // take a slice of the total rows
  //                         const rowsThisPage = data.slice(params.startRow, params.endRow);
  //                         // if on or after the last page, work out the last row.
  //                         let lastRow = -1;
  //                         if (data.length <= params.endRow) {
  //                             lastRow = data.length;
  //                         }
  //                         // call the success callback
  //                         params.successCallback(rowsThisPage, lastRow);
  //                     }, 500);
  //                 },
  //             };
  //             params.api.setGridOption('datasource', dataSource);
  //         });
  // }, []);

  //   // const totalNumberOfRows = gridApi.paginationGetRowCount();

  //   // const dataSource={
  //   //   getData(params){
  //   //     fetch('http://localhost:8000/api/customer-info/')
  //   //     .then((response) => {
  //   //       response.json()
  //   //     }).then((data) => {
  //   //       params.successCallback(data, data.lastRow);
  //   //       console.log(params.lastRow)
  //   //     }).catch(error => {
  //   //       console.error(error);
  //   //       params.failCallback();
  //   //     })
  //   //   }
  //   // };

  //   // const onGridReady = (params) => {
  //   //   setGridApi(params);
  //   //   params.api.serverSideDatasource(dataSource);
  //   // }
    
  //   // const getData = React.useCallback((params) => {
  //   //   axios({
  //   //     method: "GET",
  //   //     url:"http://localhost:8000/api/customer-info/",
  //   //   }).then((response) => {
  //   //     const data = response.data
  //   //     const dataSource = {
  //   //       rowCount: undefined,

  //   //       getRows: (params) => {
  //   //         console.log(params.startRow + "to" + params.endRow);
  //   //         setTimeout(() => {
  //   //           const rowThisPage = data.slice(params.startRow, params.endRow);
  //   //           let lastRow = -1;
  //   //           if(data.length <= params.endRow){
  //   //             lastRow = data.length;
  //   //           }
  //   //           params.successCallback(rowThisPage, lastRow);
  //   //         }, 500);
  //   //       },
  //   //     }
  //   //     setCustomerInfoRowData(dataSource)
  //   //   }).catch((error) => {
  //   //     if (error.response) {
  //   //       console.log(error.response);
  //   //       console.log(error.response.status);
  //   //       console.log(error.response.headers);
  //   //       }
  //   //   });
  //   // }, []);
    // useEffect(() => {
    //   getData();
    // },[]);

  //   // const getData = (limit = 100) => {
  //   //   axios.
  //   //   get(`http://localhost:8000/api/customers-info/?limit=${limit}`)
  //   //   .then(response => {
  //   //     setCustomerInfoRowData([...customerInfoRowData, ...response.data]);
  //   //     setCustomerInfoIsLoaded(true);
  //   //   }).catch((error) => {
  //   //         if (error.response) {
  //   //           console.log(error.response);
  //   //           console.log(error.response.status);
  //   //           console.log(error.response.headers);
  //   //           }
  //   //     })

  //   // };
  // //   async function getData(){
  // // axios
  // // .get('http://localhost:8000/api/customers-info/')
  // // .then(response => {
  // //   setCustomerInfoRowData(response.data);
  // //   return axios.get('http://localhost:8000/api/customers-orders/');
  // // })
  // // .then(response => {
  // //   setCustomerOrdersRowData(response.data);
  // //   return axios.get('http://localhost:8000/api/products/');
  // // })
  // // .then(response => {
  // //   setProductsRowData(response.data);
  // // }).catch(error => console.log(error.response));
  // //   }

  //   // useEffect(() => {
  //   //   setError(false);
  //   //   setLoading(true);

  //   //   axios.get('http://localhost:8000/api/customers-orders/', {
  //   //     params: {
  //   //       page,
  //   //       limit: 10,
  //   //     }
  //   //   }).then(({customerOrdersRowData: respData})=>{
  //   //     setCustomerOrdersRowData((prev) => [...new Set([...prev, ...respData.data])]);
  //   //     setMore(Boolean(response.pageData.nextPage));
  //   //     setLoading(false);
  //   //   }).catch(() => setError(true));
  //   // } ,[page]);


  // //   async function getData(){
  // // await axios
  // // .get('http://localhost:8000/api/customers-info/')
  // // .then(response => {
  // //   setCustomerInfoRowData(response.data);
  // //   return axios.get('http://localhost:8000/api/customers-orders/');
  // // })
  // // .then(response => {
  // //   setCustomerOrdersRowData(response.data);
  // //   return axios.get('http://localhost:8000/api/products/');
  // // })
  // // .then(response => {
  // //   setProductsRowData(response.data);
  // // }).catch(error => console.log(error.response));
  // //   }

  //   // async function getData() {
  //   //   let urls = ["http://localhost:8000/api/customers-info/",
  //   //   "http://localhost:8000/api/customers-orders/",
  //   //   "http://localhost:8000/api/products/"];

  //   //   const uri = "http://localhost:8000/api/products/"

  //   //   const requests = urls.map((url) => axios.get(url))
  //   //   // const req = {uri : axios.get(uri)}
  //   //   Promise.all(requests).then((responses) => {
  //   //     const data = []
  //   //     responses.forEach((resp) => {
  //   //       data.push(resp.data)
  //   //     })
  //   //     setCustomerInfoRowData(data[0])
  //   //     setCustomerOrdersRowData(data[1])
  //   //     setProductsRowData(data[2])
  //   //   });

  //   //   axios.all(requests).then((responses)=>{
  //   //     let data = []
  //   //     responses.forEach((resp) => {
  //   //       data.push(resp.data)
  //   //     });
  //   //     setCustomerInfoRowData(data[0])
  //   //     setCustomerOrdersRowData(data[1])
  //   //     setProductsRowData(data[2])

  //   // });
    
  //   // async function getData(){
  //   //   let urls = [
  //   //     "http://localhost:8000/api/customer-info/",
  //   //     "http://localhost:8000/api/customer-orders/",
  //   //     "http://localhost:8000/api/products/"
  //   //   ]
  //   //   Promise.all([axios.get(urls[0]), axios.get(urls[1]), axios.get(urls[2])])
  //   // .then((responses) => {
  //   //     const [url1resp, url2resp, url3resp] = responses;
  //   //     setCustomerInfoRowData(url1resp.data)
  //   //     setCustomerOrdersRowData(url2resp.data)
  //   //     setProductsRowData(url3resp.data)
  //   // });
  //   // }
    

  // //   async function getData() {
  // //  await axios({
  // //     method: "GET",
  // //     url:"http://localhost:8000/api/products/",
      
  // //   }).then((response)=>{
  // //     const data = response.data
  // //     setProductsRowData(data)
  // //   }).catch((error) => {
  // //     if (error.response) {
  // //       console.log(error.response);
  // //       console.log(error.response.status);
  // //       console.log(error.response.headers);
  // //       }
  // //   });
  // //   await axios({
  // //     method: "GET",
  // //     url:"http://localhost:8000/api/customer-info/",
  // //   }).then((response)=>{
  // //     const data = response.data
  // //     setCustomerInfoRowData(data)
  // //   }).catch((error) => {
  // //     if (error.response) {
  // //       console.log(error.response);
  // //       console.log(error.response.status);
  // //       console.log(error.response.headers);
  // //       }
  // //   });
  // //   await axios({
  // //     method: "GET",
  // //     url:"http://localhost:8000/api/customer-orders/",
  // //   }).then((response)=>{
  // //     const data = response.data
  // //     setCustomerOrdersRowData(data)
  // //   }).catch((error) => {
  // //     if (error.response) {
  // //       console.log(error.response);
  // //       console.log(error.response.status);
  // //       console.log(error.response.headers);
  // //       }
  // //   });
  // // }; 
  
//   // if (isLoading){
//   //   return <div>Loading...</div>
//   // }

//   // const onGridReadyCustomerInfo = useCallback((params) => {
//   //   fetch("http://localhost:8000/api/customer-info/")
//   //     .then((resp) => resp.json())
//   //     .then((data) => setCustomerInfoRowData(data));
//   // }, []);

//   // const onGridReadyCustomerOrders = useCallback((params) => {
//   //   fetch("http://localhost:8000/api/customer-orders/")
//   //     .then((resp) => resp.json())
//   //     .then((data) => setCustomerOrdersRowData(data));
//   // }, []);

//   // const onGridReadyProducts = useCallback((params) => {
//   //   fetch("http://localhost:8000/api/products/")
//   //     .then((resp) => resp.json())
//   //     .then((data) => setProductsRowData(data));
//   // }, []);

//   // Set the URLs to access

  
//   return (
//     <div className='ag-theme-quartz-dark' style={{height: 800}}>
//       <Box sx={{ width: '100%', typography: 'body1' }}>
//       <TabContext value={value}>
//         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//           <TabList onChange={handleChange} centred="true">
//             <Tab label="Customer Info" value="1" />
//             <Tab label="Customer Orders" value="2" />
//             <Tab label="Products" value="3" />
//           </TabList>
//         </Box>
//         <TabPanel style={{height: 800}} value="1">
//           <AgGridReact
//             columnDefs={customerInfoDefs}
//             defaultColDef={defaultColDef}
//             rowBuffer={0}
//             rowSelection={'multiple'}
//             rowModelType={'infinite'}
//             cacheBlockSize={100}
//             cacheOverflowSize={2}
//             maxConcurrentDatasourceRequests={1}
//             infiniteInitialRowCount={1000}
//             maxBlocksInCache={10}
//             onGridReady={onGridReady}
//             // rowSelection='multiple'
//             // animateRows={true}
//             // defaultColDef={defaultColDef}
//             // rowBuffer={0}
//             // rowModelType='infinite'
//             // cacheBlockSize={100}
//             // cacheOverflowSize={2}
//             // maxConcurrentDatasourceRequests={3}
//             // infiniteInitialRowCount={100}
//             // maxBlocksInCache={10}
//             // pageination={true}
//             />
//         </TabPanel>
//         <TabPanel style={{height: 800}} value="2">
//         <AgGridReact
//             rowData={customerOrdersRowData}
//             columnDefs={customerOrdersDefs}
//             rowSelection='multiple'
//             animateRows={true}
//             defaultColDef={defaultColDef}
//             // rowModelType={'infinite'}
//             cacheBlockSize={5000}
//             cacheOverflowSize={10}
//             maxConcurrentDatasourceRequests={1000}
//             // infiniteInitialRowCount={1}
//             maxBlocksInCache={5}/>
//         </TabPanel>
//         <TabPanel style={{height: 800}} value="3">
//         <AgGridReact
//             rowData={productsRowData}
//             columnDefs={productsDefs}
//             rowSelection='multiple'
//             animateRows={true}
//             defaultColDef={defaultColDef}
//             // rowModelType={'infinite'}
//             cacheBlockSize={100}
//             cacheOverflowSize={2}
//             maxConcurrentDatasourceRequests={2}
//             infiniteInitialRowCount={2}
//             maxBlocksInCache={2}
//             pagination ={true}
//             />
//         </TabPanel>
//       </TabContext>
//     </Box>
//     </div>
//   );
// }