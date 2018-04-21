
// selecting elements 
const list = document.querySelectorAll('li');
const divPage = document.querySelector('.page');
const divHeader = document.querySelector('.page-header');


// Showing first 10 students when page loads.
for (let i = 10; i < list.length; i++) {
  list[i].style.display = 'none';
}

// hiding the list of students
function hideElements(elements) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = 'none';
  }
}

// Shows page with students according to page number
function showPage(pageNumber, studentList) {
  // first hide all students on the page
  hideElements(list);
  // Then loop through all students in our student list argument
  for (let i = 0; i < studentList.length; i++) {
    // if student should be on this page number
    if (i >= (pageNumber * 10) - 10 && i <= (pageNumber * 10) - 1) {
      // show the student
      studentList[i].style.display = '';
    }
  }
}

// creating and appending HTML links, calling showPage and determining active links.
function appendPageLinks(studentList) {
  // determine how many pages for this student list 
  let numberOfPages = Math.ceil(studentList.length / 10);

  // create a page link section
  let divPagination = document.createElement('div');
  divPagination.setAttribute('class', 'pagination');
  let ulPagination = document.createElement('ul');
  divPagination.appendChild(ulPagination);

  // Creating the li and a elements, by default page 1 class is "active"
  let aPagination = '';
  for (let i = 1; i <= numberOfPages; i++) {
    if (i === 1) {
      aPagination += `
      <li>
        <a class="active" href="#">${i}</a>
      </li>  
      `;
    } else {
      aPagination += `
      <li>
        <a href="#">${i}</a>
      </li>  
      `;
    }
  }
  // Defining ul and appending ul to pagination div 
  // and appending pagination div to page div.
  ulPagination.innerHTML = aPagination;
  divPagination.appendChild(ulPagination);
  divPage.appendChild(divPagination);

  // define what happens when you click a link
  ulPagination.addEventListener('click', function(e) {
    // Selecting the pageNumber
    let pageNumber = e.target.textContent;
    pageNumber = parseInt(pageNumber);

    // Use the showPage function to display the page for the link clicked
    showPage(pageNumber, studentList);

    // mark that link as “active” and remove "active" from other links
    const links = document.querySelectorAll('a');
    for (let i = 0; i < links.length; i++) {
      links[i].className = '';
      e.target.className = 'active';
    }
  });
}


// EXCEEDS: creating and appending search component on the page
function searchHTML() {
  const divSearch = document.createElement('div');
  divSearch.className = 'student-search';
  const inputSearch = document.createElement('input');
  inputSearch.placeholder = 'Search for students...';
  const buttonSearch = document.createElement('button');
  buttonSearch.textContent = 'Search';
  divSearch.appendChild(inputSearch);
  divSearch.appendChild(buttonSearch);
  divHeader.appendChild(divSearch);
}

// EXCEEDS: when clicked on "Search" button this functions run and outputs results
function searchList() {
  // for message when not found
  const h2 = document.querySelector('h2');
  // Obtain the value of the search input
  const input = document.querySelector('input');
  let search = input.value;
  search = search.toLocaleLowerCase();
  // remove the previous page link section
  const divPagination = document.querySelector('.pagination');
  divPagination.style.display = 'none';    
  const paginations = document.querySelectorAll('.pagination');
  // Loop over the student list, and for each student…
  let matched = [];
  for (let i = 0; i < list.length; i++) {
    // ...obtain the student’s name…
    let studentDetails = list[i].innerText;
    // ...and the student’s email…
    // ...if the search value is found inside either email or name…
    if (studentDetails.includes(search)) {
      // ...add this student to list of “matched” student
      matched.push(list[i]);
    }     
  }      
  // If there’s no “matched” students…
  if (matched.length === 0) {
    // ...display a “no student’s found” message
    h2.textContent = 'student(s) not found';
    h2.style.color = 'red';
    hideElements(paginations);
  }
  // if student(s) found resets elements to initial state
  if (matched.length > 0 && matched.length < 9) {
    h2.textContent = 'students';
    h2.style.color = 'initial';
    hideElements(paginations);
  }
  // If over ten students were found…
  if (matched.length > 9) {
    // ...call appendPageLinks with the matched students
    appendPageLinks(matched);
  }  
  // Call showPage to show first ten students of matched list
  let pageNumber = Math.ceil(matched.length / 10);
  showPage(1, matched);
  // clearing input field for new search
  input.value = '';
}


searchHTML();
appendPageLinks(list);


// handler for when clicking on "search"
const buttonSearch = document.querySelector('button');
buttonSearch.addEventListener('click', function() {
  const input = document.querySelector('input');
  if (input.value) {
    searchList();
  }
});















