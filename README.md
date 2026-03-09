  - 1️⃣ What is the difference between var, let, and const?
    -
    - var is function-scoped, it is accessible throughout the entire function where it is declared, and it can also be redeclared and updated.var is hoisted and initialized with undefined, so it can be accessed before its declaration without throwing an error.
    - let is block-scoped, meaning it only works inside the block {} where it is defined, and it can be updated but cannot be redeclared in the same scope.
    - const is also block-scoped like let, but its value cannot be reassigned after it is declared, so it must be initialized at the time of declaration.
    - let and const are also hoisted but they are not initialized immediately; they stay in a Temporal Dead Zone (TDZ) from the start of the block until the line where they are declared, so accessing them before declaration causes a ReferenceError.

  - 2️⃣ What is the spread operator (...)?
    -
    - The spread operator (...) used to expand or unpack elements of an array, object, or iterable into individual elements. It allows copy, merge, or pass multiple values easily.

  - 3️⃣ What is the difference between map(), filter(), and forEach()?
    - 
    - map() creates a new array by applying a function to every element of the original array.
    - filter() also returns a new array, but it only includes the elements that satisfy a specific condition.
    - forEach() simply loops through each element of the array and executes a function, but it does not return a new array.

  - 4️⃣ What is an arrow function?
    - 
    - An arrow function is a shorter syntax for writing functions in JavaScript using the => symbol. It allows us to write functions in a more concise and readable way.
  - 5️⃣ What are template literals?
    - 
    - Template literals in JavaScript are a way to create strings using backticks (``) instead of single (' ') or double (" ") quotes. They allow you to easily include variables or expressions inside a string using ${}.