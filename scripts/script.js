//For login page
const loginBtn = document.getElementById('loginBtn');
const homePage = document.getElementById('home-page');
const loginPage = document.getElementById('login-page');
const inputUsername = document.getElementById('inputUsername');
const inputPassword = document.getElementById('inputPassword');
const demoDiv = document.getElementById('login-error');

loginBtn.addEventListener('click', () => {
    const usernameValue = inputUsername.value.trim();
    const passwordValue = inputPassword.value.trim();

    if (usernameValue === 'admin' && passwordValue === 'admin123') {
        homePage.classList.remove('hidden');
        loginPage.classList.add('hidden');
    }
    else {
        demoDiv.classList.remove('hidden');
        inputUsername.value = '';
        passwordValue.value = '';
        return;
    }
});

//For Database
const urlAllIssues = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';

const loadDataFromDB = async (url) => {
    const resp = await fetch(url);
    return await resp.json();
}

const displayAllIssues = (issues) => {
    const totalIssues = document.getElementById('totalIssues');
    totalIssues.innerHTML = issues.length;

    const issuesContainer = document.getElementById('issuesContainer');
    issuesContainer.innerHTML = "";

    if (issues.length === 0) {
        issuesContainer.innerHTML = `
            <div class="col-span-4 p-18 text-center rounded-xl space-y-6 ">
                <i class="text-6xl text-gray-500 fa-regular fa-face-frown"></i>
                <h1 class="font-bold font-bangla text-3xl text-gray-500">No Issue Found...!</h1>
            </div>
        `;
        return;
    }

    issues.forEach(issue => {
        const localDate = new Date(issue.createdAt);

        const issueDiv = document.createElement('div');
        issueDiv.innerHTML = `
            <div id="border-${issue.status}" class="bg-[#ffffff] p-4 rounded-lg shadow-md w-[300px] h-[320px]">
                <div class="flex justify-between items-center mb-3">
                    <img src="assets/${issue.status}.png" alt="">
                    <button id="priorityBtn-${issue.priority}" class="px-6 py-1 rounded-full uppercase text-sm">${issue.priority}</button>
                </div>
                <div class="space-y-3">
                    <h2 class="font-medium">${issue.title}</h2>
                    <p class="text-sm text-gray-500 mb-2">${issue.description}</p>
                </div>
                <div class="my-4 flex justify-start gap-2">
                    Hello
                </div>
                <div class="space-y-2 border-t border-gray-300 w-full">
                    <p class="text-sm text-gray-500 mt-3">#${issue.id} by ${issue.author}</p>
                    <p class="text-sm text-gray-500">${localDate.toLocaleDateString()}</p>
                </div>
           </div>                                                                                  
        `;

        issuesContainer.appendChild(issueDiv);
    });
}

const getDataFromDB = async () => {
    const allIssues = await loadDataFromDB(urlAllIssues);
    console.log(allIssues.data);

    displayAllIssues(allIssues.data);
}
getDataFromDB();