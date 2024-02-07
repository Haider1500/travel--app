//navbar
//input menu
//items renderer
//sorting of items here
//info about the items , how many packed

interface Item {
  total: string;
  description: string;
  isCarried: boolean;
  id: number;
}

import { useState } from "react";
import "./App.css";

// const itemsList = ["Passports", "Socks"];
function App() {
  const [itemsList, setItemsList] = useState<Item[]>([]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <AddItemToList itemsList={itemsList} setItemsList={setItemsList} />
      <ItemsRenderer itemsList={itemsList} setItemsList={setItemsList} />
      <ItemsOrder itemsList={itemsList} setItemsList={setItemsList} />
      <PackedItemsInfo />
    </div>
  );
}

export default App;

function Navbar() {
  return (
    <div className="bg-amber-500 flex items-center justify-center min-h-24 w-full">
      <h1 className="text-2xl">FAR AWAY</h1>
    </div>
  );
}

function AddItemToList(props: any) {
  const [numberOfItems, setNumberOfItems] = useState("1");
  const [description, setDescription] = useState("");

  function handleAddTodo() {
    console.log(numberOfItems);
    console.log(description);
    if (!description) {
      return;
    }
    const newItem: Item = {
      total: numberOfItems,
      description: description,
      isCarried: false,
      id: Date.now(),
    };

    const updatedList = [...props.itemsList, newItem];
    console.log(updatedList);
    props.setItemsList(updatedList);
    setNumberOfItems("1");
    setDescription("");
  }
  return (
    <div className="flex bg-orange-600 min-h-16 items-center justify-center gap-2 w-full">
      <p>what do u need for your 😍trip?</p>
      <div className=" flex gap-3">
        {/* <input type="number" className="rounded-xl w-16 p-1" /> */}
        <select
          typeof="number"
          name=""
          id=""
          value={numberOfItems}
          className="w-16 rounded-2xl text-center bg-amber-200 outline-none"
          onChange={(e) => setNumberOfItems(e.target.value)}
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((num: number) => (
            <option value={num}>{num}</option>
          ))}
        </select>
        <input
          type="text"
          className="rounded-2xl p-1 bg-amber-200 pl-4 outline-none"
          placeholder="item.."
          name={description}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="rounded-xl bg-blue-500 w-16 text-white hover:bg-blue-800"
          onClick={handleAddTodo}
        >
          ADD
        </button>
      </div>
    </div>
  );
}

function ItemsRenderer(props: any) {
  function handleCheckChange(item: Item, idx: number, e: any) {
    console.log(e, "=============checkvalue");
    const value = item.isCarried ? false : true;
    const updatedItem: Item = { ...item, isCarried: value };
    const updatedList: Item[] = [
      ...props.itemsList.slice(0, idx),
      updatedItem,
      ...props.itemsList.slice(idx + 1),
    ];
    console.log(updatedList);
    props.setItemsList(updatedList);
  }

  function handleDelete(item: Item) {
    const filteredItems = props.itemsList.filter(
      (it: Item) => it.id !== item.id
    );

    props.setItemsList(filteredItems);
  }
  return (
    <div className="bg-amber-900 flex h-80 justify-center">
      <ul className="flex w-3/4 pt-8 flex-wrap	">
        {props.itemsList.map((item: Item, idx: number) => (
          <li className="text-white flex mx-6 h-10 justify-center items-center gap-2">
            <input
              type="checkbox"
              name=""
              id=""
              checked={item.isCarried}
              onChange={(e) => handleCheckChange(item, idx, e)}
              className="accent-amber-500 text-white"
            />
            <p className={`${item.isCarried ? "line-through" : ""}`}>
              <span>{item.total} </span>
              {item.description}
            </p>
            <span className="cursor-pointer" onClick={() => handleDelete(item)}>
              ❌
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ItemsOrder({ itemsList, setItemsList }: any) {
  function handleItemsOrder(e: any) {
    let option = e.target.value;
    let itemsListCopy = [...itemsList];
    if (option === "SORT BY INPUT") {
      itemsListCopy.sort((a: any, b: any) => a.id - b.id);
      setItemsList(itemsListCopy);
    }
    if (option === "SORT BY DESCRIPTION") {
      itemsListCopy.sort((a: any, b: any) => {
        if (a.description < b.description) {
          return -1;
        }
        if (a.description > b.description) {
          return 1;
        }
        return 0;
      });
      console.log(itemsListCopy);
      setItemsList(itemsListCopy);
    }
    if (option === "SORT BY PACKED STATUS") {
      // const order = { true: 0, false: 1 }; // Assigning numerical values to each boolean key

      itemsListCopy.sort((a: any, b: any) => a.isCarried - b.isCarried);
      console.log(itemsListCopy);
      setItemsList(itemsListCopy);
    }
  }
  return (
    <div className="flex items-center justify-center  bg-amber-950 w-full h-20 gap-3">
      <select
        name=""
        id=""
        className="w-fit rounded-2xl p-1 bg-amber-200"
        onChange={handleItemsOrder}
      >
        <option value="SORT BY INPUT">SORT BY INPUT ORDER</option>
        <option value="SORT BY DESCRIPTION">SORT BY DESCRIPTION</option>
        <option value="SORT BY PACKED STATUS">SORT BY PACKED STATUS</option>
      </select>
      <button
        className="rounded-xl w-fit p-1  bg-amber-200 "
        onClick={() => setItemsList([])}
      >
        CLEAR LIST
      </button>
    </div>
  );
}

function PackedItemsInfo() {
  return (
    <div className="flex bg-emerald-400 flex-1 items-center justify-center relative bottom-0 w-full ">
      <p>You have X items on your list, and you already packed X (X%)</p>
    </div>
  );
}
