import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Props = {};

function List({
  getItems,
  dark,
}: {
  getItems: (val: number) => number[];
  dark: boolean;
}) {
  const [items, setItems] = useState<number[]>([]);
  useEffect(() => {
    setItems(getItems(2));
  }, [getItems]);
  return (
    <>
      {items.map((item: number, index: number) => (
        <div key={index} className={`text-${dark ? "black" : "white"}`}>
          {item.toString()}
        </div>
      ))}
    </>
  );
}

function List2({ getItems, dark }: { getItems: number[]; dark: boolean }) {
  const [items, setItems] = useState<number[]>([]);
  useEffect(() => {
    setItems(getItems);
  }, [getItems]);
  return (
    <>
      {items.map((item: number, index: number) => (
        <div key={index} className={`text-${dark ? "black" : "white"}`}>
          {item.toString()}
        </div>
      ))}
    </>
  );
}

function CallbackUse({}: Props) {
  const [dark, setDark] = useState<boolean>(false);
  const [number, setNumber] = useState<number>(0);
  //   const inputRef = useRef<HTMLInputElement>(null);
  //   useEffect(() => {
  //     console.log("change in inputRef");
  //   }, [inputRef.current]); // ref never changes the state so putting changing condition on useEffect wont ever work
  const getItems: (inc: number) => number[] = useCallback(
    (incrementor) => {
      return [
        number + incrementor,
        number + incrementor + 1,
        number + incrementor + 2,
      ];
    },
    [number]
  ); // returns a function which can be used further to check change happens only on change of given condition & holds its value in cache, can be helpful since parameter can be used
  const getItemsVal: number[] = useMemo(() => {
    return [number, number + 1, number + 2];
  }, [number]); // holds a value in cache which can be used further to check change happens only on change of given condition
  return (
    <div>
      <div
        className={`flex flex-col mx-10 justify-center items-center py-20 border-gray-600 border-2 ${
          dark ? "bg-white" : "bg-black"
        }`}
      >
        <input
          type="number"
          //   ref={inputRef}
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
          className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-96"
        />
        <button onClick={() => setDark((prevVal) => !prevVal)}>
          <p className={`text-${dark ? "black" : "white"}`}>Toggle Theme</p>
        </button>
        <List getItems={getItems} dark={dark} />
        <List2 getItems={getItemsVal} dark={dark} />
      </div>
    </div>
  );
}

export default CallbackUse;
