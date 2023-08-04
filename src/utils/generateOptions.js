// This function generates an array of 4 unique random numbers between 0 and 'length-1',
// and then calls the 'setState' function to update the state with the generated numbers.

export function generateOptions(length) {

    // Initialize an empty array to store the unique random numbers.
    let uniqueNumbers = [];

    // Run a loop until we have 4 unique numbers in the array.
    while (uniqueNumbers.length < 4) {
        
        // Generate a random number between 0 (inclusive) and 'length' (exclusive),
        // and add it to the 'uniqueNumbers' array.
        uniqueNumbers.push(Math.floor(Math.random() * length));
        // Convert the 'uniqueNumbers' array into a Set to remove any duplicates.
        uniqueNumbers = new Set(uniqueNumbers);
        // Convert the Set back to an array to continue the loop with unique numbers.
        uniqueNumbers = [...uniqueNumbers];
    }

    // Return  the array of 4 unique random numbers.
    return uniqueNumbers;
}

