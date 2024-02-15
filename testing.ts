import {end} from "cheerio/lib/api/traversing";

function sleep(){
  return new Promise(resolve=>{
    setTimeout(resolve,200);
  })
}

async function makeIterator(
  filePath: string,
  start: number,
  end: number,
  byteLengthToRead: number,
  ceiling: number
) {
  console.log("START BEFORE: ",start);
  console.log("END BEFORE: ",end);
  console.log("BYTE LENGTH TO READ BEFORE: ",byteLengthToRead);
  console.log("CEILING BEFORE: ",ceiling);
  console.log("###########: ");
  if (start < ceiling || start >= end) {
    // we have read the whole file. return.
    return;
  }
   await sleep();
  // move [byteLengthToRead] bytes behind.
  let _start = start;
  const _end = _start;
  _start = _start - byteLengthToRead;

  // if moving [byteLengthToRead] bytes behind becomes less than [ceiling], then move our
  // [_start] to [ceiling].
  if (_start < ceiling) {
    _start = ceiling;
  }
  console.log("START AFTER: ",_start);
  console.log("END AFTER: ",_end);
  console.log("BYTE LENGTH TO READ: ",byteLengthToRead);
  console.log("CEILING: ",ceiling);
  console.log("###########: ");

  await makeIterator(filePath, _start, _end, byteLengthToRead, ceiling);
}
const _byteLengthToRead = 13;
const _ceiling = 1500;
const _maxSize = 2000;
let _end = _maxSize;
let _start = _end - _byteLengthToRead;


makeIterator("test",_start,_end,_byteLengthToRead,_ceiling);