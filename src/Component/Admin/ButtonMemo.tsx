import { useEffect, useMemo, useState } from "react";

type Props = {};

function addTenAfterDelay(inputNumber: number) {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      const result: number = inputNumber + 10;
      resolve(result);
    }, 1000);
  });
}

function expensiveFunction(n: number) {
  for (let i = 0; i < 1000000000; i++) {}
  return n + 10;
}

function ButtonMemo({}: Props) {
  const [first, setfirst] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);

  // 1st usecase of useMemo

  //   case:1
  //   let myVal = expensiveFunction(first); // this will delay the execution on every change of event (since it will be loaded after every change in page)

  //   case:2
  //   const [myVal, setMyVal] = useState<number>(0);
  //   useEffect(() => {
  //     setMyVal(expensiveFunction(first));
  //   }, [first]); // this can manage the delay on change of event of first only, but using useMemo is more benificial for such cases

  //   case:3
  let myVal = useMemo(() => expensiveFunction(first), [first]); // this will delay the execution on change of event of first only & will persist the ever changing value in myVal

  // 2nd usecase of useMemo

  //   case:1
  //   const objectValues = {
  //     first: first,
  //     second: 1,
  //   }; // can't put objectValues in useEffect since after every execution page render objectValues will have new value even if they look same*

  //   case:2
  const objectValues = useMemo(() => {
    return {
      first: first,
      second: 1,
    };
  }, [first]); // this will resolve the issue of change in value of objectValues only on change of first & will contain its original given value

  useEffect(() => {
    console.log("objectValues value changed");
  }, [objectValues]);

  // const [myVal, setMyVal] = useState<number>(0);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const result: number = await addTenAfterDelay(first);
  //       setMyVal(result);
  //     };
  //     fetchData();
  //   }, [first]);

  return (
    <div>
      <div>
        Num:
        <input
          type="number"
          value={first}
          onChange={(e) => setfirst(Number(e.target.value))}
        />
      </div>
      <div className="h-10 w-20 border-gray-600 border-2">{myVal}</div>
      <input
        type="number"
        value={second}
        onChange={(e) => setSecond(Number(e.target.value))}
      />
    </div>
  );
}

export default ButtonMemo;
