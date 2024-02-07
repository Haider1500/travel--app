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

import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [itemsList, setItemsList] = useState<Item[]>([]);

  function handleItem(item: Item) {
    const updatedList = [...itemsList, item];
    console.log(updatedList);
    setItemsList(updatedList);
  }

  function handleDelete(id: number) {
    const filteredItems = itemsList.filter((item: Item) => item.id !== id);
    setItemsList(filteredItems);
  }

  function handleToggleItem(id: number) {
    const updatedList: Item[] = itemsList.map((item: Item) => {
      if (item.id === id) {
        return { ...item, isCarried: !item.isCarried };
      }
      return item;
    });
    setItemsList(updatedList);
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <AddItemToList onAddItem={handleItem} />
      <PackingList
        onDeleteItem={handleDelete}
        onToggleItem={handleToggleItem}
        itemsList={itemsList}
      />
      <ItemsOrder itemsList={itemsList} setItemsList={setItemsList} />
      <PackedItemsInfo itemsList={itemsList} />
    </div>
  );
}

export default App;

function Navbar() {
  return (
    <div className="bg-amber-500 flex flex-1 items-center justify-center min-h-24 w-full">
      <h1 className="text-2xl">😎 FAR AWAY 🎈</h1>
    </div>
  );
}

function AddItemToList({ onAddItem }: any) {
  const [numberOfItems, setNumberOfItems] = useState("1");
  const [description, setDescription] = useState("");

  function handleAddTodo(e: any) {
    e.preventDefault();
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

    onAddItem(newItem);
    setNumberOfItems("1");
    setDescription("");
  }
  return (
    <div className="flex flex-1 relative bg-orange-600 min-h-16 items-center justify-center gap-2 w-full">
      <p>what do u need for your 😍trip?</p>
      <form className=" flex gap-3" onSubmit={handleAddTodo}>
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
        <button className="rounded-xl bg-blue-500 w-16 text-white hover:bg-blue-800">
          ADD
        </button>
      </form>
    </div>
  );
}

function PackingList({ onToggleItem, onDeleteItem, itemsList }: any) {
  return (
    <div className="bg-amber-900 flex flex-2 relative h-80 justify-center">
      <ul className="flex w-3/4 pt-8 flex-wrap">
        {itemsList.map((item: Item) => (
          <Item
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            item={item}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onToggleItem, onDeleteItem }: any) {
  return (
    <li className="text-white flex mx-6 h-10 justify-center items-center gap-2">
      <input
        type="checkbox"
        name=""
        id=""
        checked={item.isCarried}
        onChange={() => onToggleItem(item.id)}
        className="accent-amber-500 text-white"
      />
      <p className={`${item.isCarried ? "line-through" : ""}`}>
        <span>{item.total} </span>
        {item.description}
      </p>
      <span className="cursor-pointer" onClick={() => onDeleteItem(item.id)}>
        ❌
      </span>
    </li>
  );
}

function ItemsOrder({ itemsList, setItemsList }: any) {
  const [sortBy, setSortBy] = useState("input");
  console.log(sortBy);

  useEffect(() => {
    let sortedList: any;
    if (sortBy === "input") {
      sortedList = itemsList.slice().sort((a: any, b: any) => a.id - b.id);
    }
    if (sortBy === "description") {
      sortedList = itemsList
        .slice()
        .sort((a: any, b: any) => a.description.localeCompare(b.description));
    }
    if (sortBy === "packed") {
      // const order = { true: 0, false: 1 };
      sortedList = itemsList
        .slice()
        .sort((a: any, b: any) => Number(a.isCarried) - Number(b.isCarried));
    }
    setItemsList(sortedList);
  }, [sortBy]);
  // }

  return (
    <div className="flex flex-1 relative items-center justify-center  bg-amber-950 w-full h-28 gap-3">
      <select
        name=""
        id=""
        value={sortBy}
        className="w-fit rounded-2xl p-2 bg-amber-200"
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="input">SORT BY INPUT ORDER</option>
        <option value="description">SORT BY DESCRIPTION</option>
        <option value="packed">SORT BY PACKED STATUS</option>
      </select>
      <button
        className="rounded-xl w-fit p-2  bg-amber-200 "
        onClick={() => setItemsList([])}
      >
        CLEAR LIST
      </button>
    </div>
  );
}

function PackedItemsInfo({ itemsList }: any) {
  const totalItems = itemsList.length;
  if (!totalItems) {
    return (
      <div className="flex bg-emerald-400 flex-1 items-center justify-center relative bottom-0 w-full ">
        There are no Items selected yet 😅😅
      </div>
    );
  }
  const packed = itemsList.filter((item: any) => item.isCarried).length;
  const percent = Math.round((packed / totalItems) * 100);
  return (
    <footer className="flex bg-emerald-400 flex-1 items-center justify-center relative bottom-0 w-full ">
      {percent == 100 ? (
        <p>All the items have been Packed 😍</p>
      ) : (
        <p>
          You have {totalItems} items on your list, and you already packed{" "}
          {packed}({percent}%)
        </p>
      )}
    </footer>
  );
}
