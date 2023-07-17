const testText = [
  'Given$a$text$file$of$many$lines',
  'where$fields$within$a$line$',
  'are$delineated$by$a$single$"dollar"$character',
  'write$a$program',
  'that$aligns$each$column$of$fields$',
  'by$ensuring$that$words$in$each$',
  'column$are$separated$by$at$least$one$space.',
  'Further,$allow$for$each$word$in$a$column$to$be$either$left$',
  'justified,$right$justified',
  'or$center$justified$within$its$column.'
];

function createSpaces(total) {
  let spaces = "";
  for (let i = 0; i < total; i++) {
    spaces += " ";
  }
  return spaces;
}

function formatText(input, justification) {
  const separator = "$";
  // loop through the input array, and for each index, split the words, and attach them to
  // the columns array.
  // Also, for every column, find the longest word, and we'll pad the rest of the words in the column
  // with the deficit in length, according to [justification].
  const columns = [];
  const columnMaxWidths = [];
  for (const line of input) {
    const words = line.trim().split(separator);
    for (let i = 0; i < words.length; i++) {
      const col = columns[i];
      const word = words[i];
      if (word) {
        if (Array.isArray(col)) {
          col.push(word);
        } else {
          columns[i] = [word];
        }

        // if the word has a length larger than the current [maxWidth], replace in array
        if (columnMaxWidths[i]) {
          if (word.length > columnMaxWidths[i]) {
            columnMaxWidths[i] = word.length
          }
        } else {
          columnMaxWidths[i] = word.length
        }
      }
    }
  }

  // for every column, adjust text position according to [justification]
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    const maxLength = columnMaxWidths[i];
    for (let j = 0; j < column.length; j++) {
      const word = column[j];
      const wordLength = word.length;
      const pad = maxLength - wordLength;
      switch (justification) {
        case "left":
          column[j] = `${word}${createSpaces(pad)}`;
          break;
        case "right":
          column[j] = `${createSpaces(pad)}${word}`
          break;
        case "center":
          const right = pad / 2 + pad % 2
          const left = Math.floor(pad / 2);
          column[j] = `${createSpaces(left)}${word}${createSpaces(right)}`
          break;
        default:
          throw new Error(`justification property: [${justification}] provided is unsupported.`);
      }
    }
  }

  // now re-create each line of text with these changes.
  const rows = [];
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    for (let j = 0; j < column.length; j++) {
      if (rows[j]) {
        rows[j] = rows[j] + " " + column[j]
      } else {
        rows[j] = column[j]
      }
    }
  }

  console.log("re-constructed rows", rows);

  let output = "";
  for (const row of rows) {
    output += row + "\\" + "n";
  }
  return output;
}

console.log(formatText(testText, "right"));
console.log(formatText(testText, "left"));
console.log(formatText(testText, "center"));