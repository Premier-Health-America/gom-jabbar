"use client";

import axios from "axios";
import { Alert, Button, Modal } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DateTime } from 'luxon';


const WEBSITE = "http://localhost:3000/api";
const link = (url) => WEBSITE + url;
// Delay function
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// component to show image with line at bottom
function Piece({ imgPath, active = true, message = "" }) {
  return (<div className="flex flex-col w-full gap-2">
    <div className="flex">
      <img src={imgPath} alt="Step 1" className={"w-20 h-20 -translate-x-1/3 " + (!active ? "opacity-50" : "")} />
      <p className="self-center">{active ? message : ""}</p>
    </div>
    <div className="flex w-full">
      <div className={"w-5 h-5 rounded-full bg-teal-600 " + (!active ? "opacity-50" : "")}></div>
      <div className="w-full border-2 h-0 self-center"></div>
    </div>
  </div>);
}

export default function Home() {

  const [oil, setOil] = useState('');
  const [error, setError] = useState('');
  const [startProcess, setStartProcess] = useState(false);
  const [alert, setAlert] = useState('Preparing....');

  const [cheese, setCheese] = useState(false);
  const [potatoes, setPotatoes] = useState(true);
  const [cutPotatoes, setCutPotatoes] = useState(false);
  const [mapleSyrup, setMapleSyrup] = useState(false);
  const [boilingPotatoes, setBoilingPotatoes] = useState(false);
  const [fryingPotatoes, setFryingPotatoes] = useState(false);
  const [gravy, setGravy] = useState(false);
  const [poutine, setPoutine] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [modalMsg, setModalMsg] = useState('Your poutine is served!');

  const makePoutine = async () => {

    await delay(1000);

    // squeeze cheese
    axios.post(link("/squeeze"), { cheeseAmount: 1 }).then((data) => {
      console.log(data);
      setCheese(true);
      setAlert("Cheese squeezed!");
    }).catch((err) => {
      console.error(err);
    });

    await delay(1000);

    // make gravy
    setAlert("Gravy Ready!");
    setGravy(true);

    await delay(1000);

    // Cut potatoes
    axios.post(link("/cut")).then((data) => {
      console.log(data);
      setCutPotatoes(true);
      setAlert("Potatoes cut!");
    }).catch((err) => {
      console.error(err);
    });

    await delay(1000);

    // maple syrup
    setAlert("Syrup Ready!");
    setMapleSyrup(true);

    await delay(1000);

    // Boil potatoes
    axios.post(link("/boil")).then((data) => {
      console.log(data);
      setBoilingPotatoes(true);
      setAlert("Potatoes boiled!");
    }).catch((err) => {
      console.error(err);
    });

    await delay(1000);

    // Fry potatoes
    axios.post(link("/fry")).then((data) => {
      console.log(data);
      setFryingPotatoes(true);
      setAlert("Potatoes fried!");
    }).catch((err) => {
      console.error(err);
    });

    await delay(1000);

    // Fry potatoes
    axios.post(link("/mix")).then((data) => {
      console.log(data);
      setAlert("Ingredients mixed!");
    }).catch((err) => {
      console.error(err);
    });

    await delay(1000);
    // Send Box
    axios.post(link("/send")).then((data) => {
      console.log(data);
      setAlert("Poutine Ready!");
      setPoutine(true);
    }).catch((err) => {
      console.error(err);
    });

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!oil) {
      setError('* Please Select Oil');
    } else {
      setError('');
      setStartProcess(true);
      makePoutine();
    }
  };

  const selectOil = (e) => {
    setOil(e.target.value);
    if (!e.target.value) {
      setError('* Please Select Oil');
    } else {
      setError("");
    }
  }


  const restart = () => {
    window.location.reload();
  }


  const detectDrunk = () => {
    // detect drunk
    axios.get(link("/detect-drunk")).then((res) => {
      //const now = DateTime.now().setZone('America/Toronto');
      
      const now = DateTime.now().setZone('America/Toronto').set({
      hour: 2,
      minute: 30,
      second: 0,
      millisecond: 0
      });
      
      const startTime = now.set({ hour: 2, minute: 0, second: 0 });
      const endTime = now.set({ hour: 5, minute: 0, second: 0 });

      console.log(res.data.isDrunk);
      console.log(now.toString());

      if (res.data.isDrunk) {
        if (now >= startTime && now <= endTime) {
          setModalMsg("Your poutine is served!");
        } else {
          setModalMsg("People are drunk, but it's still too early for poutine!");
        }
      } else {
        setModalMsg("People are not drunk enough yet! Look again?");
      }

      setOpenModal(true);

    }).catch((err) => {
      console.error(err);
    });
  }

  return (
    <main className="py-14">
      <div>
        <div className="mx-auto">
          <img src="imgs/smokedmeater-1.png" className="mx-auto p-0" width={600} />
          <img src="imgs/subline.png" className="mx-auto p-0" width={200} />
        </div>


        {/* form for selecting oil */}
        <form className={"max-w-sm mx-auto " + (startProcess ? "hidden" : "")} onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Oil</label>
          <select id="countries" value={oil}
            onChange={selectOil}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="">Choose Oil</option>
            <option value="palm">Palm Oil</option>
            <option value="soybean">Soybean Oil</option>
            <option value="sunflower">Sunflower Oil</option>
            <option value="olive">Olive Oil</option>
          </select>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="my-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Start
          </button>

        </form>

        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header >
            <p className="text-red-800">
              Alert
            </p>
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-red-800">
                {modalMsg}
              </p>
            </div>
          </Modal.Body>
        </Modal>



        <div className={"w-full " + (!startProcess ? "hidden" : "")}>
          <div className="flex justify-start mx-5 mb-2">
            <Button onClick={restart}>Re Start</Button>
          </div>
          {poutine ? <div className="flex justify-center">
            <Button gradientDuoTone="pinkToOrange" onClick={detectDrunk}>Check for drunk and hungry people</Button>
          </div> : <></>}


          {
            alert ? <Alert color="success" withBorderAccent className="my-2 w-fit mx-auto">
              <span className="font-medium">{alert}</span>
            </Alert> : <></>
          }


          <div className="flex w-full">
            <div className="mx-10 flex flex-col gap-10 w-full">
              <div className="flex w-full justify-between">
                <Piece imgPath="imgs/Cheese.png" active={cheese} message="I'm not a Montreal's bagel who are the best in the world, don't even talk to me about New York bagels, amateur!" />
              </div>
              <div className="flex w-full justify-between">
                <Piece imgPath="imgs/Potatoes.png" active={potatoes} />
                <Piece imgPath="imgs/CuttingPotatoes.png" active={cutPotatoes} />
                <Piece imgPath="imgs/MapleSyrup.png" active={mapleSyrup} />
                <Piece imgPath="imgs/BoilingPotatoes.png" active={boilingPotatoes} />
                <Piece imgPath="imgs/FryingPotatoes.png" active={fryingPotatoes} message="I'm Your Man !" />
              </div>
              <div className="flex w-full justify-between">
                <Piece imgPath="imgs/Gravy.png" active={gravy} />
              </div>
            </div>
            <div className="self-center mx-5">
              <img src="imgs/Poutine.png" alt="Step 1" className={"w-40 " + (!poutine ? "opacity-50" : "")} />
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
