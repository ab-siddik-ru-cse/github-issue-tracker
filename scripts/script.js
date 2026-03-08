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

const createButtons = (labels) => {
    const labelConfigs = {
        "bug": { icon: "fa-bug", style: "bg-red-50 text-red-600 border" },
        "help wanted": { icon: "fa-life-ring", style: "bg-[#FFF6D1] text-[#F59E0B] border" },
        "enhancement": { icon: "fa-wand-magic-sparkles", style: "bg-green-50 text-green-600 border" },
        "good first issue": { icon: "fa-seedling", style: "bg-blue-50 text-blue-600 border" },
        "documentation": { icon: "fa-book", style: "bg-gray-50 text-gray-600 border" }
    };
    
    return labels.map(label => {
        const config = labelConfigs[label.toLowerCase()] || { icon: "fa-tag", style: "bg-slate-50 text-slate-500 border-slate-200" };

        return `
      <button class="px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1.5 uppercase tracking-wide ${config.style}">
        <i class="fa-solid ${config.icon}"></i>
        ${label}
      </button>`;
    }).join(' ');
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
            <div id="border-${issue.status}" class="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full cursor-pointer group">
                <div class="flex justify-between items-start mb-4">
                    <img src="assets/${issue.status}.png" alt="">
                    <button id="priorityBtn-${issue.priority}" class="px-6 py-1 rounded-full uppercase text-sm">${issue.priority}</button>
                </div>
                <div class="space-y-2 flex-grow">
                    <h2 class="font-medium">${issue.title}</h2>
                    <p class="text-sm text-gray-500 line-clamp-3">${issue.description}</p>
                </div>
                <div class="mt-3 mb-4 flex flex-wrap gap-2">
                    ${createButtons(issue.labels)}
                </div>
                <div class="pt-4 border-t border-gray-300 mt-auto flex flex-col gap-2.5 text-xs text-gray-500">
                    <p class="text-sm text-gray-500">#${issue.id} by ${issue.author}</p>
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